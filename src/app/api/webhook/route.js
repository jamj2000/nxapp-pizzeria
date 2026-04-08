import { headers } from 'next/headers'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const body = await req.text() // ⚠️ importante: raw body
    const sig = (await headers()).get('stripe-signature')

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        console.error('Error verificando webhook:', err.message)
        return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    // Manejar eventos
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object

            // Evitar procesar el mismo pago dos veces (idempotencia)
            const existingPedido = await prisma.pedido.findUnique({
                where: { stripeSessionId: session.id },
            })
            if (existingPedido) break

            const userId = session.metadata?.userId || null
            const items = JSON.parse(session.metadata?.items || '[]')

            if (items.length === 0) {
                console.error('Webhook: no se encontraron items en metadata')
                break
            }

            try {
                await prisma.pedido.create({
                    data: {
                        fecha_hora: new Date(),
                        clienteId: userId || null,
                        stripeSessionId: session.id,
                        pedidoPizzas: {
                            create: items.map((item) => ({
                                pizzaId: item.id,
                                cantidad: item.cantidad,
                            })),
                        },
                    },
                })
                console.log('✅ Pedido creado desde webhook:', session.id)
            } catch (err) {
                console.error('❌ Error creando pedido en BD:', err.message)
            }

            break
        }

        default:
            console.log(`Evento no manejado: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
}