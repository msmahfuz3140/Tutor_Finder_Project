"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
        id: 1,
        image: "/assets/tutors-1.PNG",
        title: "Find The Best Tutor Near You",
        description:
            "Connect with expert tutors and boost your learning journey today.",
    },
    {
        id: 2,
        image: "/assets/tutors-2.PNG",
        title: "Learn Anytime Anywhere",
        description:
            "Online and offline tutors available for all subjects.",
    },
    {
        id: 3,
        image: "/assets/tutors-3.PNG",
        title: "Book Your Perfect Tutor",
        description:
            "Choose skilled tutors based on rating, experience & reviews.",
    },
];

const SliderBanner = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[70vh] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute w-full h-full transition-opacity duration-1000 ${index === current ? "opacity-100 z-10" : "opacity-0"
                        }`}
                >
   
                    <Image
                        src={slide.image}
                        alt="banner"
                        fill
                        priority
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center px-4">
                        <div className="text-white max-w-2xl">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                {slide.title}
                            </h1>

                            <p className="mb-6 text-lg md:text-xl">
                                {slide.description}
                            </p>

                            <Link
                                href="/tutor"
                                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
                            >
                                Find Tutor
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 rounded-full ${current === i ? "bg-white" : "bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default SliderBanner;