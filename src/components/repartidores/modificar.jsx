'use client'
import { PencilIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import { modificarRepartidor } from "@/lib/actions/repartidores";



function RepartidorModificar({ repartidor }) {
    const formId = useId()

    const [state, action, pending] = useActionState(modificarRepartidor, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])

    return (
        <form id={formId} className="flex flex-col gap-4" action={action}>

            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Actualizando...</div>
                    : <div><PencilIcon className='inline' /> Actualizar </div>
                }
            </button>

            <input type="hidden" name="id" defaultValue={repartidor.id} />

            <label>Nombre:
                <input name='nombre' defaultValue={repartidor.nombre} />
            </label>

            <label>Teléfono:
                <input name='telefono' defaultValue={repartidor.telefono} />
            </label>

        </form>
    );
}

export default RepartidorModificar;