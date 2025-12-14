'use client'
import Modal from "@/components/ui/modal";
import PizzaVer from "@/components/pizzas/ver";
import PizzaModificar from "@/components/pizzas/modificar";
import PizzaEliminar from "@/components/pizzas/eliminar";
import PizzaInsertar from "@/components/pizzas/insertar";
import { ArrowUpRightIcon, EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { obtenerPizzas } from "@/lib/data/pizzas";
import { obtenerIngredientes } from "@/lib/data/ingredientes";



export default function Pizzas({ admin = false }) {

    const [pizzas, setPizzas] = useState([])                      // lista completa
    const [ingredientes, setIngredientes] = useState([])          // lista completa

    useEffect(() => {
        const load = async () => {
            const newPizzas = await obtenerPizzas()   // Consulta a BD
            setPizzas(prev => [...prev, ...newPizzas])

            const newIngredientes = await obtenerIngredientes()   // Consulta a BD
            setIngredientes(prev => [...prev, ...newIngredientes])
        }
        load()
    }, []
    )


    const [sortBy, setSortBy] = useState('nombre')

    const sortPizzas = (a, b) => {
        if (sortBy === 'precio') {
            return a.precio - b.precio
        }
        return a.nombre.localeCompare(b.nombre)
    }


    if (pizzas.length === 0) return <p>Obteniendo datos ...</p>

    return (
        <div className="flex flex-col gap-4">
            {admin &&
                <Modal openElement={
                    <div className='justify-self-end size-8 grid place-content-center rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'>
                        <PlusIcon className='size-4' />
                    </div>}>
                    <PizzaInsertar ingredientes={ingredientes} />
                </Modal>
            }
            <div className="flex justify-end">
                <button
                    onClick={() => setSortBy(prev => prev === 'nombre' ? 'precio' : 'nombre')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    {sortBy === 'nombre' ? 'Ordenar por precio' : 'Ordenar por nombre'}
                </button>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {pizzas
                    .sort(sortPizzas)
                    .map(pizza =>
                        <Item
                            key={pizza.id}
                            pizza={pizza}
                            ingredientes={ingredientes}
                            admin={admin}
                        />)}
            </div>
        </div>

    );
}



function Item({ pizza, ingredientes, admin = false }) {
    return (
        <div className="p-4 mb-4 bg-lime-100 rounded-lg border border-lime-200">

            <Modal openElement={
                <div className="grid place-content-center cursor-pointer">
                    <img src={pizza.foto || '/images/default-pizza.avif'} alt='foto' className="py-6" />
                    <p className="font-bold text-4xl ">{pizza.nombre}</p>
                    <p className="font-bold text-2xl text-stone-400">{pizza.precio} €</p>
                </div>
            }>

                <PizzaVer pizza={pizza} />
            </Modal>

            <div className='flex justify-end items-center gap-1 pt-4'>
                {admin &&
                    <>
                        <Modal openElement={
                            <div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                <PencilIcon className='size-4' />
                            </div>}>
                            <PizzaModificar pizza={pizza} ingredientes={ingredientes} />
                        </Modal>

                        <Modal openElement={
                            <div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                                <TrashIcon className='size-4' />
                            </div>}>
                            <PizzaEliminar pizza={pizza} />
                        </Modal>
                    </>
                }
                <Link prefetch href={`/pizzas/${pizza.id}`} className="text-sm font-bold cursor-pointer">
                    <div className='size-8 grid place-content-center rounded-full border border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white hover:cursor-pointer'>
                        <ArrowUpRightIcon className='size-4' />
                    </div>
                </Link>
            </div>

        </div>
    )
}
