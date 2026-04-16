import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (pedido) => {
    const doc = new jsPDF();

    // Configuración de fuentes y colores
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(63, 70, 229); // Color indigo-600 aproximado

    // Título / Logo
    doc.text("PIZZERÍA MAMMA MIA", 20, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text("Factura Proforma / Recibo de Pedido", 20, 28);

    // Información del Pedido
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(`Pedido Nº: ${pedido.id}`, 20, 45);

    doc.setFont("helvetica", "normal");
    const fecha = new Intl.DateTimeFormat("es-ES", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Europe/Madrid",
    }).format(new Date(pedido.fecha_hora));
    doc.text(`Fecha: ${fecha}`, 20, 52);

    // Información del Cliente
    doc.setFont("helvetica", "bold");
    doc.text("Datos del Cliente:", 20, 65);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${pedido?.cliente?.name || 'N/A'}`, 20, 72);
    doc.text(`Dirección: ${pedido?.cliente?.address || 'N/A'}`, 20, 79);
    doc.text(`Teléfono: ${pedido?.cliente?.phone || 'N/A'}`, 20, 86);

    // Tabla de Productos
    const tableColumn = ["Cant.", "Descripción", "Precio Unit.", "Subtotal"];
    const tableRows = [];

    pedido.pedidoPizzas.forEach(pp => {
        const orderData = [
            pp.cantidad,
            pp.pizza.nombre,
            `${pp.pizza.precio.toFixed(2)} €`,
            `${(pp.cantidad * pp.pizza.precio).toFixed(2)} €`
        ];
        tableRows.push(orderData);
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 95,
        theme: 'striped',
        headStyles: { fillColor: [63, 70, 229] },
        styles: { fontSize: 10 },
    });

    // Total
    const finalY = doc.lastAutoTable.finalY + 10;
    const total = pedido.pedidoPizzas.reduce((acc, pp) => acc + (pp.cantidad * pp.pizza.precio), 0).toFixed(2);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: ${total} €`, 190, finalY, { align: "right" });

    // Pie de página
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150);
    doc.text("¡Gracias por su compra!", 105, 280, { align: "center" });

    // Descargar el PDF
    doc.save(`Factura_Pedido_${pedido.id}.pdf`);
};
