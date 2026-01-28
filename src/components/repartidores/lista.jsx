'use client'
import { use } from "react";
import Link from "next/link";
import Modal from "@/components/ui/modal";
import Form from "@/components/repartidores/form";
import { IconoInsertar, IconoModificar, IconoEliminar } from "@/components/ui/icons";
import { labelEliminar, labelInsertar, labelModificar } from "@/components/ui/labels";
import { HeadsetIcon } from "lucide-react";
import { eliminarRepartidor, insertarRepartidor, modificarRepartidor } from "@/lib/actions/repartidores";



export default function Repartidores({ promesaRepartidores }) {
    const repartidores = use(promesaRepartidores)

    return (
        <div className="flex flex-col gap-4">

            <div className='flex justify-end items-center gap-4 pb-4'>
                <Modal openElement={<IconoInsertar />}>
                    <Form action={insertarRepartidor} labelSubmit={labelInsertar} />
                </Modal>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {repartidores.map(repartidor =>
                    <Repartidor key={repartidor.id} repartidor={repartidor} />
                )}
            </div>
        </div>
    );
}





function Repartidor({ repartidor }) {
    return (
        <div key={repartidor.id} className="p-4 mb-4 bg-blue-50 rounded-lg border border-blue-100   ">

            <div className='flex justify-end items-center gap-1'>
                <Modal openElement={<IconoModificar />}>
                    <Form action={modificarRepartidor} repartidor={repartidor} labelSubmit={labelModificar} />
                </Modal>


                <Modal openElement={<IconoEliminar />}>
                    <Form action={eliminarRepartidor} repartidor={repartidor} labelSubmit={labelEliminar} disabled />
                </Modal>
            </div>


            <Link href={`/repartidores/${repartidor.id}`} className="font-bold cursor-pointer">
                {repartidor.nombre}
            </Link>
            <a href={`tel:${repartidor.telefono}`} className="flex gap-2 p-2 bg-blue-100">
                <HeadsetIcon /> {repartidor.telefono}
            </a>

        </div>
    )
}
