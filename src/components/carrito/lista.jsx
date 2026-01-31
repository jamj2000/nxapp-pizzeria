'use client'

import { useStore } from "@/store/cart"
import { insertarPedido } from "@/lib/actions/pedidos"
import { useActionState, useEffect, useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { Trash2, Minus, Plus } from "lucide-react"
import { Spinner3 } from "@/components/ui/spinners"
import { redirect } from "next/navigation"
import { MINUTOS } from "@/lib/constants"

export default ({ user }) => {
    const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useStore()
    const [state, action, isPending] = useActionState(insertarPedido, {})
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (state.success) {
            toast.info(`Dispone de ${MINUTOS} minutos para modificar o cancelar el pedido`, { duration: 10000 })
            toast.success(state.success)
            clearCart()
            redirect('/pedidos')
        }
        if (state.error) {
            toast.error(state.error)
        }
    }, [state, clearCart])

    if (!mounted) return null

    const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0)
    const fechaActual = new Date().toISOString()

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-20rem)]">
                <p className="text-2xl text-stone-500 mb-4">Tu carrito está vacío</p>
                <Link href="/pizzas" className="text-lg text-blue-600 hover:bg-blue-100 p-2 px-4 rounded-full">
                    Ver Pizzas disponibles
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Tu Pedido</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                {cart.map((item) => (
                    <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 py-1 px-4 even:bg-indigo-100 odd:bg-slate-100">
                        <img
                            src={item.foto || '/images/default-pizza.avif'}
                            alt={item.nombre}
                            className="size-16 object-cover rounded-md"
                        />
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold">{item.nombre}</h3>
                            <p className="text-stone-500">{item.precio} € / ud.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="p-1 rounded-full hover:bg-slate-200 border border-slate-300"
                                >
                                    <Minus size={16} />
                                </button>

                                <span className="font-bold"> {item.quantity} </span>

                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    className="p-1 rounded-full hover:bg-slate-200 border border-slate-300"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <span className="text-xl font-bold min-w-[80px] text-right">
                                {(item.precio * item.quantity).toFixed(2)} €
                            </span>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors border border-red-300"
                            >
                                <Trash2 size={20} />
                            </button>

                        </div>
                    </div>
                ))}

                <div className="flex justify-end pt-6 text-2xl font-bold">
                    Total: {total.toFixed(2)} €
                </div>
            </div>

            {user
                ?
                <form action={action} className="flex justify-end">
                    <input type="hidden" name="clienteId" value={user.id} />
                    <input type="hidden" name="fecha_hora" value={fechaActual} />

                    {cart.map(item => (
                        <input
                            key={item.id}
                            type="hidden"
                            name={`pizza${item.id}`}
                            value={item.quantity}
                        />
                    ))}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-12 flex items-center justify-center bg-blue-500 text-white cursor-pointer font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? <Spinner3 /> : 'Tramitar Pedido'}
                    </button>
                </form>
                :
                <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded text-right">
                    <p className="text-orange-700">
                        Debes <Link href="/auth/login" className="font-bold underline">iniciar sesión</Link> para tramitar el pedido
                    </p>
                </div>
            }
        </div>
    )
}
