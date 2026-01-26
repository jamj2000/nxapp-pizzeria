import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const users = [
    {
        name: "Pepe Viyuela",
        email: "pepe@pepe.es",
        address: "C/ Nueva, 99",
        image: '/images/avatar-77.png',
        role: 'USER',
    },
    {
        name: "Ana Alferez",
        email: "ana@ana.es",
        address: "C/ Ancha, 100",
        image: '/images/avatar-78.png',
        role: 'USER',
    },
    {
        name: "Jose López",
        email: "jose@jose.es",
        address: "Avda. Constitución, 1",
        image: '/images/avatar-79.png',
        role: 'ADMIN',
    }
];


const repartidores = [
    {
        id: 1,
        nombre: 'Juan',
        telefono: '666111222'
    },
    {
        id: 2,
        nombre: 'Pepe',
        telefono: '666111333'
    },
    {
        id: 3,
        nombre: 'Luis',
        telefono: '666111444'
    }
]

const ingredientes = [
    {
        id: 1,
        nombre: 'Masa', descripcion: ''
    },
    {
        id: 2,
        nombre: 'Tomate', descripcion: ''
    },
    {
        id: 3,
        nombre: 'Mozzarella', descripcion: ''
    },
    {
        id: 4,
        nombre: 'Queso Roquefort', descripcion: ''
    },
    {
        id: 5,
        nombre: 'Queso Parmesano', descripcion: ''
    },
    {
        id: 6,
        nombre: 'Pepperoni', descripcion: ''
    },
    {
        id: 7,
        nombre: 'Salami', descripcion: ''
    },
    {
        id: 8,
        nombre: 'Jamón', descripcion: ''
    },
    {
        id: 9,
        nombre: 'Bacón', descripcion: ''
    },
    {
        id: 10,
        nombre: 'Aceitunas', descripcion: ''
    },
    {
        id: 11,
        nombre: 'Champiñones', descripcion: ''
    },
    {
        id: 12,
        nombre: 'Pimientos', descripcion: ''
    },
    {
        id: 13,
        nombre: 'Atún', descripcion: ''
    },
    {
        id: 14,
        nombre: 'Piña', descripcion: ''
    },
    {
        id: 15,
        nombre: 'Albahaca fresca', descripcion: ''
    },
]


// pizzas ---- n:m ---- ingredientes
const pizzas = [
    {
        id: 1,
        nombre: 'Mediterránea',
        precio: 10.01,
        ingredientes: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 10 }, { id: 12 }, { id: 15 }]
        }
    },
    {
        id: 2,
        nombre: 'Carbonara',
        precio: 11.02,
        ingredientes: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }, { id: 12 }]
        }
    },
    {
        id: 3,
        nombre: 'Peperoni',
        precio: 12.03,
        ingredientes: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 6 }, { id: 15 }]
        }
    },
    {
        id: 4,
        nombre: 'Romana',
        precio: 13.04,
        ingredientes: {
            connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 10 }, { id: 12 }, { id: 15 }]
        }
    },
]


// pedidos ---- n:m ---- pizzas
const pedidos = [
    {
        fecha_hora: '2024-06-01T20:00:05.000Z',
        pedidoPizzas: {
            create: [{ pizzaId: 1, cantidad: 1 }]
        }
    },
    {
        fecha_hora: '2024-07-01T21:12:05.000Z',
        pedidoPizzas: {
            create: [{ pizzaId: 1, cantidad: 1 }, { pizzaId: 2, cantidad: 2 }]
        }
    },
    {
        fecha_hora: '2024-08-01T22:12:05.000Z',
        pedidoPizzas: {
            create: [{ pizzaId: 2, cantidad: 1 }, { pizzaId: 4, cantidad: 1 }]
        }
    },
    {
        fecha_hora: '2024-09-01T23:12:05.000Z',
        pedidoPizzas: {
            create: [{ pizzaId: 2, cantidad: 1 }, { pizzaId: 3, cantidad: 1 }, { pizzaId: 4, cantidad: 1 }]
        }
    },
]


const pickOne = (array, key) => {
    const index = Math.floor(Math.random() * array.length)
    return {
        where: { [key]: array[index][key] },
        create: array[index]
    }
}



// Eliminar contenido de las tablas
const resetDatabase = async () => {
    // Eliminar ingredientes, repartidores, pizzas, pedidos y users
    await prisma.pedidoPizza.deleteMany();
    await prisma.ingrediente.deleteMany();
    await prisma.repartidor.deleteMany();
    await prisma.pizza.deleteMany();
    await prisma.pedido.deleteMany();
    await prisma.user.deleteMany();
};


const setSequences = async () => {
    // Las secuencias continuarán en 20
    await prisma.$executeRaw`ALTER SEQUENCE "ingredientes_id_seq" RESTART WITH 20;`;
    await prisma.$executeRaw`ALTER SEQUENCE "repartidores_id_seq" RESTART WITH 20;`;
    await prisma.$executeRaw`ALTER SEQUENCE "pizzas_id_seq" RESTART WITH 20;`;
    await prisma.$executeRaw`ALTER SEQUENCE "pedidos_id_seq" RESTART WITH 20;`;
}

const load = async () => {
    try {
        // reset database
        await resetDatabase();

        // Users
        await prisma.user.createMany({ data: users });
        console.log(`Usuarios insertados`);

        // Repartidores
        await prisma.repartidor.createMany({ data: repartidores });
        console.log(`Repartidores insertados`);

        // Ingredientes
        await prisma.ingrediente.createMany({ data: ingredientes });
        console.log(`Ingredientes insertados`);

        // Pizzas
        pizzas.forEach(async pizza => {
            await prisma.pizza.create({ data: pizza });
        })
        console.log(`Pizzas insertadas`);

        // Pedidos, Repartidores, Users
        for (const pedido of pedidos) {
            const cliente = pickOne(users, "email")
            const repartidor = pickOne(repartidores, "id")

            await prisma.pedido.create({
                data: {
                    fecha_hora: pedido.fecha_hora,
                    pedidoPizzas: pedido.pedidoPizzas,
                    cliente: { connectOrCreate: cliente },        // cliente --- 1:n ---- pedido
                    repartidor: { connectOrCreate: repartidor },  // repartidor --- 1:n ---- pedido
                }
            })
        }
        console.log(`Pedidos insertados, junto con repartidores y usuarios`);

        // Iniciar próximas secuencias    
        await setSequences()

    } catch (error) {
        console.error("Error al insertar datos:", error);
    } finally {
        await prisma.$disconnect();
    }
};


load();