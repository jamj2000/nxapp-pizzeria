'use client'

import { TrashIcon, PencilIcon, PlusIcon, UserRoundIcon } from "lucide-react";
import Modal from '@/components/ui/modal';
import UserVer from '@/components/users/ver'
import UserModificar from '@/components/users/modificar';
import UserEliminar from '@/components/users/eliminar';
import UserInsertar from "@/components/users/insertar";
import ActiveButton from "@/components/ui/active-button";
import { activeUser, updateActiveUser } from "@/lib/actions/users";
import { use } from "react";



export default ({ session, promesaUsuarios }) => {
    const users = use(promesaUsuarios)

    const isAdminSession = session.user?.role === 'ADMIN'

    return (
        <div>
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={
                    <PlusIcon size={32}
                        className='text-green-500 border border-green-500 rounded-full bg-green-200 p-2 cursor-pointer hover:text-white hover:bg-green-500'
                    />}>
                    <UserInsertar isAdminSession={isAdminSession} />
                </Modal>
            </div>

            {users
                .filter(user => user.id !== session.user.id)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(user => <Item user={user} isAdminSession={isAdminSession} key={user.id} />)
            }
        </div >

    )
}




const Item = ({ user, isAdminSession }) => {
    return (
        <div key={user.id} className="p-1 flex justify-between items-center odd:bg-slate-100">

            <div className="flex gap-2 items-center">
                {isAdminSession &&
                    <form action={activeUser.bind(null, user)}>
                        <ActiveButton user={user} />
                    </form>
                    // <button
                    //     type="button"
                    //     className={`${user.active ? 'bg-slate-600' : 'bg-slate-300'} disabled:bg-stone-700 p-2 rounded-full self-end hover:bg-slate-400 `}
                    //     onClick={() => updateActiveUser(user.id, !user.active)}
                    // >
                    //     <UserRoundIcon className={`text-white size-4`} />
                    // </button>
                }
                <Modal openElement={<p className="cursor-pointer">{user.name}</p>}>
                    <UserVer user={user} />
                </Modal>
            </div>

            {isAdminSession &&
                <div className='flex justify-center items-center gap-1'>

                    <Modal openElement={
                        <div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                            <PencilIcon className='size-4' />
                        </div>}>
                        <UserModificar isAdminSession={isAdminSession} user={user} />
                    </Modal>
                    <Modal openElement={
                        <div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                            <TrashIcon className='size-4' />
                        </div>}>
                        <UserEliminar user={user} />
                    </Modal>
                </div>
            }
        </div>
    )
}