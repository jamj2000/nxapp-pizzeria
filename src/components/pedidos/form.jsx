
'use client'
import { labelDefault } from "../ui/labels"
import { RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId, useState } from "react";
import { toast } from "sonner";
import CheckPizza from "./check-pizza";



export default function Form({ action, user, pedido, pizzas, disabled = false, labelSubmit = labelDefault }) {
    const formId = useId()
    const [state, faction, isPending] = useActionState(action, {})


    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
        if (state.error) {
            toast.error(state.error)
        }
    }, [state])


    const [fechaActual] = useState(() => {
        const ahora = new Date()
        const local = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000)
        return local.toISOString().slice(0, 16) // YYYY-MM-DDTHH:MM
    })

    const fechaPedido = pedido?.fecha_hora
        ? new Date(pedido?.fecha_hora - pedido?.fecha_hora.getTimezoneOffset() * 60000).toISOString().split('Z')[0]
        : fechaActual

    // const IDs = pedido?.pedidoPizzas.map(pp => pp.pizzaId)
    const pedidoPizzas = pedido?.pedidoPizzas


    return (
        <form id={formId} action={faction} className="flex flex-col gap-4" >
            <input type="hidden" name="id" defaultValue={pedido?.id} />
            <input type='hidden' name="clienteId" defaultValue={user.id} />
            {/* <input type='hidden' name="repartidorId" /> */}

            <button
                type="submit"
                className="w-full h-12 flex justify-center items-center rounded-md hover:cursor-pointer hover:opacity-80 disabled:bg-slate-300 disabled:cursor-not-allowed"
                disabled={isPending}
            >
                {isPending
                    ? <RefreshCwIcon size={20} className="animate-spin" />
                    : labelSubmit
                }
            </button>

            <p className="font-bold">Pedido {pedido?.id}</p>

            <label> Fecha y hora:
                <input
                    name="fecha_hora"
                    type="datetime-local"
                    defaultValue={fechaPedido}
                    disabled={disabled}
                />
            </label>

            <p className="font-bold">Pizzas</p>
            <div className="grid gap-4 place-items-center grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                {pizzas.map(pizza =>
                    <CheckPizza
                        key={pizza.id}
                        pizza={pizza}
                        disabled={disabled}
                        cant={pedidoPizzas?.find(p => p.pizzaId === pizza.id)?.cantidad || 0}
                    />
                )}
            </div>
        </form>
    )
}


