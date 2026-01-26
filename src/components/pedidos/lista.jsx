'use client'
import Link from "next/link";
import Modal from "@/components/ui/modal";
import PedidoInsertar from "./insertar";
import PedidoModificar from "./modificar";
import PedidoEliminar from "./eliminar";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { use, useState } from "react";



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
                <Modal openElement={
                    <PlusIcon size={32}
                        className='text-green-500 border border-green-500 rounded-full bg-green-200 p-2 cursor-pointer hover:text-white hover:bg-green-500'
                    />}>
                    <PedidoInsertar user={session?.user} clientes={clientes} repartidores={repartidores} pizzas={pizzas} />
                </Modal>
            </div>
            {/* } */}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {pedidos
                    .sort((a, b) => b.fecha_hora - a.fecha_hora)  // ordenado desde reciente a antiguo
                    .map(pedido =>
                        <div key={pedido.id} className="max-w-96 p-4 mb-4 bg-indigo-50 rounded-lg border border-indigo-100   ">


                            <div className='flex justify-end items-center gap-1'>
                                <Modal openElement={
                                    <div className='size-8 grid place-content-center rounded-full border border-amber-500 text-amber-700 bg-amber-200 hover:bg-amber-500 hover:text-white hover:cursor-pointer'>
                                        <PencilIcon className='size-4' />
                                    </div>}>
                                    <PedidoModificar user={session?.user} pedido={pedido} clientes={clientes} repartidores={repartidores} pizzas={pizzas} />
                                </Modal>


                                <Modal openElement={
                                    <div className='size-8 grid place-content-center rounded-full border border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white hover:cursor-pointer'>
                                        <TrashIcon className='size-4' />
                                    </div>}>
                                    <PedidoEliminar pedido={pedido} />
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
                                    {/* <p>Nombre del cliente: {pedido.cliente?.name}</p> */}
                                    <p>Dirección: {pedido.cliente?.address}</p>
                                    <p>Teléfono: {pedido.cliente?.phone}</p>
                                </details>
                            }
                            <div className="pt-5">
                                <h2 className="font-bold text-lg">Pizzas</h2>
                                {pedido.pedidoPizzas.map(pp =>
                                    <p key={pp.pizza.id} className="flex justify-between shrink-0">
                                        <span>{pp.pizza.nombre}</span> <span>{pp.pizza.precio}</span>
                                    </p>
                                )}
                                <h3 className="flex justify-between shrink-0 font-bold">
                                    <span>TOTAL (€)</span>
                                    <span>{pedido.pedidoPizzas.reduce((acc, pp) => acc + pp.pizza.precio, 0).toFixed(2)}</span>
                                </h3>
                            </div>


                        </div>
                    )}
            </div>
        </div >
    );
}