'use client'

import { useEffect, useState } from "react";
import { obtenerPizzas } from "@/lib/data/pizzas";


function PaginaCliente() {

    const [pizzas, setPizzas] = useState([])

    useEffect(() => {
        // esto equivale a hacer fetch pero sin la necesidad de disponer de una API 
        async function load() {
            const pizzas = await obtenerPizzas()
            setPizzas(pizzas)
        }
        load()
    }, [])



    if (pizzas.length === 0) return <p>Obteniendo datos ...</p>
    return (
        <div>
            <h1>Listado</h1>

            {pizzas.map(producto =>
                <p key={producto.id}>
                    {producto.nombre}
                </p>
            )}
        </div>
    );
}

export default PaginaCliente;