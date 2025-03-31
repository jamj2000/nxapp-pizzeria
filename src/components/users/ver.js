import { UserIcon } from "lucide-react";


function UserVer({ user }) {
    return (
        <div>
            <div className="grid md:grid-cols-[80px_auto]">
                {user.image
                    ? <img src={user.image} alt="Imagen de usuario" width={64} />
                    : <UserIcon className="size-16" />
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
                    ?.sort((a, b) => a.slug.localeCompare(b.slug))
                    .map(post =>
                        <span key={post.id} className="">
                            {post.title}
                        </span>
                    )}
            </p>
        </div>
    );
}

export default UserVer;