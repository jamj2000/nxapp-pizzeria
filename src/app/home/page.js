import Link from "next/link";


export default function Home() {
    return (
        <div className="h-screen grid place-content-center place-items-center gap-4">
            <div className="text-9xl">🍕</div>
            <Link href="/repartidores" className="block text-5xl font-bold">REPARTIDORES</Link>
            <Link href="/pedidos" className="block text-5xl font-bold">PEDIDOS</Link>
            <Link href="/pizzas" className="block text-5xl font-bold">PIZZAS</Link>
        </div>
    );
}
