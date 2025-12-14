import { obtenerPedido } from "@/lib/data/pedidos";
import { notFound } from "next/navigation";

export default async function Pedido({ id }) {
    const pedido = await obtenerPedido(id)
    if (!pedido) notFound()

    return (
        <>
            <div className="flex gap-4 text-2xl font-bold">
                <span>Nº {pedido.id}</span>
                {/* {new Date(pedido.fecha_hora).toLocaleString()} */}
                {
                    new Intl.DateTimeFormat("es-ES", {
                        dateStyle: "full",
                        timeStyle: "long",
                        timeZone: "Europe/Madrid",
                    }).format(pedido.fecha_hora)
                }

            </div>
            <div>Nombre del cliente: {pedido.cliente?.name}</div>
            <div>Dirección del cliente: {pedido.cliente?.address}</div>
            <div>Teléfono del cliente: {pedido.cliente?.phone}</div>

            {/* <div>
                <p className="font-bold text-xl">Repartidor</p>
                {pedido.repartidor?.nombre}
            </div> */}

            <div className="pt-5 max-w-md">
                <h2 className="font-bold text-lg">Pizzas</h2>
                {pedido.pizzas.map(pizza =>
                    <p key={pizza.id} className="flex justify-between shrink-0">
                        <span>{pizza.nombre}</span> <span>{pizza.precio}</span>
                    </p>
                )}
                <h3 className="flex justify-between shrink-0 font-bold">
                    <span>TOTAL (€)</span>
                    <span>{pedido.pizzas.reduce((acc, p) => acc + p.precio, 0).toFixed(2)}</span>
                </h3>
            </div>
        </>
    );
}

