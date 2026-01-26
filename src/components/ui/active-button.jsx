'use client'

import { LoaderCircleIcon, UserRoundIcon } from "lucide-react";
import { useFormStatus } from "react-dom";



function ActiveButton({ user }) {
    const { pending } = useFormStatus()

    return (
        <button disabled={pending}
            className={`${user.active ? 'bg-blue-800' : 'bg-blue-300'} disabled:bg-slate-500 p-2 rounded-full self-end hover:outline hover:ouline-black `}
            title={`${user.active ? 'Desactivar usuario' : 'Activar usuario'}`}>
            {pending
                ? <LoaderCircleIcon className={`text-white size-4 animate-spin`} />
                : <UserRoundIcon className={`text-white size-4`} />
            }

        </button>
    );
}

export default ActiveButton