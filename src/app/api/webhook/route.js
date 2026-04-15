import { headers } from 'next/headers'
import stripe from '@/lib/stripe'
import prisma from '@/lib/prisma'



export async function POST(req) {
    const body = await req.text() // ⚠️ importante: raw body
    const signature = (await headers()).get('stripe-signature')

    // console.error('>>>----------- WEBHOOK INVOCADO -----------<<<')
    // console.error('>>> body:', body)
    // console.error('>>> signature:', signature)
    // console.error('>>>----------- WEBHOOK INVOCADO -----------<<<')

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        console.error('Error verificando webhook:', err.message)
        return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    console.error('>>> WEBHOOK INVOCADO - Tipo:', event.type)

    // Manejar eventos
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object
            console.error('>>> Procesando checkout.session.completed:', session.id)

            // Evitar procesar el mismo pago dos veces (idempotencia)
            const existingPedido = await prisma.pedido.findUnique({
                where: { stripeSessionId: session.id },
            })
            if (existingPedido) {
                console.error('>>> Pedido ya existe, saltando:', session.id)
                break
            }

            const userId = session.metadata?.userId || null
            const items = JSON.parse(session.metadata?.items || '[]')
            console.error('>>> Metadata - userId:', userId, 'items count:', items.length)

            if (items.length === 0) {
                console.error('❌ Webhook: no se encontraron items en metadata')
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
                console.error('✅ Pedido guardado en BD')

                // Guardar el stripeCustomerId si el usuario no lo tiene
                if (userId && session.customer) {
                    const updateResult = await prisma.user.update({
                        where: { id: userId },
                        data: { stripeCustomerId: session.customer },
                    })
                    console.error('✅ Usuario vinculado a Stripe:', updateResult.id, 'ID Stripe:', session.customer)
                } else {
                    console.error('⚠️ No se pudo vincular: userId o session.customer faltan', { userId, customer: session.customer })
                }
            } catch (err) {
                console.error('❌ Error crítico en webhook:', err.message)
            }

            break
        }

        case 'payment_intent.created': {
            const paymentIntent = event.data.object
            console.error('>>> Procesando payment_intent.created:', paymentIntent.id)
            break
        }

        case 'charge.updated': {
            const charge = event.data.object
            console.error('>>> Procesando charge.updated:', charge.id)
            break
        }

        default:
            console.log(`>>> Evento no manejado: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
}