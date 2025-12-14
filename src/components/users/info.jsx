import { getUserById } from "@/lib/data/users";
import Modal from "@/components/ui/modal";
import UserModificar from "@/components/users/modificar";
import { auth } from "@/auth";
import { PencilIcon } from "lucide-react";

async function UserInfo() {

    const session = await auth()
    const usuario = await getUserById(session.user.id)

    return (
        <div className="grid md:grid-cols-[160px_auto]">

            <img src={usuario?.image || '/images/avatar-80.png'} className="size-36" alt="Imagen de usuario" />

            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    <p className="font-bold">{usuario.name}</p>
                    <Modal openElement={
                        <div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                            <PencilIcon className='size-4' />
                        </div>}>
                        <UserModificar session={session} user={usuario} />
                    </Modal>
                </div>
                <p>{usuario.email}</p>
                <p>{usuario.address}</p>
                <p>{usuario.phone}</p>
                <p>{usuario.role}</p>
            </div>
        </div>

    );
}

export default UserInfo;