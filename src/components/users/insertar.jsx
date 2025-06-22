"use client"
import { newUser } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import CheckBox from '@/components/check-box';
import InputAvatar from '@/components/input-avatar';



export default function UserInsertar({ session }) {
    const formId = useId()
    const [state, action, pending] = useActionState(newUser, {})


    useEffect(() => {
        if (state?.success) toast.success(state.success)
        if (state?.error) toast.error(state.error)

        document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
    }, [formId, state])


    return (
        <form id={formId} action={action} className="w-full flex flex-col gap-4 @container">

            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline' /> Guardar</div>
                }
            </button>

            <CheckBox
                name={'active'}
                defaultChecked={true}
                className={"self-end mb-4 text-xs w-fit after:content-['_Cuenta_no_activa'] has-checked:after:content-['_Cuenta_activa'] has-checked:bg-green-200 has-checked:text-green-800  px-2 py-1 text-gray-500 rounded-full"}
            >
            </CheckBox>

            <InputAvatar name='image' />



            <div className='flex flex-col md:flex-row md:gap-10'>
                <div className='w-full md:w-2/3 flex flex-col gap-2'>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='name' className="font-bold w-full md:w-1/4">Nombre</label>
                        <input type='text' id='name' name='name'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='email' className="font-bold w-full md:w-1/4">Email</label>
                        <input type='email' id='email' name='email'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='password' className="font-bold w-full md:w-1/4">Contraseña</label>
                        <input type='text' id='password' name='password'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='address' className="font-bold w-full md:w-1/4">Domicilio</label>
                        <input type='text' id='address' name='address'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='phone' className="font-bold w-full md:w-1/4">Teléfono</label>
                        <input type='text' id='phone' name='phone'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    {session.user.role === 'ADMIN' &&
                        <div className="flex flex-col md:flex-row items-center md:space-x-4">
                            <label htmlFor='role' className="font-bold w-full md:w-1/4">Rol</label>
                            <select
                                id="role"
                                name="role"
                                defaultValue='USER' >
                                <option value='USER'> USER </option>
                                <option value='ADMIN'> ADMIN </option>
                            </select>
                        </div>
                    }


                </div>
            </div>
        </form >
    )
}