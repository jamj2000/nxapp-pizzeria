"use client"

import { useActionState, useState } from "react"
import { getPizzas } from "@/lib/data/pizzas"

export default function PizzasClient() {
    const [offset, setOffset] = useState(0)        // cuántas pizzas ya cargadas
    const [pizzas, setPizzas] = useState([])       // lista completa

    const [latestBatch, action, isPending] = useActionState(
        async (_prevState, formData) => {
            const offsetFromForm = Number(formData.get("offset") || 0)
            const newPizzas = await getPizzas(offsetFromForm, 5)         // Consulta a BD

            setPizzas(prev => [...prev, ...newPizzas])
            setOffset(prev => prev + newPizzas.length)

            return newPizzas
        },
        []
    )

    return (
        <div>
            <form action={action}>
                <input type="hidden" name="offset" value={offset} />

                <button disabled={isPending} className="btn">
                    {isPending ? "Cargando..." : "Cargar más pizzas"}
                </button>
            </form>

            <ul>
                {pizzas.map(p => (
                    <li key={p.id}>{p.nombre}</li>
                ))}
            </ul>

            {latestBatch?.length === 0 && pizzas.length > 0 && <p>No hay más pizzas 😋</p>}
        </div>
    )
}
