'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'




async function insertarPedido(prevState, formData) {
    // const estado = formData.get('estado')
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


    try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await prisma.pedido.create({
            data: {
                // estado: estado,
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
        return { success: 'Pedido registrado correctamente' }
    } catch (error) {
        console.error(error)
        return { error: 'Error al registrar el pedido' }
    }
}





async function modificarPedido(prevState, formData) {
    const id = Number(formData.get('id'))
    // const estado = formData.get('estado')
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


    try {
        await prisma.pedido.update({
            where: { id },
            data: {
                // estado: estado,
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
        return { success: 'Pedido modificado correctamente' }
    } catch (error) {
        console.error(error)
        return { error: 'Error al modificar el pedido' }
    }
}





async function eliminarPedido(prevState, formData) {
    const id = Number(formData.get('id'))

    try {
        await prisma.pedido.delete({
            where: {
                id: id
            }
        })

        revalidatePath('/pedidos')
        return { success: 'Pedido eliminado correctamente' }
    } catch (error) {
        console.error(error)
        return { error: 'Error al eliminar el pedido' }
    }
}


async function changeState(pedido) {

    // await new Promise(resolve => setTimeout(resolve, 2000));
    if (pedido) {
        await prisma.pedido.update({
            where: { id: pedido.id },
            data: { estado: (pedido.estado + 1) % 4 },
        })

        revalidatePath("/dashboard");
    }
}


export {
    insertarPedido,
    modificarPedido,
    eliminarPedido,
    changeState
}