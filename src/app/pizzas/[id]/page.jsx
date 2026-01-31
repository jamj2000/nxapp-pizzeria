import { Spinner2 } from "@/components/ui/spinners";
import { Suspense } from "react";
import { obtenerPizza } from "@/lib/data/pizzas";
import { use } from "react";
import { notFound } from "next/navigation";
import { PizzaInfo } from "@/components/pizzas/info";




export default async function PaginaPizza({ params, searchParams }) {
    const { id } = await params

    return (
        <Suspense fallback={<Spinner2 />}>
            <Pizza promesaPizza={obtenerPizza(id)} />
        </Suspense>
    )

}



function Pizza({ promesaPizza }) {
    const pizza = use(promesaPizza)
    if (!pizza) notFound()

    return <PizzaInfo pizza={pizza} />
}

