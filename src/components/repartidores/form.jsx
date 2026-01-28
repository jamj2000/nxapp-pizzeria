
'use client'
import { RefreshCwIcon } from "lucide-react"
import { useActionState, useId, useEffect } from "react"
import { toast } from "sonner"
import { labelDefault } from "@/components/ui/labels"



export default function Form({ action, repartidor, disabled = false, labelSubmit = labelDefault }) {
    const formId = useId()
    const [state, faction, isPending] = useActionState(action, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog').close()
        }
        if (state.error) {
            toast.error(state.error)
        }
    }, [state])

    return (
        <form id={formId} action={faction} className="flex flex-col gap-2 border p-4 border-blue-400" >
            <input type="hidden" name="id" defaultValue={repartidor?.id} />


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



            <label>Nombre:
                <input
                    name='nombre'
                    defaultValue={repartidor?.nombre}
                    disabled={disabled}
                />
            </label>

            <label>Teléfono:
                <input
                    name='telefono'
                    defaultValue={repartidor?.telefono}
                    disabled={disabled}
                />
            </label>



        </form >
    )
}



