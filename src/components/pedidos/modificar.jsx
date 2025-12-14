'use client'
import { modificarPedido } from "@/lib/actions/pedidos";
import { PencilIcon, PenIcon, PlusIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import CheckBox from "../ui/check-box";

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
            <div className="grid gap-4 place-items-center grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
                {
                    pizzas.map(pizza =>
                        <CheckBox
                            key={pizza.id}
                            name={`pizza${pizza.id}`}
                            defaultChecked={IDs.includes(pizza.id)}
                            className="place-items-center has-checked:bg-lime-100 has-checked:border has-checked:border-green-500  p-4  rounded-md" >
                            <img src={pizza.foto || '/images/default-pizza.avif'} alt='foto' />
                            <span>{pizza.nombre}</span>
                        </CheckBox>
                    )
                }
            </div>

        </form>
    );
}

export default PedidoModificar;