'use server'
import prisma from "@/lib/prisma"




export async function obtenerRepartidores() {
    const repartidores = await prisma.repartidor.findMany()
    return repartidores
}



export async function obtenerRepartidor(id) {
    if (Number.isInteger(parseInt(id)) == false) return null

    const repartidor = await prisma.repartidor.findUnique({
        where: { id: +id }
    })
    return repartidor
}