import { Suspense } from "react";
import Repartidor from "@/components/repartidores/item";
import Spinner2 from "@/components/spinner2";


async function PaginaRepartidor({ params, searchParams }) {
    const { id } = await params

    return (
        <div className="mt-10 p-10">
            <Suspense fallback={<Spinner2 />}>
                <Repartidor id={id} />
            </Suspense>
        </div>
    )

}

export default PaginaRepartidor;

