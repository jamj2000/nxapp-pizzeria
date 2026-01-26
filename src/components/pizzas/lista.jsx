'use client'
import Modal from "@/components/ui/modal";
import PizzaVer from "@/components/pizzas/ver";
import PizzaModificar from "@/components/pizzas/modificar";
import PizzaEliminar from "@/components/pizzas/eliminar";
import PizzaInsertar from "@/components/pizzas/insertar";
import { ArrowUpRightIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { use, useState } from "react";
import Link from "next/link";


export default function Pizzas({ promesaPizzas, promesaIngredientes, promesaSession }) {
    const ingredientes = use(promesaIngredientes)
    const session = use(promesaSession)
    const dataPizzas = use(promesaPizzas)

    const isAdminSession = session.user?.role === 'ADMIN'

    const [propiedad, setPropiedad] = useState('nombre')
    const [orden, setOrden] = useState('')
    const [buscar, setBuscar] = useState('')

    let pizzas = dataPizzas
    if (propiedad === 'precio') {
        if (orden === 'asc') pizzas = dataPizzas.toSorted((a, b) => a[propiedad] - b[propiedad])
        if (orden === 'desc') pizzas = dataPizzas.toSorted((a, b) => b[propiedad] - a[propiedad])
    }
    else {
        if (orden === 'asc') pizzas = dataPizzas.toSorted((a, b) => a[propiedad].localeCompare(b[propiedad]))
        if (orden === 'desc') pizzas = dataPizzas.toSorted((a, b) => b[propiedad].localeCompare(a[propiedad]))
    }

    if (buscar) pizzas = pizzas.filter((pizza) =>
        pizza.nombre.toLowerCase().includes(buscar.toLowerCase())
    )


    const admin = session?.user.role === 'ADMIN'



    return (
        <div className="flex flex-col gap-4">

            <div className="flex flex-wrap gap-2 mb-2">

                <fieldset className="flex flex-wrap gap-2 mb-2">
                    <legend className='font-bold'>Filtrar</legend>
                    <input type="search" placeholder="Buscar"
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    />
                </fieldset>
                <fieldset className="flex flex-wrap gap-2 mb-2">
                    <legend className='font-bold'>Ordenar</legend>
                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    >
                        <option value="">Orden por defecto</option>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <select
                        value={propiedad}
                        onChange={(e) => setPropiedad(e.target.value)}
                        className="p-2 border rounded-md w-fit"
                    >
                        <option value="nombre">Nombre</option>
                        <option value="precio">Precio</option>
                    </select>
                </fieldset>

            </div>

            {isAdminSession &&
                <div className='flex justify-end items-center gap-4 pb-4'>
                    <Modal openElement={
                        <PlusIcon size={32}
                            className='text-green-500 border border-green-500 rounded-full bg-green-200 p-2 cursor-pointer hover:text-white hover:bg-green-500'
                        />}>
                        <PizzaInsertar ingredientes={ingredientes} />
                    </Modal>
                </div>
            }


            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {pizzas.map(pizza =>
                    <Pizza
                        key={pizza.id}
                        pizza={pizza}
                        ingredientes={ingredientes}
                        isAdminSession={isAdminSession}
                    />)}
            </div>
        </div>

    );
}



function Pizza({ pizza, ingredientes, isAdminSession = false }) {
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
                {isAdminSession &&
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
