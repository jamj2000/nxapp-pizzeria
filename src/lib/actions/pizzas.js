'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { uploadImage } from "@/lib/actions/images"




async function insertarPizza(prevState, formData) {
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    const file = formData.get('file')

    let foto = null
    if (file.size > 0) {
        foto = await uploadImage(file)
    }

    // PIZZA - INGREDIENTES (N:M)
    const ingredientes = formData.getAll('ingredientes').map(id => ({ id: Number(id) }))


    await prisma.pizza.create({
        data: {
            nombre,
            precio,
            foto,
            ingredientes: { connect: ingredientes }
        }
    })


    revalidatePath('/pizzas')
    return { success: 'Pizza creada' }

}



async function modificarPizza(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    const file = formData.get('file')

    let foto = null
    if (file.size > 0) {
        foto = await uploadImage(file)
    }

    // PIZZA - INGREDIENTES (N:M)
    const ingredientes = formData.getAll('ingredientes').map(id => ({ id: Number(id) }))


    await prisma.pizza.create({
        data: {
            nombre,
            precio,
            foto,
            ingredientes: { set: ingredientes }
        }
    })

    revalidatePath('/pizzas')
    return { success: 'Pizza modificada' }
}



async function eliminarPizza(prevState, formData) {
    const id = Number(formData.get('id'))

    await prisma.pizza.delete({
        where: { id }
    })

    revalidatePath('/pizzas')
    return { success: 'Pizza eliminada' }

}





export {
    insertarPizza,
    modificarPizza,
    eliminarPizza
}

