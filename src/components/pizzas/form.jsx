'use client'
import { RefreshCwIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";
import { labelEliminar } from "@/components/ui/labels";
import InputImage from "@/components/ui/input-image";
import CheckBox from "@/components/ui/check-box";


export default function Form({ action, pizza, ingredientes, disabled = false, labelSubmit = labelEliminar }) {
    const formId = useId()

    const [state, faction, isPending] = useActionState(action, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
        if (state.error) {
            toast.error(state.error)
        }
    }, [state, formId])


    return (
        <form id={formId} action={faction} className="grid lg:grid-cols-[300px_1fr] gap-4">
            <input type="hidden" name="id" defaultValue={pizza?.id} />

            {disabled
                ? <img src={pizza?.foto || '/images/default-pizza.avif'} alt='foto' className='h-[200px] w-full lg:h-full object-cover' />
                : <InputImage imgUrl={pizza?.foto || '/images/default-pizza.avif'} className='h-[200px] w-full lg:h-full object-cover' />
            }


            <div className="p-4 flex flex-col w-full gap-2 bg-gray-100">
                <button
                    type="submit"
                    className="w-full h-12 flex justify-center items-center rounded-md hover:cursor-pointer hover:opacity-80 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    {isPending
                        ? <RefreshCwIcon size={20} className="animate-spin" />
                        : labelSubmit
                    }
                </button>

                <input
                    name="nombre"
                    className="appearance-none text-4xl bg-white disabled:bg-white"
                    placeholder="Nombre"
                    defaultValue={pizza?.nombre}
                    disabled={disabled}
                    required
                />

                <input
                    name="precio"
                    type='number' step={0.01} min={0}
                    className="text-3xl font-bold text-slate-300"
                    placeholder="Precio"
                    defaultValue={pizza?.precio}
                    disabled={disabled}
                    required
                />

                <p className="font-bold">Ingredientes</p>
                {disabled
                    ? pizza.ingredientes.map(ingrediente =>
                        <p key={ingrediente.id}>{ingrediente.nombre}</p>
                    )
                    : ingredientes?.map(ingrediente =>
                        <div key={ingrediente.id}>
                            <CheckBox
                                name={ingrediente.id}
                                defaultChecked={pizza?.ingredientes?.find(i => i.id === ingrediente.id)}
                                className={"has-checked:bg-green-200 has-checked:text-green-800 px-2 py-1 text-gray-500 rounded-full"}
                            >
                                {ingrediente.nombre}
                            </CheckBox>
                        </div>
                    )
                }
            </div>
        </form>
    )
}
