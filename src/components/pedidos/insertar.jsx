'use client'
import { insertarPedido } from "@/lib/actions/pedidos";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId, useState } from "react";
import { toast } from "sonner";
import CheckBox from "../ui/check-box";


function PedidoInsertar({ user, clientes, repartidores, pizzas }) {

    const formId = useId()


    const [state, action, pending] = useActionState(insertarPedido, {})


    const [fechaActual] = useState(() => {
        const ahora = new Date()
        const local = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000)
        return local.toISOString().slice(0, 16) // YYYY-MM-DDTHH:MM
    })


    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])


    return (
        <form id={formId} action={action} className="flex flex-col gap-4">
            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline' /> Guardar </div>
                }
            </button>

            {/* <label> Fecha y hora:
                <input name="fecha_hora" type="datetime-local" defaultValue={new Date().toISOString().split('.')[0]} />
            </label> */}

            <label> Fecha y hora:
                <input
                    name="fecha_hora"
                    type="datetime-local"
                    defaultValue={fechaActual} />
            </label>


            <input type='hidden' name="clienteId" defaultValue={user.id} />


            <input type='hidden' name="repartidorId" />
            {/* <p className="font-bold">Repartidor</p> */}
            {/* <select name="repartidorId">
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

export default PedidoInsertar;