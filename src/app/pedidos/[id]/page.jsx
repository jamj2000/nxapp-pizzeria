import { Suspense } from "react";
import Pedido from "@/components/pedidos/item";
import Spinner2 from "@/components/ui/spinner2";
import BackButton from "@/components/ui/back-button";
import { obtenerPedido } from "@/lib/data/pedidos";



export default async function PaginaPedido({ params, searchParams }) {
    const { id } = await params

    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>
                <Pedido promesaPedido={obtenerPedido(id)} />
            </Suspense>
        </div>
    )

}



