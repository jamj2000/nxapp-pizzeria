'use server'

import prisma from "@/lib/prisma"



export async function obtenerLotePizzas(offset, limit = 5) {
    const pizzas = await prisma.pizza.findMany({
        skip: offset,
        take: limit,
        orderBy: { id: "asc" },
    })

    return pizzas
}




export async function obtenerPizzas() {
    try {
        const pizzas = await prisma.pizza.findMany({
            include: { ingredientes: true }
        })
        return pizzas
    } catch (error) {
        console.log(error.message.split('\n').pop())
        throw new Error(error.message.split('\n').pop())
    }

}




export async function obtenerPizza(id) {
    if (Number.isInteger(parseInt(id)) == false) return null

    const pizza = await prisma.pizza.findUnique({
        where: { id: +id },
        include: { ingredientes: true }
    })

    return pizza
}

