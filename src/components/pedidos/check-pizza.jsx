'use client'
import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"



export default function CheckPizza({ pizza, cant = 0, disabled = false }) {

    const [cantidad, setCantidad] = useState(cant)

    return (
        <div className={`flex flex-col gap-2 items-center border p-4 rounded-md transition-colors w-full ${cantidad > 0 ? 'bg-lime-100 border-green-500 shadow-md' : 'bg-slate-100 border-slate-300'}`}>
            <img
                src={pizza.foto || '/images/default-pizza.avif'}
                alt={pizza.nombre}
                className="w-32 h-32 object-cover rounded-md shadow-sm"
            />
            <span className="font-bold text-lg text-center leading-5 h-10 content-center">{pizza.nombre}</span>
            <span className="text-sm text-slate-500">{pizza.precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>

            <div className="flex items-center gap-4 mt-2">
                <button
                    type="button"
                    onClick={() => setCantidad(c => Math.max(0, c - 1))}
                    disabled={cantidad === 0 || disabled}
                    className="w-10 h-10 rounded-full bg-red-100 text-red-600 border border-red-300 hover:bg-red-200 disabled:opacity-30 disabled:hover:bg-red-100 flex items-center justify-center transition-colors"
                >
                    <MinusIcon size={20} />
                </button>
                <span className="text-2xl font-bold w-8 text-center">{cantidad}</span>
                <button
                    type="button"
                    onClick={() => setCantidad(c => c + 1)}
                    disabled={disabled}
                    className="w-10 h-10 rounded-full bg-green-100 text-green-600 border border-green-300 hover:bg-green-200 disabled:opacity-30 disabled:hover:bg-green-100 flex items-center justify-center transition-colors"
                >
                    <PlusIcon size={20} />
                </button>
            </div>
            <input type="hidden" name={`pizza${pizza.id}`} value={cantidad} />
        </div>
    )
}