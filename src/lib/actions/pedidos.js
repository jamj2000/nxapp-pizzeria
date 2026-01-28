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

    // Map over all available pizzas and check if they are in the form data
    const pizzasConCantidad = pizzasIDs.map(p => {
        const cantidadStr = formData.get(`pizza${p.id}`)
        let cantidad = 0
        if (cantidadStr === 'on') {
            cantidad = 1 // Backward compatibility for checkboxes
        } else if (Number(cantidadStr) > 0) {
            cantidad = Number(cantidadStr)
        }
        return { id: p.id, cantidad }
    }).filter(p => p.cantidad > 0)


    await prisma.pedido.create({
        data: {
            fecha_hora: fecha_hora,
            clienteId: clienteId,
            repartidorId: repartidorId,
            pedidoPizzas: {
                create: pizzasConCantidad.map(p => ({
                    pizzaId: p.id,
                    cantidad: p.cantidad
                }))
            }
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
    // console.log(pizzasIDs);
    // Map over all available pizzas and check if they are in the form data
    const pizzasConCantidad = pizzasIDs.map(p => {
        const cantidadStr = formData.get(`pizza${p.id}`)
        let cantidad = 0
        if (cantidadStr === 'on') {
            cantidad = 1 // Backward compatibility for checkboxes
        } else if (Number(cantidadStr) > 0) {
            cantidad = Number(cantidadStr)
        }
        return { id: p.id, cantidad }
    }).filter(p => p.cantidad > 0)

    await prisma.pedido.update({
        where: { id },
        data: {
            fecha_hora: fecha_hora,
            clienteId: clienteId,
            repartidorId: repartidorId,
            pedidoPizzas: {
                deleteMany: {},
                create: pizzasConCantidad.map(p => ({
                    pizzaId: p.id,
                    cantidad: p.cantidad
                }))
            }
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