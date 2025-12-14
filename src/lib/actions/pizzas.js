'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { uploadImage } from "@/lib/actions/images"




async function insertarPizza(prevState, formData) {
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    const file = formData.get('file')

    const ingredientesIDs = await prisma.ingrediente.findMany({
        select: { id: true }
    })
    // console.log(ingredientesIDs);
    const connect = ingredientesIDs.filter(i => formData.get(i.id) !== null)


    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
        const foto = await uploadImage(file)
        await prisma.pizza.create({
            data: { nombre, precio, foto, ingredientes: { connect } }
        })
    } else {
        await prisma.pizza.create({
            data: { nombre, precio, ingredientes: { connect } }
        })
    }


    revalidatePath('/pizzas')
    return { success: 'Pizza creada' }

}



async function modificarPizza(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const precio = Number(formData.get('precio'))
    const file = formData.get('file')

    const ingredientesIDs = await prisma.ingrediente.findMany({
        select: { id: true }
    })
    // console.log(ingredientesIDs);
    const connect = ingredientesIDs.filter(i => formData.get(i.id) !== null)
    const disconnect = ingredientesIDs.filter(i => formData.get(i.id) === null)

    // si tenemos nuevo archivo en el input type=file
    if (file.size > 0) {
        const foto = await uploadImage(file)
        await prisma.pizza.update({
            where: { id },
            data: { nombre, precio, foto, ingredientes: { connect, disconnect } }
        })
    } else {
        await prisma.pizza.update({
            where: { id },
            data: { nombre, precio, ingredientes: { connect, disconnect } }
        })
    }

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

