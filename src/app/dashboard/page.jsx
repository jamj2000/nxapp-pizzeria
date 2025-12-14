import { auth } from "@/auth";
import { logout } from "@/lib/actions/auth";
import { LockIcon, PencilIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Spinner1 from "@/components/ui/spinner1";
import Users from "@/components/users/lista";
import Pedidos from "@/components/pedidos/lista";
import Spinner2 from "@/components/ui/spinner2";
import UserInfo from "@/components/users/info";


async function Dashboard() {
    const session = await auth()

    if (!session) redirect('/auth/login')

    // desestructuramos información de sesión   
    // const { user } = session
    // const { id, name, email, image, role } = user

    // obtenemos toda la información del usuario
    // const usuario = await getUserById(id)

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
                <UserInfo />
            </Suspense>



            {session.user.role === 'ADMIN' &&
                <>
                    <h1 className="text-xl font-bold mt-15">Lista de usuarios</h1>
                    <Suspense fallback={<Spinner1 />}>
                        <Users />
                    </Suspense>
                </>
            }

            {session.user.role === 'USER' &&
                <>
                    <h1 className="text-xl font-bold mt-15">Pedidos realizados</h1>
                    <Suspense fallback={<Spinner1 />}>
                        <Pedidos />
                    </Suspense>
                </>
            }

        </div >
    );
}

export default Dashboard;