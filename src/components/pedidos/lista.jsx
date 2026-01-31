'use client'

import { use } from "react"
import { IconoInsertar, IconoModificar, IconoEliminar } from "@/components/ui/icons"
import { eliminarPedido, insertarPedido, modificarPedido } from "@/lib/actions/pedidos"
import { labelEliminar, labelInsertar, labelModificar } from "@/components/ui/labels"
import Modal from "@/components/ui/modal"
import Estado from "@/components/pedidos/estado"
import Form from "@/components/pedidos/form"
import Filtro from "@/components/pedidos/filtro"
import usePedidos from "@/components/pedidos/hooks/usePedidos"
import Link from "next/link"
import { TIEMPO_CAMBIO } from "@/lib/constants"
import { PedidoCard, PedidoInfo } from "./info"



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
    const pizzas = use(promesaPizzas)
    const session = use(promesaSession)
    const user = session?.user

    const isAdminSession = session.user?.role === 'ADMIN'

    const {
        pedidosFiltrados,
        propiedad, setPropiedad,
        orden, setOrden,
        buscar, setBuscar
    } = usePedidos(pedidos);


    const Insertar = () =>
        <Modal openElement={<IconoInsertar className="self-end" />}>
            <Form
                action={insertarPedido}
                repartidores={repartidores}
                clientes={clientes}
                pizzas={pizzas}
                user={user}
                labelSubmit={labelInsertar}
            />
        </Modal>


    const Modificar = ({ pedido }) =>
        <Modal openElement={<IconoModificar className="self-end" />}>
            <Form
                action={modificarPedido}
                pedido={pedido}
                repartidores={repartidores}
                clientes={clientes}
                pizzas={pizzas}
                user={user}
                labelSubmit={labelModificar}
            />
        </Modal>


    const Eliminar = ({ pedido }) =>
        <Modal openElement={<IconoEliminar />}>
            <Form
                action={eliminarPedido}
                pedido={pedido}
                repartidores={repartidores}
                clientes={clientes}
                pizzas={pizzas}
                user={user}
                labelSubmit={labelEliminar}
                disabled
            />
        </Modal>


    const Item = ({ pedido, children }) =>
        <div key={pedido.id} className="max-w-96 p-4 mb-4 bg-indigo-50 rounded-lg border border-indigo-100   ">
            <div className='flex justify-end items-center gap-1'>
                {children}
            </div>

            <Estado pedido={pedido} editable={isAdminSession} />

            <Modal openElement={<PedidoCard pedido={pedido} />}>
                <PedidoInfo pedido={pedido} />
            </Modal>

            {/* <Link href={`/pedidos/${pedido.id}`} className="block cursor-pointer hover:bg-indigo-100 my-2 p-2">
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
            </Link> */}


            {isAdminSession &&
                <>
                    <details>
                        <summary className="cursor-pointer hover:bg-slate-300 p-2">Cliente: {pedido.cliente?.name}</summary>
                        <p>Dirección: {pedido.cliente?.address}</p>
                        <p>Teléfono: {pedido.cliente?.phone}</p>
                    </details>
                    <details>
                        <summary className="cursor-pointer hover:bg-slate-300 p-2">Repartidor: {pedido.repartidor?.nombre}</summary>
                        <p>Teléfono: {pedido.repartidor?.telefono}</p>
                    </details>
                </>
            }
        </div>




    return (
        <div className="flex flex-col gap-4">

            <Filtro
                buscar={buscar}
                setBuscar={setBuscar}
                propiedad={propiedad}
                setPropiedad={setPropiedad}
                orden={orden}
                setOrden={setOrden}
            />

            {/* <div className='flex justify-end items-center gap-4 pb-4'>
                <Insertar />
            </div> */}

            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                {pedidosFiltrados.map(pedido =>
                    <Item key={pedido.id} pedido={pedido}>
                        {(isAdminSession || pedido.fecha_hora >= new Date() - TIEMPO_CAMBIO) &&
                            <>
                                <Modificar pedido={pedido} />
                                <Eliminar pedido={pedido} />
                            </>
                        }
                    </Item>
                )}
            </div>

        </div >
    )
}

