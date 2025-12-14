// import CarouselControlsInside from "@/components/carousel.old";
import Carousel from "@/components/ui/carousel";
import Link from "next/link";
import { getImages } from '@/lib/data/images';

export default async function Home() {

    const images = await getImages()

    // const images = [
    //     'https://picsum.photos/id/1018/1000/600/',
    //     'https://picsum.photos/id/1015/1000/600/',
    //     'https://picsum.photos/id/1019/1000/600/',
    // ]

    return (

        /* Hero Section */
        <section
            className="text-center pt-20">
            <h2 className="text-5xl font-bold mb-4">¡Las mejores pizza de la ciudad!</h2>
            <p className="text-xl">Hechas con ingredientes frescos y mucho amor.</p>
            <Carousel images={images} />

            <div className="h-10"></div>
            <Link href='/pizzas'
                className="border text-yellow-700 bg-slate-100 px-12 py-6 rounded-lg text-md lg:text-3xl hover:bg-yellow-600 hover:text-white">
                Nuestras pizzas
            </Link>
        </section>

    );
}
