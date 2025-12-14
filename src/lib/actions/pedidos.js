'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'




async function insertarPedido(prevState, formData) {
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





async function modificarPedido(prevState, formData) {
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





async function eliminarPedido(prevState, formData) {
    const id = Number(formData.get('id'))

    await prisma.pedido.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/pedidos')
    return { success: 'Operación realizada correctamente' }

}




export {
    insertarPedido,
    modificarPedido,
    eliminarPedido
}