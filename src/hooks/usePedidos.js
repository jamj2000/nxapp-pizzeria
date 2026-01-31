import sortBy from '@/utils/sort';
import { useState } from 'react';



export default function usePedidos(dataPedidos) {
    const [propiedad, setPropiedad] = useState('fecha_hora');
    const [orden, setOrden] = useState('desc');
    const [buscar, setBuscar] = useState('');

    let pedidosFiltrados = sortBy(dataPedidos, propiedad, orden);

    if (buscar) {
        const busqueda = buscar.toLowerCase();
        pedidosFiltrados = pedidosFiltrados.filter(pedido =>
            pedido.fecha_hora.toLocaleDateString('es-ES', {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }).includes(busqueda) ||
            pedido.cliente?.name.toLowerCase().includes(busqueda) ||
            // pedido.estado.toString().includes(busqueda) ||
            pedido.repartidor?.nombre.toLowerCase().includes(busqueda) ||
            pedido.pedidoPizzas.some(pedidoPizza => pedidoPizza.pizza.nombre.toLowerCase().includes(busqueda))
            // pedido.precio.toString().includes(busqueda)
        )
    }

    return { pedidosFiltrados, propiedad, setPropiedad, orden, setOrden, buscar, setBuscar };
}
