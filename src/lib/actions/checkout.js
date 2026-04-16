'use server'
import stripe from '@/lib/stripe'
import prisma from '@/lib/prisma'


export async function crearSesionPago({ items, userId, userEmail, userName }) {
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

    let stripeCustomerId = null

    if (userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { stripeCustomerId: true, email: true, name: true }
        })

        if (user?.stripeCustomerId) {
            stripeCustomerId = user.stripeCustomerId
        } else if (user) {
            // Si el usuario existe pero no tiene stripeCustomerId, lo creamos
            const customer = await stripe.customers.create({
                email: userEmail || user.email,
                name: userName || user.name,
            })
            stripeCustomerId = customer.id
            // Actualizamos el usuario en la DB
            await prisma.user.update({
                where: { id: userId },
                data: { stripeCustomerId }
            })
        }
    }

    // The Checkout Session creation: https://docs.stripe.com/api/checkout/sessions/create
    // The Checkout Session object:  https://docs.stripe.com/api/checkout/sessions/object
    const sessionConfig = {
        payment_method_types: ['card'],
        line_items,
        mode: 'payment', // payment: pago único, subscription: suscripción
        success_url: `${baseUrl}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/pago/cancelado`,
        metadata: {
            userId: userId || '',
            userName: userName || '',
            // Guardamos los items como JSON para recrear el pedido en el webhook
            items: JSON.stringify(
                items.map((item) => ({ id: item.id, cantidad: item.quantity }))
            ),
        },
        payment_intent_data: {
            description: `Pedido de ${userName || 'Usuario General'} - Pizzería`,
        }
    }

    if (stripeCustomerId) {
        sessionConfig.customer = stripeCustomerId
    } else {
        sessionConfig.customer_email = userEmail
        sessionConfig.customer_creation = 'if_required'
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    console.log('✅ Sesión de pago creada:', session)
    return session.url
}