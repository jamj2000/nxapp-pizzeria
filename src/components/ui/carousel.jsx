'use client'

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
    "/images/pizza-01.avif",
    "/images/pizza-02.avif",
    "/images/pizza-03.avif",
    "/images/pizza-04.avif",
    "/images/pizza-05.avif",
    "/images/pizza-06.avif",
    "/images/pizza-07.avif"
];

export default function AutoCarousel() {
    const [index, setIndex] = useState(0);

    const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    useEffect(() => {
        const timer = setInterval(() => nextSlide(), 4000); // Cambia cada 4 segundos
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-128 overflow-hidden rounded-xl">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`Slide ${i + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover object-bottom transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
                />
            ))}

            {/* Botones de navegación */}
            <button
                type="button"
                onClick={prevSlide}
                className="rounded-full absolute left-2 top-1/2 transform -translate-y-1/4 bg-black bg-opacity-30 text-white border-none hover:bg-opacity-50"
            >
                <ChevronLeft />
            </button>
            <button
                type="button"
                onClick={nextSlide}
                className="rounded-full absolute right-2 top-1/2 transform -translate-y-1/4 bg-black bg-opacity-30 text-white border-none hover:bg-opacity-50"
            >
                <ChevronRight />
            </button>
        </div>
    );
}