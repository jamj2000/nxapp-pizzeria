'use client'
import Modal from "@/components/ui/modal";
import { use, useState } from "react";
import Link from "next/link";
import { IconoInsertar, IconoModificar, IconoEliminar, IconoVer } from "@/components/ui/icons";
import { labelInsertar, labelModificar, labelEliminar } from "@/components/ui/labels";
import { eliminarPizza, insertarPizza, modificarPizza } from "@/lib/actions/pizzas";
import Form from "@/components/pizzas/form";


export default function Pizzas({ promesaPizzas, promesaIngredientes, promesaSession }) {
    const ingredientes = use(promesaIngredientes)
    const session = use(promesaSession)
    const dataPizzas = use(promesaPizzas)

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


    const isAdminSession = session?.user.role === 'ADMIN'



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
                    <Modal openElement={<IconoInsertar />}>
                        <Form action={insertarPizza} ingredientes={ingredientes} labelSubmit={labelInsertar} />
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



            <div className='flex justify-end items-center gap-1 pt-4'>
                {isAdminSession &&
                    <Modal openElement={<IconoModificar />}>
                        <Form action={modificarPizza} pizza={pizza} ingredientes={ingredientes} labelSubmit={labelModificar} />
                    </Modal>
                }
                {isAdminSession &&
                    <Modal openElement={<IconoEliminar />}>
                        <Form action={eliminarPizza} pizza={pizza} ingredientes={ingredientes} labelSubmit={labelEliminar} disabled />
                    </Modal>
                }
                <Link prefetch href={`/pizzas/${pizza.id}`} className="text-sm font-bold cursor-pointer">
                    <IconoVer />
                </Link>
            </div>

            <Modal openElement={<PizzaCard pizza={pizza} />}>
                <PizzaInfo pizza={pizza} />
            </Modal>

        </div >
    )
}


function PizzaCard({ pizza }) {
    return (
        <div className="grid place-content-center cursor-pointer">
            <p className="font-bold text-4xl ">{pizza.nombre}</p>
            <img src={pizza.foto || '/images/default-pizza.avif'} alt='foto' className="py-6" />
            <p className="font-bold text-2xl text-stone-400 text-right">{pizza.precio} €</p>
        </div>
    )
}


function PizzaInfo({ pizza }) {
    return (
        <div className="grid lg:grid-cols-[300px_1fr] gap-4 place-items-start">
            <img src={pizza.foto || '/images/default-pizza.avif'} alt='foto' className="h-[200px] w-full lg:h-[600px] object-cover" />

            <div className="flex flex-col justify-center w-full">
                <p className="text-4xl">{pizza.nombre}</p>
                <p className="text-4xl font-bold text-slate-300">{pizza.precio} €</p>
                <p className="font-bold">Ingredientes</p>
                {pizza.ingredientes.map(ingrediente =>
                    <p key={ingrediente.id}>{ingrediente.nombre}</p>
                )
                }
            </div>
        </div>
    )
}