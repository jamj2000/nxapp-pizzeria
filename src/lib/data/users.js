'use server'
import prisma from "@/lib/prisma"



export async function getUsers() {
    const users = await prisma.user.findMany({
        include: { pedidos: true }
    });
    return users
}



export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id }
    });
    return user
}




export async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user
}


