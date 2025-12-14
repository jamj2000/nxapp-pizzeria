// 'use client'
// import { notFound } from "next/navigation";
// import { use } from "react";

// export default function Repartidor({ data }) {
//     const repartidor = use(data)

//     if (!repartidor) notFound()

//     return (
//         <>
//             <div>Nombre: {repartidor.nombre}</div>
//             <div>Teléfono: {repartidor.telefono}</div>
//         </>
//     );
// }




"use client"

import { use, useState, useTransition } from "react"
import { obtenerPizzas } from "@/lib/data/pizzas"


export default function Repartidor({ data }) {

    const repartidor = use(data)

    if (!repartidor) notFound()


    const [pizzas, setPizzas] = useState([])
    const [isPending, startTransition] = useTransition()

    const loadPizzas = () => {
        startTransition(async () => {
            const data = await obtenerPizzas()
            setPizzas(data)
        })
    }

    return (
        <div>
            <div>Nombre: {repartidor.nombre}</div>
            <div>Teléfono: {repartidor.telefono}</div>

            <button
                onClick={loadPizzas}
                disabled={isPending}
            >
                {isPending ? "Cargando..." : "Ver comentarios"}
            </button>

            <ul>
                {pizzas.map(pizza => (
                    <li key={pizza.id}>{pizza.nombre}</li>
                ))}
            </ul>
        </div>
    )
}
