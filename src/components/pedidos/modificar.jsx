'use client'
import { modificarPedido } from "@/lib/actions";
import { PencilIcon, PenIcon, PlusIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";

function PedidoModificar({ user, pedido, clientes, repartidores, pizzas }) {
    const formId = useId()

    const [state, action, pending] = useActionState(modificarPedido, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state])

    const IDs = pedido.pizzas.map(p => p.id)

    return (
        <form id={formId} action={action} className="flex flex-col gap-4" >
            <input type="hidden" name="id" defaultValue={pedido.id} />

            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Actualizando...</div>
                    : <div><PencilIcon className='inline' /> Actualizar </div>
                }
            </button>

            <label> Fecha y hora:
                <input
                    name="fecha_hora"
                    type="datetime-local"
                    defaultValue={new Date(pedido.fecha_hora - pedido.fecha_hora.getTimezoneOffset() * 60000).toISOString().split('Z')[0]} />
            </label>


            <input type='hidden' name="clienteId" defaultValue={user.id} />
            {/* <p className="font-bold">Cliente</p> */}
            {/* <select key={pedido.clienteId} name="clienteId" defaultValue={pedido.clienteId}>
                {
                    clientes.map(cliente =>
                        <option key={cliente.id} value={cliente.id}>
                            {cliente.name}
                        </option>
                    )
                }
            </select> */}

            <input type='hidden' name="repartidorId" />
            {/* <p className="font-bold">Repartidor</p> */}
            {/* <select name="repartidorId" defaultValue={pedido.repartidorId} key={pedido.repartidorId}>
                {
                    repartidores.map(repartidor =>
                        <option key={repartidor.id} value={repartidor.id}>
                            {repartidor.nombre}
                        </option>
                    )
                }
            </select> */}


            <p className="font-bold">Pizzas</p>
            {
                pizzas.map(pizza =>
                    <label key={pizza.id}>
                        <input
                            type="checkbox"
                            name={`pizza${pizza.id}`}
                            value={pizza.id}
                            defaultChecked={IDs.includes(pizza.id)}
                        />

                        {pizza.nombre}

                    </label>
                )
            }

        </form>
    );
}

export default PedidoModificar;