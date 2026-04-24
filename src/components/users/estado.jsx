'use client'

import { useTransition } from "react"
import { activeUser } from "@/lib/actions/users"
import { LoaderCircleIcon, UserRoundIcon } from "lucide-react"


export default function Estado({ user, editable = false }) {
    const [isPending, startTransition] = useTransition()

    const handleAction = () => {
        // Forma simplificada
        if (editable) startTransition(() => activeUser(user))

        // Forma larga    
        // if (editable) startTransition(async () => {
        //    await activeUser(user)
        // })
    }


    return (
        <button
            onClick={handleAction}
            disabled={isPending || !editable}
            title={user.active ? "Desactivar usuario" : "Activar usuario"}
            className="rounded-full transition-all flex items-center"
        >
            {isPending
                ? <LoaderCircleIcon className="bg-slate-500 text-white size-8 p-2 rounded-full animate-spin" />
                : <UserRoundIcon
                    className={`text-white size-8 p-2 rounded-full transition-colors
                             ${user?.active ? "bg-blue-800" : "bg-slate-300"} 
                             ${editable ? "cursor-pointer hover:outline hover:outline-blue-500" : ""}
                    `}
                />
            }
        </button>
    )
}


// 'use client'

// import { activeUser } from "@/lib/actions/users"
// import { LoaderCircleIcon, UserRoundIcon } from "lucide-react"
// import { useFormStatus } from "react-dom"




// function ActiveButton({ user }) {
//     const { pending } = useFormStatus()

//     return (
//         <button
//             disabled={pending}
//             className={`disabled:bg-slate-500 rounded-full`}
//             title={`${user.active ? 'Desactivar usuario' : 'Activar usuario'}`}
//         >
//             {pending
//                 ? <LoaderCircleIcon className={`text-white size-8 p-2 rounded-full animate-spin`} />
//                 : <UserRoundIcon className={`${user.active ? 'bg-blue-800' : 'bg-slate-300'} text-white size-8 p-2 rounded-full cursor-pointer hover:outline hover:outline-blue-500`} />
//             }

//         </button>
//     )
// }



// export default function Estado({ user, editable = false }) {
//     if (!editable)
//         return <ActiveButton user={user} />

//     return (
//         <form action={activeUser.bind(null, user)} className="flex items-center">
//             <ActiveButton user={user} />
//         </form>
//     )
// }
