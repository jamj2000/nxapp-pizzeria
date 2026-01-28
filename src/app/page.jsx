// import { redirect } from "next/navigation"; // IMPORTANTE: importar desde next/navigation


// export default function RootPage() {
//   redirect('/home')
// }


import Carousel from "@/components/ui/carousel";
import Link from "next/link";

export default async function Home() {



  return (

    /* Hero Section */
    <section className="text-center pt-20">

      <Link href='/pizzas' className="hover:outline hover:outline-slate-200">
        <h2 className="text-5xl font-bold mb-4 hover:bg-slate-200">Pizzería Mamma Mia</h2>
      </Link>

      <Carousel />


    </section>
  )
}
