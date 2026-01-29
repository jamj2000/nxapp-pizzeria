'use client'

import Modal from '@/components/ui/modal';
import ActiveButton from "@/components/ui/active-button";
import { activeUser, deleteUser, editUser, newUser } from "@/lib/actions/users";
import { use } from "react";
import { IconoInsertar, IconoModificar, IconoEliminar } from "@/components/ui/icons";
import Form from './form';
import { labelEliminar, labelInsertar, labelModificar } from '../ui/labels';
import CheckBox from '../ui/check-box';





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
                    <UserInfo user={user} />
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



function UserInfo({ user }) {
    return (
        <>
            <div className="grid lg:grid-cols-[300px_1fr] gap-4">
                <div className="flex flex-col gap-2">

                    <img src={user?.image || '/images/avatar-80.png'} alt="Imagen de usuario" className='h-[200px] w-full lg:h-full object-contain' />


                    <CheckBox
                        key={`active-${user?.active}`}  // Para actualizar VDOM al detectar cambio
                        name={'active'}
                        defaultChecked={user?.active == true}
                        className={"self-center mb-4 text-sm w-fit after:content-['_Cuenta_no_activa'] has-checked:after:content-['_Cuenta_activa'] has-checked:bg-green-200 has-checked:text-green-800  px-2 py-1 text-gray-500 rounded-full"}
                        disabled
                    />
                </div>

                <div className="p-4 flex flex-col w-full gap-2 bg-gray-100">

                    <p className="text-4xl">
                        {user?.name}
                    </p>

                    <p className="text-2xl">
                        {user?.email}
                    </p>

                    <p className="text-2xl">
                        {user?.address}
                    </p>

                    <p className="text-2xl">
                        {user?.phone}
                    </p>

                    <p className="text-2xl">
                        {user?.role}
                    </p>
                </div>
            </div>

            {/* Mostramos los pedidos si el formulario está deshabilitado */}

            <div className="text-lg flex flex-col gap-2">
                <h2 className="text-xl font-bold mt-4">Pedidos realizados</h2>
                {user.pedidos
                    .map(pedido =>
                        <p key={pedido.id} className="flex gap-4">
                            <span>Nº {pedido.id}</span>
                            <span>
                                {pedido.fecha_hora.toLocaleString(Intl.DateTimeFormat("es-ES", {
                                    dateStyle: "full",
                                    timeStyle: "long",
                                    timeZone: "Europe/Madrid",
                                }))}
                            </span>
                        </p>
                    )}
            </div>

        </>
    )
}


// function UserInfo({ user }) {
//     return (
//         <div>
//             <div className="grid md:grid-cols-[120px_auto] gap-4">

//                 <img src={user.image || '/images/avatar-80.png'} alt="Imagen de usuario" width={192} />

//                 <div>
//                     {user.active
//                         ? <p className="text-xs text-green-700">Cuenta activada</p>
//                         : <p className="text-xs text-red-700">Cuenta desactivada</p>
//                     }
//                     <h1 className="font-bold text-2xl">{user.name}</h1>
//                     <p className="text-gray-500">email: {user.email}</p>
//                     <p className="text-gray-500">dirección: {user.address}</p>
//                     <p className="text-gray-500">teléfono: {user.phone}</p>
//                 </div>
//             </div>

//             <h2 className="font-bold mt-4">Pedidos realizados</h2>
//             <div className="flex flex-col gap-1">
//                 {user.pedidos
//                     .map(pedido =>
//                         <p key={pedido.id} className="flex gap-4">
//                             <span>Nº {pedido.id}</span>
//                             <span>
//                                 {pedido.fecha_hora.toLocaleString(Intl.DateTimeFormat("es-ES", {
//                                     dateStyle: "full",
//                                     timeStyle: "long",
//                                     timeZone: "Europe/Madrid",
//                                 }))}
//                             </span>
//                         </p>
//                     )}
//             </div>
//         </div>
//     )
// }
