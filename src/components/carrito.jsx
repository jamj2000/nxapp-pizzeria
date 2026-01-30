'use client';
import { useEffect, useState } from 'react';


export default function Carrito() {
    const [cart, setCart] = useState([]);  // Array de productos en el carrito

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cart.filter(p => p.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div>
            <h2>Mi Carrito</h2>
            {cart.length === 0
                ? <p>Tu carrito está vacío</p>
                : <ul>
                    {cart.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.price} €
                            <button onClick={() => removeFromCart(product.id)} className='text-red-700'>Eliminar</button>
                        </li>
                    ))}
                    <p className='pt-4 font-bold'>Total: {cart.reduce((acc, item) => acc + item.price, 0)}  €</p>
                </ul>
            }
        </div>
    );
}