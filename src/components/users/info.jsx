import { obtenerUsuarioPorId } from "@/lib/data/users";
import Modal from "@/components/ui/modal";
import UserModificar from "@/components/users/modificar";
import { auth } from "@/auth";
import { IconoModificar } from "@/components/ui/icons";



async function UserInfo() {

    const session = await auth()
    const usuario = await obtenerUsuarioPorId(session.user.id)

    return (
        <div className="grid md:grid-cols-[160px_auto]">

            <img src={usuario?.image || '/images/avatar-80.png'} className="size-36" alt="Imagen de usuario" />

            <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                    <p className="font-bold">{usuario.name}</p>
                    <Modal openElement={<IconoModificar />}>
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