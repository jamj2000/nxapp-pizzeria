import Pizza from "@/components/pizzas/item";
import Spinner2 from "@/components/spinner2";
import { Suspense } from "react";


async function PaginaPizza({ params, searchParams }) {
    const { id } = await params

    return (
        <Suspense fallback={<Spinner2 />}>
            <Pizza id={id} />
        </Suspense>
    )

}

export default PaginaPizza;

