import { auth } from "@/auth";
import { obtenerRepartidor } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Repartidor({ id }) {
    const session = await auth()
    if (session?.user.role !== 'ADMIN') redirect('/dashboard')

    const repartidor = await obtenerRepartidor(id)
    if (!repartidor) notFound()

    return (
        <>
            <div>Nombre: {repartidor.nombre}</div>
            <div>Teléfono: {repartidor.telefono}</div>
        </>
    );
}

