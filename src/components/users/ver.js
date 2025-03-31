import { UserRoundIcon } from "lucide-react";


function UserVer({ user }) {
    return (
        <div>
            <div className="grid md:grid-cols-[80px_auto]">
                {user.image
                    ? <img src={user.image} alt="Imagen de usuario" width={64} />
                    : <UserRoundIcon className="size-16" />
                }

                <div>
                    {user.active
                        ? <p className="text-xs text-green-700">Cuenta activada</p>
                        : <p className="text-xs text-red-700">Cuenta desactivada</p>
                    }
                    <h1 className="text-xl">{user.name}</h1>
                    <p className="text-xs text-gray-500">email: {user.email}</p>
                </div>
            </div>

            <p className="font-bold my-4">Pedidos realizados</p>
            <p className="flex flex-col gap-1">
                {user.pedidos
                    .map(pedido =>
                        <span key={pedido.id} className="">
                            {/* {new Intl.DateTimeFormat("es-ES", {
                                dateStyle: "full",
                                timeStyle: "long",
                                timeZone: "Europe/Madrid",
                            }).format(pedido.fecha_hora),
                            } */}
                            {pedido.fecha_hora.toLocaleString(Intl.DateTimeFormat("es-ES", {
                                dateStyle: "full",
                                timeStyle: "long",
                                timeZone: "Europe/Madrid",
                            }))}
                        </span>
                    )}
            </p>
        </div>
    );
}

export default UserVer;