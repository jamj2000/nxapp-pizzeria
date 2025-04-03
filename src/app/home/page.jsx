import Link from "next/link";


export default function Home() {
    return (
        <div className="min-h-screen bg-gray-500">

            {/* Hero Section */}
            <section
                className="text-center py-40 bg-[url('/images/default-pizza.avif')] bg-bottom bg-cover text-white">
                <h2 className="text-5xl font-bold mb-4">¡Las mejores pizza de la ciudad!</h2>
                <p className="text-xl mb-6">Hechas con ingredientes frescos y mucho amor.</p>
                <Link href='/pizzas'
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-3xl">
                    Lista de pizzas
                </Link>
            </section>


            {/* Testimonios */}
            <section id="testimonios" className="bg-gray-200 py-16 text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Lo que dicen nuestros clientes</h2>
                <div className="max-w-4xl mx-auto">
                    <p className="text-xl italic">"¡La mejor pizza que he probado! Ingredientes frescos y un sabor inigualable."</p>
                    <span className="block mt-4 font-semibold">- Juan Pérez</span>
                </div>
            </section>

        </div >
    );
}
