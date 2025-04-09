'use client'
import { insertarPedido } from "@/lib/actions";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import CheckBox from "../check-box";


function PedidoInsertar({ user, clientes, repartidores, pizzas }) {

    const formId = useId()

    const [state, action, pending] = useActionState(insertarPedido, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state])

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
                    defaultValue={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('.')[0]} />
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
                            className="place-items-center has-checked:bg-green-200 has-checked:border has-checked:border-green-500  p-4  rounded-md" >
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