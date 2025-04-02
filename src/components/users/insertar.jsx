"use client"
import { newUser, newuser } from '@/lib/actions'
import { useActionState, useEffect, useId } from 'react'
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';
import CheckBox from '@/components/check-box';
import CheckRadio from '@/components/check-radio';



export default function UserInsertar() {
    const formId = useId()
    const [state, action, pending] = useActionState(newUser, {})


    useEffect(() => {
        if (state?.success) {
            toast.success(state.success)
            document.getElementById(formId).closest('dialog')?.close() // Si el padre es un dialog, lo cerramos
        }
        if (state?.error) toast.error(state.error)

    }, [formId, state])


    return (
        <form id={formId} action={action} className="w-full flex flex-col gap-4">

            <button type="submit" disabled={pending}
                className='my-4 px-4 py-2 w-fit rounded-full self-end outline-none border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer disabled:bg-zinc-400 disabled:text-zinc-100 disabled:cursor-default'
            >
                {pending
                    ? <div><RefreshCwIcon className='inline animate-spin' /> Guardando...</div>
                    : <div><PlusIcon className='inline' /> Guardar</div>
                }
            </button>


            <div className='grid place-items-center grid-cols-[repeat(auto-fill,minmax(40px,1fr))]'>
                {/* Avatares 00 .. 79 */}
                {[...Array(80)].map((_, index) => (
                    <CheckRadio key={index}
                        name='image'
                        defaultValue={`/images/avatar-${String(index).padStart(2, '0')}.png`}
                        className="size-14 has-checked:col-span-5 has-checked:row-span-3 has-checked:-order-1 has-checked:size-36 has-checked:bg-green-200 px-2 py-1 rounded-md"
                    >
                        <img src={`/images/avatar-${String(index).padStart(2, '0')}.png`} alt="Imagen de usuario" />
                    </CheckRadio>
                ))}
                {/* Avatar 80, por defecto */}
                <CheckRadio key={80}
                    name='image'
                    defaultValue={`/images/avatar-80.png`}
                    defaultChecked={true}
                    className="size-14 has-checked:col-span-5 has-checked:row-span-3 has-checked:-order-1 has-checked:size-36 has-checked:bg-green-200 px-2 py-1 rounded-md"
                >
                    <img src={`/images/avatar-80.png`} alt="Imagen de usuario" />
                </CheckRadio>
            </div>




            <div className='flex flex-col md:flex-row md:gap-10'>
                <div className='w-full md:w-2/3 flex flex-col gap-2'>

                    <CheckBox
                        name={'active'}
                        defaultChecked={true}
                        className={"text-xs w-fit after:content-['_Cuenta_no_activa'] has-checked:after:content-['_Cuenta_activa'] has-checked:bg-green-200 has-checked:text-green-800  px-2 py-1 text-gray-500 rounded-full"}
                    >
                    </CheckBox>


                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='name' className="font-bold w-full md:w-1/4">Nombre</label>
                        <input type='text' id='name' name='name'
                            className="w-full md:w-3/4 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-4">
                        <label htmlFor='email' className="font-bold w-full md:w-1/4">email</label>
                        <input type='email' id='email' name='email'
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

                </div>
            </div>
        </form >
    )
}