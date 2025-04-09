'use server'

import prisma from "@/lib/prisma"



// ----------------------------  USERS ---------------------------


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





// ---------------------   REPARTIDORES -----------------------

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


// ---------------------   PEDIDOS -----------------------

export async function obtenerPedidos(clienteId) {
    const pedidos = await prisma.pedido.findMany({
        where: {
            clienteId // dentro de where, valores undefined equivalen a desactivar filtro 
        },
        include: {
            cliente: true,
            repartidor: true,
            pizzas: true,
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
            pizzas: true,
        }
    })
    return pedido
}

// ---------------------   PIZZAS -----------------------

export async function obtenerPizzas() {
    const pizzas = await prisma.pizza.findMany({
        include: { ingredientes: true }
    })
    return pizzas
}


export async function obtenerPizza(id) {

    if (Number.isInteger(parseInt(id)) == false) return null

    const pizza = await prisma.pizza.findUnique({
        where: { id: +id },
        include: { ingredientes: true }
    })
    return pizza
}



// ---------------------   INGREDIENTES -----------------------

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
