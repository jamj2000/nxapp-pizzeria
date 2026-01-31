import { Suspense } from "react";
import { Spinner2 } from "@/components/ui/spinners";
import BackButton from "@/components/ui/back-button";

import { auth } from "@/auth";
import { obtenerRepartidor } from "@/lib/data/repartidores";
import { redirect } from "next/navigation";

import { notFound } from "next/navigation";
import { use } from "react";



export default async function PaginaRepartidor({ params, searchParams }) {
    const { id } = await params

    const session = await auth()
    if (session?.user.role !== 'ADMIN') redirect('/dashboard')


    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>
                <Repartidor promesaRepartidor={obtenerRepartidor(id)} />
            </Suspense>
        </div>
    )

}





function Repartidor({ promesaRepartidor }) {
    const repartidor = use(promesaRepartidor)

    if (!repartidor) notFound()

    return (
        <>
            <div className="text-2xl">Nombre: {repartidor.nombre}</div>
            <div>Teléfono: {repartidor.telefono}</div>
        </>
    );
}


