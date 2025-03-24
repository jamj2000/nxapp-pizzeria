import Pizzas from "@/components/pizzas/lista";
import Link from "next/link";
import { Suspense } from "react";


function PaginaPizzas() {

    return (
        <div>
            <Link href="/home" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE PIZZAS</h1>

            <Suspense fallback={"Obteniendo pizzas ..."}>
                <Pizzas />
            </Suspense>
        </div>
    )

}

export default PaginaPizzas;

