import { Suspense } from "react";
import Repartidores from "@/components/repartidores/lista";
import Link from "next/link";
import Spinner2 from "@/components/spinner2";


function PaginaRepartidores() {

    return (
        <div className="mt-10 p-10">
            <Link href="/home" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE REPARTIDORES</h1>

            <Suspense fallback={<Spinner2 />}>
                <Repartidores />
            </Suspense>
        </div>
    )

}

export default PaginaRepartidores;

