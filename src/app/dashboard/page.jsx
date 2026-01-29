import { auth } from "@/auth";
import { logout } from "@/lib/actions/auth";
import { LockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";
import { obtenerUsuarios } from "@/lib/data/users";
import { obtenerUsuarioPorId } from "@/lib/data/users";
import { IconoModificar } from "@/components/ui/icons";
import { editUser } from "@/lib/actions/users";
import { labelModificar } from "@/components/ui/labels";
import Form from "@/components/users/form";
import Modal from "@/components/ui/modal";
import Spinner1 from "@/components/ui/spinner1";
import Spinner2 from "@/components/ui/spinner2";
import ListaUsuarios from "@/components/users/lista";
import { obtenerPedidos } from "@/lib/data/pedidos";
import Link from "next/link";


export default async function Dashboard() {
    const session = await auth()

    if (!session) redirect('/auth/login')


    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <form action={logout}>
                    <button className="flex gap-2 justify-center items-center px-4 py-2 rounded-full hover:outline hover:outline-slate-300 cursor-pointer" >
                        <LockIcon /> <span className="hidden md:block">Cerrar sesión</span>
                    </button>
                </form>
            </div>

            <Suspense fallback={<Spinner2 />}>
                <UserInfo session={session} />
            </Suspense>



            {session.user.role === 'ADMIN' &&
                <>
                    <h1 className="text-xl font-bold mt-15">Lista de usuarios</h1>
                    <Suspense fallback={<Spinner1 />}>
                        <ListaUsuarios session={session} promesaUsuarios={obtenerUsuarios()} />
                    </Suspense>
                </>
            }

            {session.user.role === 'USER' &&
                <>
                    <h1 className="text-xl font-bold mt-15">Pedidos realizados</h1>
                    <Suspense fallback={<Spinner1 />}>
                        <UserPedidos promesaPedidos={obtenerPedidos(session.user.id)} />
                    </Suspense>
                </>
            }

        </div >
    )
}








async function UserInfo({ session }) {

    const usuario = await obtenerUsuarioPorId(session.user.id)
    const isAdminSession = session.user.role === 'ADMIN'

    return (
        <div className="grid md:grid-cols-[160px_auto]">

            <img src={usuario?.image || '/images/avatar-80.png'} className="size-36" alt="Imagen de usuario" />

            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    <p className="font-bold">{usuario.name}</p>
                    <Modal openElement={<IconoModificar />}>
                        <Form action={editUser} isAdminSession={isAdminSession} user={usuario} labelSubmit={labelModificar} />
                    </Modal>
                </div>
                <p>{usuario.email}</p>
                <p>{usuario.address}</p>
                <p>{usuario.phone}</p>
                <p>{usuario.role}</p>
            </div>
        </div>

    )
}




function UserPedidos({ promesaPedidos }) {

    const pedidos = use(promesaPedidos)

    return (
        <div>
            {pedidos
                .sort((a, b) => b.fecha_hora - a.fecha_hora)  // ordenado desde reciente a antiguo
                .map(pedido =>
                    <Link
                        key={pedido.id}
                        href={`/pedidos/${pedido.id}`}
                        className="flex gap-4 font-bold cursor-pointer hover:bg-slate-300 my-2 p-2"
                    >
                        <p>Nº {pedido.id}</p>
                        <p>{pedido.fecha_hora.toLocaleString()}</p>
                    </Link>)}
        </div>
    )
}
