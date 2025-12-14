// "use client"

// import { useActionState, useState } from "react"
// import { obtenerPizza } from "@/lib/data/pizzas"


// export default function PizzasClient({ postId }) {
//     const [id, setId] = useState(1)
//     const [pizzas, setPizzas] = useState([])

//     const [latestPizza, action, isPending] = useActionState(
//         obtenerPizza.bind(null, id),
//         {}
//     )


//     return (
//         <div>
//             <form action={action}>
//                 <button
//                     disabled={isPending}
//                     onClick={() => { setId(prev => prev + 1); setPizzas(prev => [...prev, latestPizza]) }}
//                 >
//                     {isPending ? "Cargando..." : "Ver pizza"}
//                 </button>
//             </form>


//             {/* Última pizza cargada */}
//             {latestPizza && <p>Última pizza: {latestPizza.nombre}</p>}

//             {/* Lista completa */}
//             <ul>
//                 {pizzas.map(p => (
//                     <li key={p.id}>{p.nombre}</li>
//                 ))}
//             </ul>
//         </div>
//     )
// }



import PizzasClient from "@/components/pizzas/PizzasClient"

function page() {
    return (
        <PizzasClient />
    )
}

export default page