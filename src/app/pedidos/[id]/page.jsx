import { Suspense } from "react";
import Pedido from "@/components/pedidos/item";
import Spinner2 from "@/components/spinner2";


async function PaginaPedido({ params, searchParams }) {
    const { id } = await params

    return (
        <Suspense fallback={<Spinner2 />}>
            <Pedido id={id} />
        </Suspense>
    )

}

export default PaginaPedido;

