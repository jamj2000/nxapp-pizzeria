import BackButton from "@/components/ui/back-button";
import Pizza from "@/components/pizzas/info";
import Spinner2 from "@/components/ui/spinner2";
import { Suspense } from "react";
import { obtenerPizza } from "@/lib/data/pizzas";

export default async function PaginaPizza({ params, searchParams }) {
    const { id } = await params

    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>
                <Pizza
                    promesaPizza={obtenerPizza(id)}
                />
            </Suspense>
        </div>
    )

}



