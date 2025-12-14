'use client'
import { RefreshCwIcon, TrashIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import { eliminarRepartidor } from "@/lib/actions/repartidores";


function RepartidorEliminar({ repartidor }) {
    const formId = useId()

    const [state, action, pending] = useActionState(eliminarRepartidor, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])

    return (
        <div className="flex flex-col gap-4">
            <form id={formId} action={action} className="w-full flex flex-col px-4">
                <input type="hidden" name="id" defaultValue={repartidor.id} />

                <button type="submit" disabled={pending}
                    className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
                >
                    {pending
                        ? <div><RefreshCwIcon className='inline animate-spin' /> Eliminando...</div>
                        : <div><TrashIcon className='inline' /> Eliminar </div>
                    }
                </button>
            </form>
            <p>REPARTIDOR: {repartidor.nombre}</p>
            <p>TELÉFONO: {repartidor.telefono}</p>

        </div>
    );
}

export default RepartidorEliminar;