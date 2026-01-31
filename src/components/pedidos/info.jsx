'use client'

import { usePathname, useRouter } from "next/navigation"
import { IconoAtras, IconoVer } from "../ui/icons"
import Link from "next/link"





export const PedidoInfo = ({ pedido }) => {

    const pathname = usePathname()
    const { back } = useRouter()

    return (
        <div className="grid lg:grid-cols-[300px_1fr] gap-4 place-items-start">

            <div className='relative w-full'>
                {pathname !== `/pedidos`
                    ? <button
                        onClick={back}
                        className="absolute top-2 right-2 text-sm font-bold cursor-pointer">
                        <IconoAtras />
                    </button>
                    : <Link prefetch
                        href={`/pedidos/${pedido.id}`}
                        className="absolute top-2 right-2 text-sm font-bold cursor-pointer">
                        <IconoVer />
                    </Link>
                }
                <div className="bg-linear-to-r from-indigo-500 to-indigo-100 h-[200px] w-full lg:h-[600px]" />
            </div>

            <div>
                <div className="flex gap-4 text-2xl font-bold">
                    <span>Nº {pedido.id}</span>
                    {new Intl.DateTimeFormat("es-ES", {
                        dateStyle: "full",
                        timeStyle: "long",
                        timeZone: "Europe/Madrid",
                    }).format(pedido.fecha_hora)}

                </div>
                <div>Nombre del cliente: {pedido?.cliente?.name}</div>
                <div>Dirección del cliente: {pedido?.cliente?.address}</div>
                <div>Teléfono del cliente: {pedido?.cliente?.phone}</div>

                <div className="py-5 max-w-md">
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

                <div>Nombre del repartidor: {pedido?.repartidor?.name}</div>

            </div>
        </div>
    )
}



export const PedidoCard = ({ pedido }) =>
    <div className="cursor-pointer hover:bg-indigo-100 my-2 p-2">
        <div className="flex gap-4 font-bold">
            <span>Nº {pedido.id}</span>
            <span>
                {new Intl.DateTimeFormat("es-ES", {
                    dateStyle: "full",
                    timeStyle: "long",
                    timeZone: "Europe/Madrid",
                }).format(pedido.fecha_hora)}
            </span>
        </div>
        <div className="pt-5">
            <h2 className="font-bold text-lg">Pizzas</h2>
            {pedido.pedidoPizzas.map(pp =>
                <p key={pp.pizza.id} className="flex justify-between shrink-0">
                    <span>{pp.cantidad} x {pp.pizza.nombre}</span> <span>{(pp.cantidad * pp.pizza.precio).toFixed(2)}</span>
                </p>
            )}
            <h3 className="flex justify-between shrink-0 font-bold">
                <span>TOTAL (€)</span>
                <span>{pedido.pedidoPizzas.reduce((acc, pp) => acc + pp.cantidad * pp.pizza.precio, 0).toFixed(2)}</span>
            </h3>
        </div>
    </div>

