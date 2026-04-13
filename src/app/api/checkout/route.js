// No se usa esta ruta. Se ha sustituido por una acción de servidor.
// En su lugar se usa la acción de servidor crearSesionPago en lib/actions/checkout.js
// Se deja disponible para poder hacer checkout directamente desde el frontend si fuera necesario.

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const { items, userId } = await req.json()

    if (!items || items.length === 0) {
        return Response.json({ error: 'El carrito está vacío' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const line_items = items.map((item) => ({
        price_data: {
            currency: 'eur',
            product_data: {
                name: item.nombre,
                ...(item.foto && { images: [item.foto] }),
            },
            unit_amount: Math.round(item.precio * 100), // Stripe trabaja en céntimos
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

    return Response.json({ url: session.url })
}
