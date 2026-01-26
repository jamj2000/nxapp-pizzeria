'use server'

import prisma from "@/lib/prisma"



export async function obtenerPedidos(clienteId) {
    const pedidos = await prisma.pedido.findMany({
        where: {
            clienteId // dentro de where, valores undefined equivalen a desactivar filtro 
        },
        include: {
            cliente: true,
            repartidor: true,
            pedidoPizzas: {
                include: { pizza: true }
            }
        }
    })
    return pedidos
}




export async function obtenerPedido(id) {
    if (Number.isInteger(parseInt(id)) == false) return null

    const pedido = await prisma.pedido.findUnique({
        where: { id: +id },
        include: {
            cliente: true,
            repartidor: true,
            pedidoPizzas: {
                include: { pizza: true }
            }
        }
    })
    return pedido
}