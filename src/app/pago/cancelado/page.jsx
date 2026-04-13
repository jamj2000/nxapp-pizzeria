import Link from 'next/link'
import { XCircleIcon } from 'lucide-react'

export default function PagoCanceladoPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] gap-6 text-center px-4">
            <XCircleIcon size={80} className="text-red-400" />
            <h1 className="text-3xl font-bold text-stone-800">Pago cancelado</h1>
            <p className="text-stone-500 max-w-md">
                Has cancelado el proceso de pago. No te preocupes, tu carrito sigue intacto.
                Puedes intentarlo de nuevo cuando quieras.
            </p>
            <Link
                href="/carrito"
                className="bg-blue-500 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
                Volver al carrito
            </Link>
        </div>
    )
}
