'use client'
import { modificarPizza } from "@/lib/actions";
import { PencilIcon, RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import InputImage from "../input-image";



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
        <form id={formId} className="flex flex-col gap-4" action={action}>

            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline w-4 animate-spin' /> Actualizando...</div>
                    : <div><PencilIcon className='inline w-4' /> Actualizar </div>
                }
            </button>

            <input type="hidden" name="id" defaultValue={pizza.id} />

            <InputImage imgUrl={pizza.foto || '/images/default-pizza.avif'} className='size-100 object-cover' />
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