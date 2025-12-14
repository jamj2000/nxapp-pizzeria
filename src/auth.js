import NextAuth from "next-auth"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "@/lib/data/users"
import authConfig from "@/auth.config"


export const options = {
    session: { strategy: 'jwt' },
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
        signOut: '/auth/logout',
        error: '/auth/error'
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async session({ session, token }) {
            // console.log(session, user);
            session.user.id = token?.sub;     // Para incluir ID de usuario
            session.user.role = token?.role

            // Obtener la información actualizada del usuario en cada petición
            const updatedUser = await getUserById(session.user.id)

            if (updatedUser) {
                session.user.name = updatedUser.name; // Actualizar el nombre en la sesión
                session.user.email = updatedUser.email; // Actualizar el nombre en la sesión
                session.user.image = updatedUser.image; // Actualizar la imagen en la sesión
            }

            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const user = await getUserById(token.sub)
            if (!user) return token;

            token.role = user?.role
            return token
        }
    },
}



export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({ ...options, ...authConfig })
