'use server'

import prisma from "@/lib/prisma"


export async function obtenerUsuarios() {
    const users = await prisma.user.findMany({
        include: { pedidos: true }
    });
    return users
}



export async function obtenerUsuarioPorId(id) {
    const user = await prisma.user.findUnique({
        where: { id }
    });
    return user
}




export async function obtenerUsuarioPorEmail(email) {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user
}


