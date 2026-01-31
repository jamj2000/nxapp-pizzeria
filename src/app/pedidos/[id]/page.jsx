import { Suspense } from "react";
import { Spinner2 } from "@/components/ui/spinners";
import { obtenerPedido } from "@/lib/data/pedidos";
import { notFound } from "next/navigation";
import { use } from "react";
import { PedidoInfo } from "@/components/pedidos/info";


export default async function PaginaPedido({ params, searchParams }) {
    const { id } = await params

    return (
        <Suspense fallback={<Spinner2 />}>
            <Pedido promesaPedido={obtenerPedido(id)} />
        </Suspense>
    )

}



function Pedido({ promesaPedido }) {
    const pedido = use(promesaPedido)
    if (!pedido) notFound()

    return <PedidoInfo pedido={pedido} />
}


