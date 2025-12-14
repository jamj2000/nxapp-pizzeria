import { Suspense } from "react";
import Pedidos from "@/components/pedidos/lista";
import Link from "next/link";
import Spinner2 from "@/components/ui/spinner2";


function PaginaPedidos() {

    return (
        <div>
            <Link href="/home" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE PEDIDOS</h1>

            <Suspense fallback={<Spinner2 />}>
                <Pedidos />
            </Suspense>
        </div>
    )

}

export default PaginaPedidos;

