import { Suspense } from "react";
import Repartidor from "@/components/repartidores/item";
import Spinner2 from "@/components/spinner2";


async function PaginaRepartidor({ params, searchParams }) {
    const { id } = await params

    return (
        <Suspense fallback={<Spinner2 />}>
            <Repartidor id={id} />
        </Suspense>
    )

}

export default PaginaRepartidor;

