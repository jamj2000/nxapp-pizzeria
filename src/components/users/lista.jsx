'use client'

import Modal from '@/components/ui/modal';
import { deleteUser, editUser, newUser } from "@/lib/actions/users";
import { use } from "react";
import { IconoInsertar, IconoModificar, IconoEliminar } from "@/components/ui/icons";
import Form from './form';
import { Label, labelEliminar, labelInsertar, labelModificar } from '../ui/labels';
import Estado from './estado';





export default ({ session, promesaUsuarios }) => {
    const users = use(promesaUsuarios)
    const isAdminSession = session.user?.role === 'ADMIN'

    const Insertar = () =>
        <Modal openElement={<IconoInsertar />}>
            <Form
                action={newUser}
                isAdminSession={isAdminSession}
                labelSubmit={labelInsertar}
            />
        </Modal>

    const Modificar = ({ user }) =>
        <Modal openElement={<IconoModificar />}>
            <Form
                user={user}
                action={editUser}
                labelSubmit={labelModificar}
                isAdminSession={isAdminSession}
            />
        </Modal>


    const Eliminar = ({ user }) =>
        <Modal openElement={<IconoEliminar />}>
            <Form
                user={user}
                action={deleteUser.bind(null, user)}
                labelSubmit={labelEliminar}
                isAdminSession={isAdminSession}
                disabled
            />
        </Modal>


    const Mostrar = ({ user }) =>
        <Modal openElement={<p className="cursor-pointer">{user.name}</p>}>
            <Form
                user={user}
                action={() => { return { ok: true } }}
                labelSubmit={<Label color="green">Aceptar</Label>}
                isAdminSession={isAdminSession}
                disabled
            />
        </Modal>


    const Item = ({ user, children }) => {
        return (
            <div key={user.id} className="rounded-full p-2 flex justify-between items-center even:bg-blue-100 odd:bg-slate-100 hover:outline hover:outline-slate-400">

                <div className="flex gap-2 items-center">
                    <img src={user?.image || '/images/avatar-80.png'} alt="Imagen de usuario"
                        className={`size-8 ${!user.active && 'grayscale brightness-200'}`}
                    />
                    <Mostrar user={user} />
                </div>

                <div className='flex justify-center items-center gap-1'>
                    {children}
                </div>

            </div>
        )
    }



    return (
        <div>
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Insertar />
            </div>

            {users
                .filter(user => user.id !== session.user.id)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(user =>
                    <Item key={user.id} user={user}>
                        <Estado user={user} editable={isAdminSession} />
                        <Modificar user={user} />
                        <Eliminar user={user} />
                    </Item>
                )
            }
        </div >

    )
}






