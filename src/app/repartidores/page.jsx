import Repartidores from "@/components/repartidores/lista";
import Link from "next/link";
import { Suspense } from "react";


function PaginaRepartidores() {

    return (
        <div>
            <Link href="/home" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE REPARTIDORES</h1>

            <Suspense fallback={"Obteniendo repartidores ..."}>
                <Repartidores />
            </Suspense>
        </div>
    )

}

export default PaginaRepartidores;

