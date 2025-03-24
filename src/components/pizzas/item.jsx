import { obtenerPizza } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function Pizza({ id }) {
    const pizza = await obtenerPizza(id)
    // console.log(pizza);

    if (!pizza) notFound()

    return (
        <div>
            <div>Nombre: {pizza.nombre}</div>
            <div>Precio: {pizza.precio}</div>
        </div>
    );
}

