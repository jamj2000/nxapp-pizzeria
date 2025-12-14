'use client'
import { deleteUser } from "@/lib/actions/users";
import { RefreshCwIcon, TrashIcon, UserRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";   // IMPORTANTE: No importar desde next/router
import { useActionState, useEffect, useId } from "react";
import { toast } from "sonner";



function UserEliminar({ user }) {
    const formId = useId()
    const [state, action, pending] = useActionState(deleteUser, {})
    const { refresh } = useRouter()


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
            refresh()  // refrescamos página despues de mostrar toast
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])



    return (
        <div>
            <form id={formId} action={action} className="w-full flex flex-col px-4">
                <input type="hidden" name="id" defaultValue={user.id} />

                <button type="submit" disabled={pending}
                    className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
                >
                    {pending
                        ? <div><RefreshCwIcon className='inline animate-spin' /> Eliminando...</div>
                        : <div><TrashIcon className='inline' /> Eliminar</div>
                    }
                </button>
            </form>
            <div className="grid md:grid-cols-[120px_auto] gap-4">

                <img src={user.image || '/images/avatar-80.png'} alt="Imagen de usuario" width={192} />

                <div>
                    {user.active
                        ? <p className="text-xs text-green-700">Cuenta activada</p>
                        : <p className="text-xs text-red-700">Cuenta desactivada</p>
                    }
                    <h1 className="font-bold text-2xl">{user.name}</h1>
                    <p className="text-gray-500">email: {user.email}</p>
                    <p className="text-gray-500">dirección: {user.address}</p>
                    <p className="text-gray-500">teléfono: {user.phone}</p>
                </div>
            </div>

            <h2 className="font-bold mt-4">Pedidos realizados</h2>
            <div className="flex flex-col gap-1">
                {user.pedidos
                    .map(pedido =>
                        <p key={pedido.id} className="flex gap-4">
                            <span>Nº {pedido.id}</span>
                            <span>
                                {pedido.fecha_hora.toLocaleString(Intl.DateTimeFormat("es-ES", {
                                    dateStyle: "full",
                                    timeStyle: "long",
                                    timeZone: "Europe/Madrid",
                                }))}
                            </span>
                        </p>
                    )}
            </div>

        </div>
    );
}

export default UserEliminar;