import Pizzas from "@/components/pizzas/lista";
import Link from "next/link";
import { Spinner2 } from "@/components/ui/spinners";
import { Suspense } from "react";
import { obtenerPizzas } from "@/lib/data/pizzas";
import { obtenerIngredientes } from "@/lib/data/ingredientes";
import { auth } from "@/auth";




export default async function PaginaPizzas() {

    return (
        <div>
            <Link href="/" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE PIZZAS</h1>


            <Suspense fallback={<Spinner2 />}>
                <Pizzas
                    promesaPizzas={obtenerPizzas()}
                    promesaIngredientes={obtenerIngredientes()}
                    promesaSession={auth()}
                />
            </Suspense>
        </div>

    )

}



