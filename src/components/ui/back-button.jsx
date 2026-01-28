'use client'

import { useRouter } from "next/navigation"; // IMPORTANTE: No importar desde next/router
import { IconoAtras } from "./icons";

function BackButton() {
    const { back } = useRouter()
    return (
        <div onClick={back}>
            <IconoAtras />
        </div>
    )
}


export default BackButton;