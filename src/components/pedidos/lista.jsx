'use client'
import Link from "next/link";
import Modal from "@/components/ui/modal";
import { IconoInsertar, IconoModificar, IconoEliminar } from "@/components/ui/icons";
import { use, useState } from "react";
import Form from "./form";
import { eliminarPedido, insertarPedido, modificarPedido } from "@/lib/actions/pedidos";
import { labelEliminar, labelInsertar, labelModificar } from "../ui/labels";



export default ({
    promesaPedidos,
    promesaRepartidores,
    promesaPizzas,
    promesaClientes,
    promesaSession
}) => {

    const pedidos = use(promesaPedidos)
    const repartidores = use(promesaRepartidores)
    const clientes = use(promesaClientes)
    const session = use(promesaSession)
    const dataPizzas = use(promesaPizzas)


    const isAdminSession = session.user?.role === 'ADMIN'

    const [propiedad, setPropiedad] = useState('nombre')
    const [orden, setOrden] = useState('')
    const [buscar, setBuscar] = useState('')

    let pizzas = dataPizzas
    if (propiedad === 'precio') {
        if (orden === 'asc') pizzas = dataPizzas.toSorted((a, b) => a[propiedad] - b[propiedad])
        if (orden === 'desc') pizzas = dataPizzas.toSorted((a, b) => b[propiedad] - a[propiedad])
    }
    else {
        if (orden === 'asc') pizzas = dataPizzas.toSorted((a, b) => a[propiedad].localeCompare(b[propiedad]))
        if (orden === 'desc') pizzas = dataPizzas.toSorted((a, b) => b[propiedad].localeCompare(a[propiedad]))
    }

    if (buscar) pizzas = pizzas.filter((pizza) =>
        pizza.nombre.toLowerCase().includes(buscar.toLowerCase())
    )




    return (
        <div className="flex flex-col gap-4">
            {/* {isAdminSession && */}
            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={<IconoInsertar />}>
                    <Form action={insertarPedido} user={session?.user} pizzas={pizzas} labelSubmit={labelInsertar} />
                </Modal>
            </div>
            {/* } */}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {pedidos
                    .sort((a, b) => b.fecha_hora - a.fecha_hora)  // ordenado desde reciente a antiguo
                    .map(pedido =>
                        <Pedido
                            key={pedido.id}
                            pedido={pedido}
                            clientes={clientes}
                            repartidores={repartidores}
                            pizzas={pizzas}
                            session={session}
                            isAdminSession={isAdminSession}
                        />
                    )}
            </div>
        </div >
    )
}



function Pedido({ pedido, session, isAdminSession, clientes, repartidores, pizzas }) {
    return (
        <div key={pedido.id} className="max-w-96 p-4 mb-4 bg-indigo-50 rounded-lg border border-indigo-100   ">


            <div className='flex justify-end items-center gap-1'>
                <Modal openElement={<IconoModificar />}>
                    <Form
                        action={modificarPedido}
                        user={session?.user}
                        pedido={pedido}
                        pizzas={pizzas}
                        labelSubmit={labelModificar}
                    />
                </Modal>

                <Modal openElement={<IconoEliminar />}>
                    <Form
                        action={eliminarPedido}
                        user={session?.user}
                        pedido={pedido}
                        pizzas={pizzas}
                        labelSubmit={labelEliminar}
                        disabled
                    />
                </Modal>
            </div>

            <Link href={`/pedidos/${pedido.id}`} className="flex gap-4 font-bold cursor-pointer">
                <span>Nº {pedido.id}</span>
                <span>
                    {/* {pedido.fecha_hora.toLocaleString(Intl.DateTimeFormat("es-ES", {
                                        dateStyle: "full",
                                        timeStyle: "long",
                                        timeZone: "Europe/Madrid",
                                    }))} */}
                    {
                        new Intl.DateTimeFormat("es-ES", {
                            dateStyle: "full",
                            timeStyle: "long",
                            timeZone: "Europe/Madrid",
                        }).format(pedido.fecha_hora)
                    }
                </span>

                {/* {new Date(pedido.fecha_hora).toLocaleString()} */}
            </Link>
            {isAdminSession &&
                <details>
                    <summary>Cliente: {pedido.cliente?.name}</summary>
                    <p>Dirección: {pedido.cliente?.address}</p>
                    <p>Teléfono: {pedido.cliente?.phone}</p>
                </details>
            }
            <div className="pt-5">
                <h2 className="font-bold text-lg">Pizzas</h2>
                {pedido.pedidoPizzas.map(pp =>
                    <p key={pp.pizza.id} className="flex justify-between shrink-0">
                        <span>{pp.cantidad} x {pp.pizza.nombre}</span> <span>{pp.cantidad * pp.pizza.precio}</span>
                    </p>
                )}
                <h3 className="flex justify-between shrink-0 font-bold">
                    <span>TOTAL (€)</span>
                    <span>{pedido.pedidoPizzas.reduce((acc, pp) => acc + pp.cantidad * pp.pizza.precio, 0).toFixed(2)}</span>
                </h3>
            </div>


        </div>
    )
}