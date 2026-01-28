import { Suspense } from "react";
import Repartidores from "@/components/repartidores/lista";
import Link from "next/link";
import Spinner2 from "@/components/ui/spinner2";
import { auth } from "@/auth";
import { redirect, } from "next/navigation";
import { obtenerRepartidores } from "@/lib/data/repartidores";



export default async function PaginaRepartidores() {
    const session = await auth()
    if (session?.user.role !== 'ADMIN') redirect('/dashboard')


    return (
        <div>
            <Link href="/" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE REPARTIDORES</h1>

            <Suspense fallback={<Spinner2 />}>
                <Repartidores promesaRepartidores={obtenerRepartidores()} />
            </Suspense>
        </div>
    )

}



