import { Suspense } from "react";
import Pedido from "@/components/pedidos/item";
import Spinner2 from "@/components/ui/spinner2";
import BackButton from "@/components/ui/back-button";
import { notFound } from "next/navigation";


async function PaginaPedido({ params, searchParams }) {
    const { id } = await params

    // if (!Number.isInteger(parseInt(id))) return notFound()


    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>
                <Pedido id={id} />
            </Suspense>
        </div>
    )

}

export default PaginaPedido;

