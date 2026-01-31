import Carousel from "@/components/ui/carousel";
import Link from "next/link";


export default async function Home() {

  return (
    <section className="text-center pt-20">

      <Link href='/pizzas' className="hover:outline hover:outline-slate-200">
        <h2 className="text-5xl font-bold mb-4 text-blue-600 hover:bg-blue-100 p-2 px-4 rounded-full">
          Pizzería Mamma Mia
        </h2>
      </Link>

      <Carousel />

    </section>
  )
}
