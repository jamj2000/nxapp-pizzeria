'use client'

import Modal from '@/components/ui/modal';
import UserVer from '@/components/users/ver'
import UserModificar from '@/components/users/modificar';
import UserEliminar from '@/components/users/eliminar';
import UserInsertar from "@/components/users/insertar";
import ActiveButton from "@/components/ui/active-button";
import { activeUser, updateActiveUser } from "@/lib/actions/users";
import { use } from "react";
import { IconoInsertar, IconoModificar, IconoEliminar } from "@/components/ui/icons";





export default ({ session, promesaUsuarios }) => {
    const users = use(promesaUsuarios)

    const isAdminSession = session.user?.role === 'ADMIN'

    return (
        <div>
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={<IconoInsertar />}>
                    <UserInsertar isAdminSession={isAdminSession} />
                </Modal>
            </div>

            {users
                .filter(user => user.id !== session.user.id)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(user => <UserItem user={user} isAdminSession={isAdminSession} key={user.id} />)
            }
        </div >

    )
}




const UserItem = ({ user, isAdminSession }) => {
    return (
        <div key={user.id} className="p-1 flex justify-between items-center odd:bg-slate-100">

            <div className="flex gap-2 items-center">
                {isAdminSession &&
                    <form action={activeUser.bind(null, user)}>
                        <ActiveButton user={user} />
                    </form>
                }
                <Modal openElement={<p className="cursor-pointer">{user.name}</p>}>
                    <UserVer user={user} />
                </Modal>
            </div>

            {isAdminSession &&
                <div className='flex justify-center items-center gap-1'>

                    <Modal openElement={<IconoModificar />}>
                        <UserModificar isAdminSession={isAdminSession} user={user} />
                    </Modal>

                    <Modal openElement={<IconoEliminar />}>
                        <UserEliminar user={user} />
                    </Modal>
                </div>
            }
        </div>
    )
}