'use client'
import { insertarPizza } from "@/lib/actions";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";


function PizzaInsertar() {
    const formId = useId()

    const [state, action, pending] = useActionState(insertarPizza, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state])

    return (
        <form className="flex flex-col gap-4" action={action}>
            <button type="submit" disabled={pending}
                className='self-end mb-4 font-bold bg-green-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-green-700 hover:text-gray-100 disabled:bg-zinc-400'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline' /> Guardar </div>
                }
            </button>

            <label>Nombre:
                <input name="nombre" placeholder="Nombre" />
            </label>

            <label>Precio:
                <input name="precio" type='number' step={0.01} min={0} />
            </label>

        </form>

    );
}

export default PizzaInsertar;