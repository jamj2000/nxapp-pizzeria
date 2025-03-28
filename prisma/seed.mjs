import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const usuarios = [
    {
        name: "Pepe Viyuela",
        email: "pepe@pepe.com",
        address: "C/ Nueva, 99",
        image: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/128/28.jpg',
        role: 'USER'
    },
    {
        name: "Ana Alferez",
        email: "ana@ana.com",
        address: "C/ Ancha, 100",
        image: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/128/28.jpg',
        role: 'USER'
    },
    {
        name: "Jose López",
        email: "jose@jose.com",
        address: "Avda. Constitución, 1",
        image: 'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/128/14.jpg',
        role: 'ADMIN'
    }
];


const repartidores = [
    { id: 1, nombre: 'Juan', telefono: '666111222' },
    { id: 2, nombre: 'Pepe', telefono: '666111333' },
    { id: 3, nombre: 'Luis', telefono: '666111444' }
]

const pizzas = [
    { id: 1, nombre: 'Mediterránea', precio: 10.01 },
    { id: 2, nombre: 'Carbonara', precio: 11.02 },
    { id: 3, nombre: 'Peperoni', precio: 12.03 },
    { id: 4, nombre: 'Romana', precio: 13.04 },
]

const pedidos = [
    {
        id: 1,
        fecha_hora: '2024-06-01T20:00:05.000Z',
        nombre_cliente: 'Gloria',
        direccion_cliente: 'C/ Nueva, 1',
        repartidorId: 2,
        pizzas: {
            connect: [{ id: 1 }, { id: 3 }, { id: 4 }]
        }
    },
    {
        id: 2,
        fecha_hora: '2024-06-01T20:12:05.000Z',
        nombre_cliente: 'Isabel',
        direccion_cliente: 'C/ Nueva, 2',
        repartidorId: 3,
        pizzas: {
            connect: [{ id: 2 }, { id: 4 }]
        }
    },
]


// Eliminar contenido de las tablas
const resetDatabase = async () => {
    // Eliminar repartidores, pizzas, pedidos y users
    await prisma.repartidor.deleteMany();
    await prisma.pizza.deleteMany();
    await prisma.pedido.deleteMany();
    await prisma.user.deleteMany();

    // Reiniciar el contador de ID en las tablas repartidores, pizzas y pedidos
    // await prisma.$executeRaw`ALTER SEQUENCE "Repartidor_id_seq" RESTART WITH 1;`;
    // await prisma.$executeRaw`ALTER SEQUENCE "Pizzas_id_seq" RESTART WITH 1;`;
    // await prisma.$executeRaw`ALTER SEQUENCE "Pedido_id_seq" RESTART WITH 1;`;
};


const load = async () => {
    try {
        // reset database
        await resetDatabase();

        await prisma.user.createMany({ data: usuarios });
        console.log(`Usuarios insertados`);

        await prisma.repartidor.createMany({ data: repartidores });
        console.log(`Repartidores insertados`);

        await prisma.pizza.createMany({ data: pizzas });
        console.log(`Pizzas insertadas`);

        pedidos.forEach(async pedido => {
            await prisma.pedido.create({ data: pedido });
        })
        console.log(`Pedidos insertados`);

    } catch (error) {
        console.error("Error al insertar datos:", error);
    } finally {
        await prisma.$disconnect();
    }
};


load();