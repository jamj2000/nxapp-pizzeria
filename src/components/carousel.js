'use client';

import { useState, useEffect } from 'react';


export default function Carousel({ images, interval = 3000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const autoSlide = setInterval(nextSlide, interval);
        return () => clearInterval(autoSlide);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, interval]);

    return (
        <div className="-z-10 relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((src, index) => (
                    <img key={index} src={src} alt={`Slide ${index}`} className="w-full flex-shrink-0" />
                ))}
            </div>

            {/* Controles */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
                ◀
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
            >
                ▶
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
