import { Suspense } from "react";
import Pizzas from "@/components/pizzas/lista";
import Link from "next/link";
import Spinner2 from "@/components/ui/spinner2";
import { obtenerPizzas } from "@/lib/data/pizzas";
import { obtenerIngredientes } from "@/lib/data/ingredientes";
import { auth } from "@/auth";
import PizzaInsertar from "@/components/pizzas/insertar";
import Modal from "@/components/ui/modal";
import { PlusIcon } from "lucide-react";





export default async function PaginaPizzas() {
    const session = await auth()
    const data = Promise.allSettled([
        obtenerPizzas(),
        obtenerIngredientes()
    ]);


    return (
        <div>
            <Link href="/home" className="text-5xl">🏡</Link>
            <h1 className="text-3xl font-bold mb-4">LISTA DE PIZZAS</h1>


            <Suspense fallback={<Spinner2 />}>
                <Pizzas data={data} admin={session?.user.role === 'ADMIN'} />
            </Suspense>
        </div>

    )

}



