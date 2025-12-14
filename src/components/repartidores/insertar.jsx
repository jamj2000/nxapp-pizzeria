'use client'
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import { insertarRepartidor } from "@/lib/actions/repartidores";


function RepartidorInsertar() {
    const formId = useId()

    const [state, action, pending] = useActionState(insertarRepartidor, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])


    return (
        <form id={formId} className="flex flex-col gap-4" action={action}>
            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline' /> Guardar </div>
                }
            </button>

            <label>Nombre:
                <input name='nombre' placeholder="Nombre" required />
            </label>

            <label>Teléfono:
                <input name='telefono' placeholder="Teléfono" />
            </label>

        </form>

    );
}

export default RepartidorInsertar;