import { Suspense } from "react";
import Pedido from "@/components/pedidos/item";
import Spinner2 from "@/components/spinner2";


async function PaginaPedido({ params, searchParams }) {
    const { id } = await params

    return (
        <div className="mt-10 p-10">
            <Suspense fallback={<Spinner2 />}>
                <Pedido id={id} />
            </Suspense>
        </div>
    )

}

export default PaginaPedido;

