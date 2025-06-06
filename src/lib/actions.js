'use server'
import cloudinary from "@/lib/cloudinary"
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth'
import { getUserByEmail } from '@/lib/data'
import { revalidatePath } from 'next/cache'



// ------------------------  AUTH --------------------------------


// REGISTER
export async function register(prevState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario ya está registrado
    const user = await getUserByEmail(email);

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
}



// LOGIN credentials
export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await getUserByEmail(email);

    if (!user) {
        return { error: 'Usuario no registrado.' }
    }

    // Comprobamos si el usuario está activo 
    if (!user.active) {
        return { error: 'Usuario deshabilitado. Consulte al administrador de esta app.' }
    }

    // Comparamos password 
    let matchPassword = false

    if (user.password == null)  // Si no hay contraseña almacenada en BD
        matchPassword = true
    else
        matchPassword = await bcrypt.compare(password, user.password)



    if (user && matchPassword)  // && user.emailVerified
    {
        await signIn('credentials',
            {
                email, password,
                redirectTo: globalThis.callbackUrl
            })
        return { success: "Inicio de sesión correcto" }
    } else {
        return { error: 'Credenciales incorrectas.' }
    }

}



// LOGOUT
export async function logout() {
    try {
        await signOut({ redirectTo: '/' })
    } catch (error) {
        throw error
    }
}



// ------------------------  IMAGES --------------------------------

export async function getImages() {

    const result = await cloudinary.api.resources_by_asset_folder('pizzería', {
        max_results: 500
    });

    return result.resources.map(img => img.secure_url);
}


async function uploadImage(file) {
    // console.log(file);

    const fileBuffer = await file.arrayBuffer();

    let mime = file.type;
    let encoding = "base64";
    let base64Data = Buffer.from(fileBuffer).toString("base64");
    let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    try {
        const result = await cloudinary.uploader.upload(fileUri, {
            invalidate: true,
            folder: "pizzeria",
            public_id: file.name.split(".").slice(0, -1).join("."),
            aspect_ratio: "1.0",
            width: 800,
            crop: "fill",
            gravity: "center",
            format: 'avif'
        });
        // console.log(result);
        return result.secure_url;
    } catch (error) {
        console.log(error);
        return null;
    }
}


// ------------------------  USERS --------------------------------


export async function newUser(prevState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password')
    const active = Boolean(formData.get('active'))
    const address = formData.get('address');
    const phone = formData.get('phone');
    const image = formData.get('image');
    const role = formData.get('role');

    const user = await getUserByEmail(email)
    if (user)
        return { error: 'Este email ya está registrado.' }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                active,
                address,
                phone,
                image,
                role
            }
        })

        revalidatePath('/dashboard')
        return { success: 'Usuario guardado' }
    } catch (error) {
        return { error }
    }

}


export async function editUser(prevState, formData) {
    const id = formData.get('id')
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password')
    const active = Boolean(formData.get('active'))
    const address = formData.get('address');
    const phone = formData.get('phone');
    const image = formData.get('image');
    const role = formData.get('role');

    const user = await getUserByEmail(email)
    if (user && user.id != id)
        return { error: 'Este email ya está registrado.' }


    let hashedPassword
    if (password)
        hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                ...(password && { password: hashedPassword }),
                active,
                address,
                phone,
                image,
                role
            }
        })
        revalidatePath('/dashboard')
        return { success: 'Usuario modificado' }
    } catch (error) {
        return { error }
    }

}

export async function deleteUser(prevState, formData) {
    try {
        const id = formData.get('id')

        await prisma.user.delete({
            where: { id },
        })
        revalidatePath('/dashboard')
        return { success: 'Usuario eliminado' }
    } catch (error) {
        return { error }
    }

}

export async function activeUser(user) {
    if (user) {
        await prisma.user.update({
            where: { id: user.id },
            data: { active: !user.active },
        })

        revalidatePath("/dashboard");
    }
}


//  ------------------------ REPARTIDORES ------------------------


export async function insertarRepartidor(prevState, formData) {
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')

    await prisma.repartidor.create({
        data: { nombre, telefono }
    })

    revalidatePath('/repartidores')
    return { success: 'Repartidor guardado' }


}



export async function modificarRepartidor(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')


    await prisma.repartidor.update({
        where: { id },
        data: { nombre, telefono }
    })

    revalidatePath('/repartidores')
    return { success: 'Repartidor modificado' }

}



export async function eliminarRepartidor(prevState, formData) {
    const id = Number(formData.get('id'))

    await prisma.repartidor.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/repartidores')
    return { success: 'Repartidor eliminado' }


}


//  ------------------------ PEDIDOS ------------------------


export async function insertarPedido(prevState, formData) {
    const fecha_hora = new Date(formData.get('fecha_hora')).toISOString()
    const clienteId = formData.get('clienteId')
    const repartidorId = Number(formData.get('repartidorId')) || null

    const pizzasIDs = await prisma.pizza.findMany({
        select: { id: true }
    })
    // console.log(pizzasIDs);
    const connect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) !== null)
    // console.log(connect);

    await prisma.pedido.create({
        data: {
            fecha_hora: fecha_hora,
            clienteId: clienteId,
            repartidorId: repartidorId,
            pizzas: { connect }
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }

}



export async function modificarPedido(prevState, formData) {
    const id = Number(formData.get('id'))
    const fecha_hora = new Date(formData.get('fecha_hora')).toISOString()
    const clienteId = formData.get('clienteId')

    const repartidorId = Number(formData.get('repartidorId')) || null

    const pizzasIDs = await prisma.pizza.findMany({
        select: { id: true }
    })
    // console.log(pizzasIDs);
    const connect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) !== null)
    const disconnect = pizzasIDs.filter(p => formData.get(`pizza${p.id}`) === null)
    // console.log(connect);

    await prisma.pedido.update({
        where: { id },
        data: {
            fecha_hora: fecha_hora,
            clienteId: clienteId,
            repartidorId: repartidorId,
            pizzas: { connect, disconnect }
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }
}



export async function eliminarPedido(prevState, formData) {
    const id = Number(formData.get('id'))

    await prisma.pedido.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }

}

// ------------------------------- PIZZAS -----------------------


export async function insertarPizza(prevState, formData) {
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    const file = formData.get('file')

    const ingredientesIDs = await prisma.ingrediente.findMany({
        select: { id: true }
    })
    // console.log(ingredientesIDs);
    const connect = ingredientesIDs.filter(i => formData.get(i.id) !== null)


    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
        const foto = await uploadImage(file)
        await prisma.pizza.create({
            data: { nombre, precio, foto, ingredientes: { connect } }
        })
    } else {
        await prisma.pizza.create({
            data: { nombre, precio, ingredientes: { connect } }
        })
    }


    revalidatePath('/pizzas')
    return { success: 'Pizza creada' }

}



export async function modificarPizza(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    const file = formData.get('file')

    const ingredientesIDs = await prisma.ingrediente.findMany({
        select: { id: true }
    })
    // console.log(ingredientesIDs);
    const connect = ingredientesIDs.filter(i => formData.get(i.id) !== null)
    const disconnect = ingredientesIDs.filter(i => formData.get(i.id) === null)

    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
        const foto = await uploadImage(file)
        await prisma.pizza.update({
            where: { id },
            data: { nombre, precio, foto, ingredientes: { connect, disconnect } }
        })
    } else {
        await prisma.pizza.update({
            where: { id },
            data: { nombre, precio, ingredientes: { connect, disconnect } }
        })
    }

    revalidatePath('/pizzas')
    return { success: 'Pizza modificada' }
}



export async function eliminarPizza(prevState, formData) {
    const id = Number(formData.get('id'))

    await prisma.pizza.delete({
        where: { id }
    })

    revalidatePath('/pizzas')
    return { success: 'Pizza eliminada' }

}

