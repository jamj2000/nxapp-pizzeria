'use client'
import { insertarPizza } from "@/lib/actions/pizzas";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { use, useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import InputImage from "@/components/ui/input-image";
import CheckBox from "@/components/ui/check-box";


function PizzaInsertar({ ingredientes }) {
    const formId = useId()

    const [state, action, pending] = useActionState(insertarPizza, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])


    return (
        <form id={formId} className="@container flex flex-col gap-4" action={action}>
            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline w-4 animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline w-4' /> Guardar </div>
                }
            </button>

            <div className="flex flex-col items-center @lg:flex-row gap-4">
                <InputImage imgUrl='/images/default-pizza.avif' className='w-[30%] aspect-square object-cover self-end' />

                <div className="w-full grid sm:grid-cols-[100px_auto] auto-rows-min items-center">
                    <label htmlFor="nombre" className="font-bold">Nombre</label>
                    <input id="nombre" name="nombre" placeholder="Nombre" required className="outline-none focus:bg-slate-50" />

                    <label htmlFor="precio" className="font-bold">Precio</label>
                    <input id="precio" name="precio" type='number' step={0.01} min={0} className="outline-none focus:bg-slate-50" />
                </div>
            </div>
            <div>
                <p className="font-bold">Ingredientes</p>
                <div className="text-xs flex flex-wrap gap-3">
                    {ingredientes?.map(ingrediente =>
                        <div key={ingrediente.id}>
                            <CheckBox
                                name={ingrediente.id}
                                className={"has-checked:bg-green-200 has-checked:text-green-800 px-2 py-1 text-gray-500 rounded-full"}>
                                {ingrediente.nombre}
                            </CheckBox>
                        </div>
                    )}
                </div>
            </div>
        </form>

    );
}

export default PizzaInsertar;