import { Suspense } from "react";
import Pedido from "@/components/pedidos/item";
import Spinner2 from "@/components/spinner2";
import BackButton from "@/components/back-button";


async function PaginaPedido({ params, searchParams }) {
    const { id } = await params

    return (
        <div className="my-10 p-10">
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>
                <Pedido id={id} />
            </Suspense>
        </div>
    )

}

export default PaginaPedido;

