'use client'
import { eliminarPizza } from "@/lib/actions";
import { TrashIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";


function PizzaEliminar({ pizza }) {
    const formId = useId()

    const [state, action, pending] = useActionState(eliminarPizza, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state])

    return (
        <div className="flex flex-col gap-4">
            <form id={formId} action={action} className="w-full flex flex-col px-4">
                <input type="hidden" name="id" defaultValue={pizza.id} />

                <button type="submit" disabled={pending}
                    className='self-end mb-4 font-bold bg-red-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700 hover:text-gray-100 disabled:bg-zinc-400'
                >
                    {pending
                        ? <div><RefreshCwIcon className='inline animate-spin' /> Eliminando...</div>
                        : <div><TrashIcon className='inline' /> Eliminar </div>
                    }
                </button>
            </form>


            <p>PIZZA: {pizza.nombre}</p>
            <p>PRECIO: {pizza.precio}</p>


        </div>
    );
}

export default PizzaEliminar;