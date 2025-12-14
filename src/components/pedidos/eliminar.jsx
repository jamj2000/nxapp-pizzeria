'use client'
import { eliminarPedido } from "@/lib/actions/pedidos";
import { RefreshCwIcon, TrashIcon } from "lucide-react";
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";



function PedidoEliminar({ pedido }) {

    const formId = useId()

    const [state, action, pending] = useActionState(eliminarPedido, {})

    useEffect(() => {
        if (state.success) {
            toast.success(state.success)
            document.getElementById(formId)?.closest('dialog')?.close()
        }
    }, [state, formId])




    return (
        <div className="flex flex-col gap-4">
            <form id={formId} action={action} className="w-full flex flex-col px-4">
                <input type="hidden" name="id" defaultValue={pedido.id} />

                <button type="submit" disabled={pending}
                    className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
                >
                    {pending
                        ? <div><RefreshCwIcon className='inline animate-spin' /> Eliminando...</div>
                        : <div><TrashIcon className='inline' /> Eliminar </div>
                    }
                </button>
            </form>

            <p>FECHA Y HORA: {new Date(pedido.fecha_hora).toLocaleString()}</p>
            <p>Nombre del cliente: {pedido.cliente?.name}</p>
            <p>Dirección del cliente: {pedido.cliente?.address}</p>

        </div>
    );
}

export default PedidoEliminar;