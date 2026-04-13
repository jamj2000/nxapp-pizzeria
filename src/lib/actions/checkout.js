'use server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function crearSesionPago({ items, userId }) {
    if (!items || items.length === 0) {
        throw new Error('El carrito está vacío')
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const line_items = items.map((item) => ({
        price_data: {
            currency: 'eur',
            product_data: {
                name: item.nombre,
                ...(item.foto && { images: [item.foto] }),
            },
            unit_amount: Math.round(item.precio * 100),
        },
        quantity: item.quantity,
    }))

    // The Checkout Session object
    // https://docs.stripe.com/api/checkout/sessions
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${baseUrl}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/pago/cancelado`,
        metadata: {
            userId: userId || '',
            // Guardamos los items como JSON para recrear el pedido en el webhook
            items: JSON.stringify(
                items.map((item) => ({ id: item.id, cantidad: item.quantity }))
            ),
        },
    })

    return session.url
}