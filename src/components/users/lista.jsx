'use client'

import Modal from '@/components/ui/modal';
import UserVer from '@/components/users/ver'
import ActiveButton from "@/components/ui/active-button";
import { activeUser, deleteUser, editUser, newUser } from "@/lib/actions/users";
import { use } from "react";
import { IconoInsertar, IconoModificar, IconoEliminar } from "@/components/ui/icons";
import Form from './form';
import { labelEliminar, labelInsertar, labelModificar } from '../ui/labels';





export default ({ session, promesaUsuarios }) => {
    const users = use(promesaUsuarios)

    const isAdminSession = session.user?.role === 'ADMIN'

    return (
        <div>
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={<IconoInsertar />}>
                    <Form
                        action={newUser}
                        isAdminSession={isAdminSession}
                        labelSubmit={labelInsertar}
                    />
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
        <div key={user.id} className="rounded-full p-1 flex justify-between items-center even:bg-blue-100 odd:bg-slate-100">

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
                        <Form
                            action={editUser}
                            isAdminSession={isAdminSession}
                            user={user}
                            labelSubmit={labelModificar}
                        />
                    </Modal>

                    <Modal openElement={<IconoEliminar />}>
                        <Form
                            action={deleteUser.bind(null, user)}
                            isAdminSession={isAdminSession}
                            user={user}
                            disabled
                            labelSubmit={labelEliminar}
                        />
                    </Modal>
                </div>
            }
        </div>
    )
}