import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();




const repartidores = [
    { id: 1, nombre: 'Juan', telefono: '666111222' },
    { id: 2, nombre: 'Pepe', telefono: '666111333' },
    { id: 3, nombre: 'Luis', telefono: '666111444' }
]

const ingredientes = [
    { id: 1, nombre: 'Masa', descripcion: '' },
    { id: 2, nombre: 'Tomate', descripcion: '' },
    { id: 3, nombre: 'Mozzarella', descripcion: '' },
    { id: 4, nombre: 'Queso Roquefort', descripcion: '' },
    { id: 5, nombre: 'Queso Parmesano', descripcion: '' },
    { id: 6, nombre: 'Pepperoni', descripcion: '' },
    { id: 7, nombre: 'Salami', descripcion: '' },
    { id: 8, nombre: 'Jamón', descripcion: '' },
    { id: 9, nombre: 'Bacón', descripcion: '' },
    { id: 10, nombre: 'Aceitunas', descripcion: '' },
    { id: 11, nombre: 'Champiñones', descripcion: '' },
    { id: 12, nombre: 'Pimientos', descripcion: '' },
    { id: 13, nombre: 'Atún', descripcion: '' },
    { id: 14, nombre: 'Piña', descripcion: '' },
    { id: 15, nombre: 'Albahaca fresca', descripcion: '' },
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
        repartidorId: 2,
        pizzas: {
            connect: [{ id: 1 }, { id: 3 }, { id: 4 }]
        }
    },
    {
        id: 2,
        fecha_hora: '2024-06-01T20:12:05.000Z',
        repartidorId: 3,
        pizzas: {
            connect: [{ id: 2 }, { id: 4 }]
        }
    },
    {
        id: 3,
        fecha_hora: '2024-06-01T20:12:05.000Z',
        repartidorId: 1,
        pizzas: {
            connect: [{ id: 2 }, { id: 3 }]
        }
    },
    {
        id: 4,
        fecha_hora: '2024-06-01T20:12:05.000Z',
        repartidorId: 2,
        pizzas: {
            connect: [{ id: 1 }, { id: 4 }]
        }
    },
]



const usuarios = [
    {
        name: "Pepe Viyuela",
        email: "pepe@pepe.com",
        address: "C/ Nueva, 99",
        image: '/images/avatar-77.png',
        role: 'USER',
        pedidos: {
            connect: [{ id: 1 }]
        }
    },
    {
        name: "Ana Alferez",
        email: "ana@ana.com",
        address: "C/ Ancha, 100",
        image: '/images/avatar-78.png',
        role: 'USER',
        pedidos: {
            connect: [{ id: 2 }, { id: 3 }]
        }
    },
    {
        name: "Jose López",
        email: "jose@jose.com",
        address: "Avda. Constitución, 1",
        image: '/images/avatar-79.png',
        role: 'ADMIN',
        pedidos: {
            connect: [{ id: 4 }]
        }
    }
];





// Eliminar contenido de las tablas
const resetDatabase = async () => {
    // Eliminar repartidores, pizzas, pedidos y users
    await prisma.repartidor.deleteMany();
    await prisma.pizza.deleteMany();
    await prisma.pedido.deleteMany();
    await prisma.user.deleteMany();

    // Reiniciar el contador de ID en las tablas repartidores, pizzas y pedidos
    // await prisma.$executeRaw`ALTER SEQUENCE "repartidores_id_seq" RESTART WITH 1;`;
    // await prisma.$executeRaw`ALTER SEQUENCE "pizzas_id_seq" RESTART WITH 1;`;
    // await prisma.$executeRaw`ALTER SEQUENCE "pedidos_id_seq" RESTART WITH 1;`;
};


const load = async () => {
    try {
        // reset database
        await resetDatabase();

        await prisma.repartidor.createMany({ data: repartidores });
        console.log(`Repartidores insertados`);

        await prisma.pizza.createMany({ data: pizzas });
        console.log(`Pizzas insertadas`);

        pedidos.forEach(async pedido => {
            await prisma.pedido.create({ data: pedido });
        })
        console.log(`Pedidos insertados`);

        // await prisma.user.createMany({ data: usuarios });
        // console.log(`Usuarios insertados`);

        usuarios.forEach(async user => {
            await prisma.user.create({ data: user });
        })
        console.log(`Usuarios insertados`);


    } catch (error) {
        console.error("Error al insertar datos:", error);
    } finally {
        await prisma.$disconnect();
    }
};


load();