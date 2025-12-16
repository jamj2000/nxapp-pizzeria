import Pedidos from "@/components/pedidos/lista";
import Link from "next/link";
import Spinner2 from "@/components/ui/spinner2";
import { Suspense } from "react";
import { auth } from "@/auth";
import { obtenerPedidos } from "@/lib/data/pedidos";
import { obtenerRepartidores } from "@/lib/data/repartidores";
import { obtenerPizzas } from "@/lib/data/pizzas";
import { getUsers } from "@/lib/data/users";


export default async function PaginaPedidos() {
    const session = await auth()

    const admin = session?.user.role === 'ADMIN'


    return (
        <div>
            <Link href="/home" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE PEDIDOS</h1>

            <Suspense fallback={<Spinner2 />}>
                <Pedidos
                    promesaPedidos={obtenerPedidos(!admin ? session?.user.id : undefined)}
                    promesaRepartidores={obtenerRepartidores()}
                    promesaPizzas={obtenerPizzas()}
                    promesaClientes={getUsers()}
                    promesaSession={auth()}
                />
            </Suspense>
        </div>
    )

}
