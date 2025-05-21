import Link from "next/link";


export default function Home() {
    return (
        <div className="bg-[url('/images/default-pizza.avif')] bg-cover">

            {/* Hero Section */}
            <section
                className="text-center py-40 backdrop-brightness-50 text-white ">
                <h2 className="text-5xl font-bold mb-4">¡Las mejores pizza de la ciudad!</h2>
                <p className="text-xl mb-12">Hechas con ingredientes frescos y mucho amor.</p>
                <Link href='/pizzas'
                    className="bg-green-700 text-white px-12 py-6 rounded-lg text-3xl hover:bg-green-600">
                    Nuestras pizzas
                </Link>
            </section>


        </div >
    );
}
