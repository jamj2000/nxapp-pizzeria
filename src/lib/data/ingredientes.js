'use server'
import prisma from "@/lib/prisma"



export async function obtenerIngredientes() {
    const ingredientes = await prisma.ingrediente.findMany()
    return ingredientes
}





export async function obtenerIngrediente(id) {
    if (Number.isInteger(parseInt(id)) == false) return null

    const ingrediente = await prisma.ingrediente.findUnique({
        where: { id: +id },
    })
    return ingrediente
}


