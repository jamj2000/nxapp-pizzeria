'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'



async function insertarRepartidor(prevState, formData) {
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')

    await prisma.repartidor.create({
        data: { nombre, telefono }
    })

    revalidatePath('/repartidores')
    return { success: 'Repartidor guardado' }


}



async function modificarRepartidor(prevState, formData) {
    const id = Number(formData.get('id'))
    const nombre = formData.get('nombre')
    const telefono = formData.get('telefono')


    await prisma.repartidor.update({
        where: { id },
        data: { nombre, telefono }
    })

    revalidatePath('/repartidores')
    return { success: 'Repartidor modificado' }

}



async function eliminarRepartidor(prevState, formData) {
    const id = Number(formData.get('id'))

    await prisma.repartidor.delete({
        where: {
            id: id
        }
    })

    revalidatePath('/repartidores')
    return { success: 'Repartidor eliminado' }


}



export {
    insertarRepartidor,
    modificarRepartidor,
    eliminarRepartidor
}