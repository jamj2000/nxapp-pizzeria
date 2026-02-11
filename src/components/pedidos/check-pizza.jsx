'use client'
import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"



export default function CheckPizza({ pizza, cant = 0, disabled = false }) {

    const [cantidad, setCantidad] = useState(cant)

    return (
        <div className={`flex items-center gap-4 py-1 px-4 even:bg-indigo-100 odd:bg-slate-100 ${cantidad > 0 ? 'bg-lime-100 border-green-500 shadow-md' : 'bg-slate-100 border-slate-300'}`}>
            {/* <div className={`flex flex-col gap-2 items-center border p-4 rounded-md transition-colors w-full ${cantidad > 0 ? 'bg-lime-100 border-green-500 shadow-md' : 'bg-slate-100 border-slate-300'}`}> */}

            <input type="hidden" name={`pizza${pizza.id}`} value={cantidad} />

            {/* <span className="font-bold text-lg text-center leading-5 h-10 content-center">{pizza.nombre}</span>
            <span className="text-md text-slate-500">{pizza.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span> */}
            <img
                src={pizza.foto || '/images/default-pizza.avif'}
                alt={pizza.nombre}
                className="size-16 object-cover rounded-md"
            />
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold">{pizza.nombre}</h3>
                <p className="text-stone-500">{pizza.precio} € / ud.</p>
            </div>

            <span className="text-md text-slate-500">{(pizza.precio * cantidad).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>

            <div className="flex items-center gap-4 mt-2">
                <button
                    type="button"
                    onClick={() => setCantidad(c => Math.max(0, c - 1))}
                    disabled={cantidad === 0 || disabled}
                    className="w-6 h-6 rounded-full bg-red-100 text-red-600 border border-red-300 hover:bg-red-200 disabled:opacity-30 disabled:hover:bg-red-100 flex items-center justify-center transition-colors"
                >
                    <MinusIcon size={10} />
                </button>
                <span className="text-2xl font-bold w-8 text-center">{cantidad}</span>
                <button
                    type="button"
                    onClick={() => setCantidad(c => c + 1)}
                    disabled={disabled}
                    className="w-6 h-6 rounded-full bg-green-100 text-green-600 border border-green-300 hover:bg-green-200 disabled:opacity-30 disabled:hover:bg-green-100 flex items-center justify-center transition-colors"
                >
                    <PlusIcon size={10} />
                </button>
            </div>


        </div >
    )
}

/*

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

*/