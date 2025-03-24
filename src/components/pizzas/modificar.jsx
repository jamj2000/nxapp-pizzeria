'use client'
import { modificarPizza } from "@/lib/actions";
import { PencilIcon, PenIcon, PlusIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";



function PizzaModificar({ pizza }) {
    const formId = useId()

    const [state, action, pending] = useActionState(modificarPizza, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state])

    return (
        <form className="flex flex-col gap-4" action={action}>

            <button type="submit" disabled={pending}
                className='self-end mb-4 font-bold bg-amber-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-amber-700 hover:text-gray-100 disabled:bg-zinc-400'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Actualizando...</div>
                    : <div><PencilIcon className='inline' /> Actualizar </div>
                }
            </button>

            <input type="hidden" name="id" defaultValue={pizza.id} />

            <label>Nombre:
                <input name="nombre" defaultValue={pizza.nombre} />
            </label>

            <label>Precio:
                <input name="precio" type='number' step={0.01} min={0} defaultValue={pizza.precio} />
            </label>

        </form>
    );
}

export default PizzaModificar;