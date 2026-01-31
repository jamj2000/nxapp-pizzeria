import { auth } from "@/auth";
import CarritoCompra from "@/components/carrito/lista";


export default async function CarritoPage() {
    const session = await auth()

    return (
        <CarritoCompra user={session?.user} />
    )
}



