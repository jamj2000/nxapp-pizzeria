import BackButton from "@/components/back-button";
import Pizza from "@/components/pizzas/item";
import Spinner2 from "@/components/spinner2";
import { Suspense } from "react";


async function PaginaPizza({ params, searchParams }) {
    const { id } = await params

    return (
        <div className="my-10 p-10">
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>
                <Pizza id={id} />
            </Suspense>
        </div>
    )

}

export default PaginaPizza;

