'use client'
import { use } from "react";
import { notFound } from "next/navigation";

export default function Pizza({ promesaPizza }) {
    const pizza = use(promesaPizza)
    if (!pizza) notFound()

    return (
        <>
            <div>
                <p className="text-4xl">{pizza.nombre}</p>
                <p className="text-4xl text-stone-400">{pizza.precio} €</p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:gap-10">
                <img src={pizza.foto || '/images/default-pizza.avif'} alt='foto' className="sm:w-[50%]" />
                <div>
                    <p className="font-bold">Ingredientes</p>
                    {pizza.ingredientes.map(ingrediente =>
                        <p key={ingrediente.id}>{ingrediente.nombre}</p>
                    )
                    }
                </div>
            </div>
        </>
    );
}

