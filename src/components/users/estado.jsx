'use client'

import { activeUser } from "@/lib/actions/users"
import { LoaderCircleIcon, UserRoundIcon } from "lucide-react";
import { useFormStatus } from "react-dom";




function ActiveButton({ user }) {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending}
            className={`disabled:bg-slate-500 rounded-full`}
            title={`${user.active ? 'Desactivar usuario' : 'Activar usuario'}`}
        >
            {pending
                ? <LoaderCircleIcon className={`text-white size-8 p-2 rounded-full animate-spin`} />
                : <UserRoundIcon className={`${user.active ? 'bg-blue-800' : 'bg-blue-300'} text-white size-8 p-2 rounded-full`} />
            }

        </button>
    )
}



export default function Estado({ user, editable = false }) {
    if (!editable)
        return <ActiveButton user={user} />

    return (
        <form action={activeUser.bind(null, user)} className="flex items-center">
            <ActiveButton user={user} />
        </form>
    )
}





