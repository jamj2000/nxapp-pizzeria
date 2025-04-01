import { getUsers, obtenerPedidos, obtenerPizzas, obtenerRepartidores } from "@/lib/data";
import Link from "next/link";
import Modal from "@/components/modal";
import PedidoInsertar from "./insertar";
import PedidoModificar from "./modificar";
import PedidoEliminar from "./eliminar";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { auth } from "@/auth";


export default async function Pedidos() {
    const session = await auth()
    const pedidos = await obtenerPedidos(session?.user.id)
    const repartidores = await obtenerRepartidores()
    const pizzas = await obtenerPizzas()
    const clientes = await getUsers()

    return (
        <div className="flex flex-col gap-4">
            {/* {session?.user.role === 'ADMIN' && */}
            <Modal openElement={
                <div className='justify-self-end size-8 grid place-content-center rounded-full border border-green-500 text-green-700 bg-green-200 hover:bg-green-500 hover:text-white hover:cursor-pointer'>
                    <PlusIcon className='size-4' />
                </div>}>
                <PedidoInsertar user={session?.user} clientes={clientes} repartidores={repartidores} pizzas={pizzas} />
            </Modal>
            {/* } */}

            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {pedidos.map(pedido =>
                    <div key={pedido.id} className="p-4 mb-4 bg-indigo-50 rounded-lg border border-indigo-100   ">


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
                                {pedido.fecha_hora.toLocaleString(Intl.DateTimeFormat("es-ES", {
                                    dateStyle: "full",
                                    timeStyle: "long",
                                    timeZone: "Europe/Madrid",
                                }))}
                            </span>

                            {/* {new Date(pedido.fecha_hora).toLocaleString()} */}
                        </Link>
                        <p>Nombre del cliente: {pedido.cliente?.name}</p>
                        <p>Dirección del cliente: {pedido.cliente?.address}</p>

                    </div>
                )}
            </div>
        </div >
    );
}