import { auth } from "@/lib/auth";
import CarritoCompra from "@/components/carrito/checkout";
import { Spinner1 } from "@/components/ui/spinners";
import { Suspense } from "react";


export const metadata = { title: "Pizzería MM - Carrito" }


export default async function CarritoPage() {
    return (
        <Suspense fallback={<Spinner1 />}>
            <CarritoCompra session={auth()} />  {/* Pasamos promesa. Necesario usar use() dentro de CarritoCompra */}
        </Suspense>
    )
}



