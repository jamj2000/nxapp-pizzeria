import { auth } from "@/auth";
import CarritoCompra from "@/components/carrito/checkout";

export const metadata = {
    title: "Pizzería MM - Carrito",
}

export default async function CarritoPage() {
    const session = await auth()

    return <CarritoCompra user={session?.user} />
}



