'use client'
import { editUser } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { PlusIcon, RefreshCwIcon, UserRoundIcon } from 'lucide-react';
import { toast } from 'sonner';
import Check from '@/components/check';





export default function UserModificar({ user }) {
    const formId = useId()
    const [state, action, pending] = useActionState(editUser, {})

    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} className="w-full flex flex-col gap-4">
            <input type="hidden" name="id" defaultValue={user.id} />

            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Actualizando...</div>
                    : <div><PlusIcon className='inline' /> Actualizar </div>
                }
            </button>

            {user.image
                ? <img src={user.image} alt="Imagen de usuario" width={64} />
                : <UserRoundIcon className="size-16" />
            }

            {user?.role === 'ADMIN' &&
                <Check
                    id={'active'}
                    label=''
                    defaultChecked={user.active == true}
                    className={"text-xs w-fit after:content-['_Cuenta_no_activa'] has-checked:after:content-['_Cuenta_activa'] has-checked:bg-green-200 has-checked:text-green-800  px-2 py-1 text-gray-500 rounded-full"} />
            }

            <div className='flex flex-col md:flex-row md:gap-10'>

                <div className='w-full md:w-2/3 flex flex-col gap-2'>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='name' className="font-bold w-full md:w-1/4">Nombre</label>
                        <input type='text' id='name' name='name'
                            defaultValue={user.name}
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='email' className="font-bold w-full md:w-1/4">email</label>
                        <input type='text' id='email' name='email'
                            defaultValue={user.email}
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='address' className="font-bold w-full md:w-1/4">Domicilio</label>
                        <input type='text' id='address' name='address'
                            defaultValue={user.address}
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='phone' className="font-bold w-full md:w-1/4">Teléfono</label>
                        <input type='text' id='phone' name='phone'
                            defaultValue={user.phone}
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                </div>
            </div>

        </form>
    )
}