import { Suspense } from "react";
import Pizzas from "@/components/pizzas/lista";
import Link from "next/link";
import Spinner2 from "@/components/spinner2";


function PaginaPizzas() {

    return (
        <div className="my-10 p-10">
            <Link href="/home" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE PIZZAS</h1>

            <Suspense fallback={<Spinner2 />}>
                <Pizzas />
            </Suspense>
        </div>
    )

}

export default PaginaPizzas;

