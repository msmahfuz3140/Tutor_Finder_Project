"use client";

import { useEffect, useState } from "react";
import SliderBanner from "@/components/SliderBanner";
import TutorCard from "@/components/TutorCard";
import { FaUserTie, FaCheckCircle, FaLaptopCode } from "react-icons/fa";

export default function Home() {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Home | MediQueue";

        const fetchTutors = async () => {
            try {
                const res = await fetch("http://localhost:4000/tutors?limit=6", {
                    cache: "no-store",
                });
                const data = await res.json();
                setTutors(data);
            } catch (error) {
                console.error("Failed to fetch tutors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutors();
    }, []);

    return (
        <div className="space-y-20 pb-20">
            {/* Banner Slider */}
            <SliderBanner />

            {/* Available Tutors Section */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Available Tutors
                    </h2>
                    <div className="h-1 w-20 bg-indigo-600 mx-auto mt-3 rounded-full"></div>
                    <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">
                        Browse our top featured tutors. Find the perfect fit for your subject and schedule.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : tutors.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No tutors available at the moment.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {tutors.map((tutor) => (
                            <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
                        ))}
                    </div>
                )}
            </section>

            {/* Extra Section 1: Features */}
            <section className="bg-gray-55 dark:bg-gray-900/40 py-16 transition-colors duration-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Why Choose MediQueue?
                        </h2>
                        <div className="h-1 w-20 bg-indigo-600 mx-auto mt-3 rounded-full"></div>
                        <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">
                            We simplify learning by connecting you directly to verified expert tutors.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                                <FaUserTie className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Verified Expert Tutors
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                Every tutor undergoes background and credential verification so you receive top-quality academic guidance.
                            </p>
                        </div>

                        <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                                <FaCheckCircle className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Hassle-Free Bookings
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                No more back-and-forth messaging. Pick your preferred subject, day, and time, and secure your session instantly.
                            </p>
                        </div>

                        <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800/80 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6">
                                <FaLaptopCode className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                Flexible Learning Modes
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                Choose between interactive online virtual sessions, face-to-face offline tutoring, or a hybrid of both modes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Extra Section 2: Platform Stats */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-950/80 dark:to-blue-900/60 rounded-3xl p-8 md:p-12 text-white shadow-xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-1">
                                <span>500</span><span className="text-indigo-300">+</span>
                            </div>
                            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-indigo-200">
                                Expert Tutors
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-1">
                                <span>15</span><span className="text-indigo-300">k+</span>
                            </div>
                            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-indigo-200">
                                Happy Students
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-1">
                                <span>45</span><span className="text-indigo-300">k+</span>
                            </div>
                            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-indigo-200">
                                Session Booked
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-1">
                                <span>4.9</span><span className="text-indigo-300">★</span>
                            </div>
                            <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-indigo-200">
                                Average Rating
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
