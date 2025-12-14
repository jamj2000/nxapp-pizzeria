import { Suspense } from "react";
import Repartidor from "@/components/repartidores/info";
import Spinner2 from "@/components/ui/spinner2";
import BackButton from "@/components/ui/back-button";

import { auth } from "@/auth";
import { obtenerRepartidor } from "@/lib/data/repartidores";
import { redirect } from "next/navigation";





export default async function PaginaRepartidor({ params, searchParams }) {
    const { id } = await params

    const session = await auth()
    if (session?.user.role !== 'ADMIN') redirect('/dashboard')


    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>
                <Repartidor data={obtenerRepartidor(id)} />
            </Suspense>
        </div>
    )

}



