'use client'
import { eliminarPizza } from "@/lib/actions/pizzas";
import { RefreshCwIcon, TrashIcon } from "lucide-react";
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
    }, [state, formId])

    return (
        <div className="flex flex-col gap-4">
            <form id={formId} action={action} className="w-full flex flex-col px-4">
                <input type="hidden" name="id" defaultValue={pizza.id} />

                <button type="submit" disabled={pending}
                    className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
                >
                    {pending
                        ? <div><RefreshCwIcon className='inline w-4 animate-spin' /> Eliminando...</div>
                        : <div><TrashIcon className='inline w-4' /> Eliminar </div>
                    }
                </button>
            </form>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <img src={pizza.foto || '/images/default-pizza.avif'} alt='foto' width={400} />

                    <div className="flex flex-col justify-center w-full">
                        <p className="text-4xl">{pizza.nombre}</p>
                        <p className="text-4xl font-bold text-slate-300">{pizza.precio} €</p>
                        <p className="font-bold">Ingredientes</p>
                        {pizza.ingredientes.map(ingrediente =>
                            <p key={ingrediente.id}>{ingrediente.nombre}</p>
                        )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PizzaEliminar;