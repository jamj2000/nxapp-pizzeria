'use client';

import { toast } from "sonner";

export default function PizzaCard({ pizza }) {
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Verificar si la pizza ya está en el carrito
        const exists = cart.some((p) => p.id === pizza.id);

        if (exists) {
            // alert(`${pizza.name} ya está en el carrito`);
            toast.warning(`${pizza.name} ya está en el carrito`)
            return;
        }

        cart.push(pizza);
        localStorage.setItem('cart', JSON.stringify(cart));
        // alert(`${pizza.name} añadido al carrito`);
        toast.success(`${pizza.name} añadido al carrito`)
    };

    return (
        <div className="border border-slate-400 p-4">
            <h3>{pizza.name}</h3>
            <p>Precio: {pizza.price} €</p>
            <button onClick={addToCart} className="text-green-700">Añadir al carrito</button>
        </div>
    );
}