'use server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth'
import { obtenerUsuarioPorEmail } from '@/lib/data/users'





// --------------------------------- REGISTER ------------------------------------

async function register(prevState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        // Comprobamos si el usuario ya está registrado
        const user = await obtenerUsuarioPorEmail(email);

        if (user) {
            return { error: 'El email ya está registrado' }
        }

        // Encriptamos password 
        const hashedPassword = await bcrypt.hash(password, 10)

        // Guardamos credenciales en base datos
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        return { success: "Registro correcto" }
    } catch (error) {
        console.error("REGISTER_ERROR", error)
        return { error: "Error al registrar el usuario. Inténtalo de nuevo." }
    }
}





// --------------------------------- LOGIN ------------------------------------

async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        // Comprobamos si el usuario está registrado
        const user = await obtenerUsuarioPorEmail(email);

        if (!user) {
            return { error: 'Usuario no registrado.' }
        }

        // Comprobamos si el usuario está activo 
        if (!user.active) {
            return { error: 'Usuario deshabilitado. Consulte al administrador.' }
        }

        // Compare password 
        const matchPassword = user.password
            ? await bcrypt.compare(password, user.password)
            : true; // Caso especial si no hay contraseña almacenada

        if (!matchPassword) {
            return { error: 'Credenciales incorrectas.' }
        }

        await signIn('credentials', {
            email,
            password,
            redirectTo: globalThis.callbackUrl || '/'
        })

        return { success: "Inicio de sesión correcto" }

    } catch (error) {
        // MUY IMPORTANTE: NextAuth utiliza errores para redireccionar. 
        // Si detectamos que es una redirección, debemos relanzarla.
        if (error.type === 'CredentialsSignin') {
            return { error: 'Credenciales inválidas.' }
        }

        // Si es un error de redirección (Next.js internals), lo lanzamos
        if (error.message === 'NEXT_REDIRECT') {
            throw error
        }

        console.error("LOGIN_ERROR", error)
        // Para cualquier otro error inesperado
        throw error
    }
}



// --------------------------------- LOGOUT ------------------------------------

async function logout() {
    await signOut({ redirectTo: '/' })
}





export {
    register,
    login,
    logout
}