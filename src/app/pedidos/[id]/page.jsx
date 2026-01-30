import { Suspense } from "react";
import Spinner2 from "@/components/ui/spinner2";
import BackButton from "@/components/ui/back-button";
import { obtenerPedido } from "@/lib/data/pedidos";
import { notFound } from "next/navigation";
import { use } from "react";


export default async function PaginaPedido({ params, searchParams }) {
    const { id } = await params
    const promesaPedido = obtenerPedido(id)

    return (
        <div>
            <BackButton />
            <div className="h-20">{/* Hueco de separación */}</div>

            <Suspense fallback={<Spinner2 />}>
                <Pedido promesaPedido={obtenerPedido(id)} />
            </Suspense>
        </div>
    )

}



function Pedido({ promesaPedido }) {
    const pedido = use(promesaPedido)
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
                {pedido.pedidoPizzas.map(pp =>
                    <p key={pp.pizza.id} className="flex justify-between shrink-0">
                        <span>{pp.cantidad} x {pp.pizza.nombre}</span> <span>{(pp.cantidad * pp.pizza.precio).toFixed(2)}</span>
                    </p>
                )}
                <h3 className="flex justify-between shrink-0 font-bold">
                    <span>TOTAL (€)</span>
                    <span>{pedido.pedidoPizzas.reduce((acc, pp) => acc + (pp.cantidad * pp.pizza.precio), 0).toFixed(2)}</span>
                </h3>
            </div>
        </>
    )
}

