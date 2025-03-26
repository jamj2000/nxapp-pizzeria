import { auth } from "@/auth";
import { logout } from "@/lib/actions";
import { LockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Spinner1 from "@/components/spinner1";
import Users from "@/components/users/lista";


async function Dashboard() {
    const session = await auth()

    if (!session) redirect('/auth/login')

    const { user: { name, email, image, role } } = session

    return (
        <div className="mt-10 p-10">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <form action={logout}>
                    <button className="flex gap-2 justify-center items-center px-4 py-2 rounded-full hover:outline hover:outline-slate-300 cursor-pointer" >
                        <LockIcon /> <span className="hidden md:block">Cerrar sesión</span>
                    </button>
                </form>
            </div>


            <div className="grid md:grid-cols-[150px_auto]">
                {image
                    ? <img src={image} className="size-30" />
                    : <img src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg" className="size-30" />
                }
                <div className="my-2 flex flex-col gap-2">
                    <p className="font-bold">{name}</p>
                    <p>{email}</p>
                    <p>{role}</p>
                </div>
            </div>

            {session.user.role === 'ADMIN' &&
                <>
                    <h1 className="text-xl font-bold mt-15">Lista de usuarios</h1>
                    <Suspense fallback={<Spinner1 />}>
                        <Users />
                    </Suspense>
                </>
            }

        </div >
    );
}

export default Dashboard;