import BackButton from "@/components/ui/back-button";
import Spinner2 from "@/components/ui/spinner2";
import { Suspense } from "react";
import { obtenerPizza } from "@/lib/data/pizzas";
import { use } from "react";
import { notFound } from "next/navigation";


export default async function PaginaPizza({ params, searchParams }) {
    const { id } = await params

    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>

                <Pizza promesaPizza={obtenerPizza(id)} />

            </Suspense>
        </div>
    )

}





function Pizza({ promesaPizza }) {
    const pizza = use(promesaPizza)
    if (!pizza) notFound()

    return (

        <div className="grid lg:grid-cols-[300px_1fr] gap-4 place-items-start">
            <img src={pizza.foto || '/images/default-pizza.avif'} alt='foto' className="h-[200px] w-full lg:h-[600px] object-cover" />

            <div className="flex flex-col justify-center w-full">
                <p className="text-4xl">{pizza.nombre}</p>
                <p className="text-4xl font-bold text-slate-300">{pizza.precio} €</p>
                <p className="font-bold">Ingredientes</p>
                {pizza.ingredientes.map(ingrediente =>
                    <p key={ingrediente.id}>{ingrediente.nombre}</p>
                )
                }
            </div>
        </div>

    )
}

