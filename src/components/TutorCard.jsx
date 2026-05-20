"use client";

import Image from "next/image";
import { ImageOff, BookOpen, Video, Calendar, Banknote, ArrowRight } from "lucide-react";
import { useState } from "react";

const TutorCard = ({ tutor }) => {

    const [imgError, setImgError] = useState(false);

    return (
        <div
            className="group relative flex flex-col justify-between h-full bg-white dark:bg-gray-900 
            rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800/60
            transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
        >
            <div>
                {/* IMAGE SECTION */}
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850">
                    {!imgError && tutor?.photoUrl ? (
                        <Image
                            src={tutor.photoUrl}
                            alt={tutor.tutorName || "Tutor"}
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                            width={500}
                            height={300}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                            <ImageOff size={42} />
                            <span className="text-sm mt-2">No Image Available</span>
                        </div>
                    )}
                </div>

                {/* CONTENT SECTION */}
                <div className="p-5 space-y-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {tutor?.tutorName || "Unknown Tutor"}
                        </h2>
                    </div>

                    {/* ইনফো গ্রিড */}
                    <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-indigo-500 shrink-0" />
                            <p className="line-clamp-1"><span className="font-medium text-gray-400 dark:text-gray-500">Subject:</span> {tutor?.subject}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Video size={16} className="text-blue-500 shrink-0" />
                            <p><span className="font-medium text-gray-400 dark:text-gray-500">Mode:</span> {tutor?.teachingMode}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-emerald-500 shrink-0" />
                            <p><span className="font-medium text-gray-400 dark:text-gray-500">Slots Available:</span> {tutor?.totalSlot}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Banknote size={16} className="text-amber-500 shrink-0" />
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                {tutor?.hourlyFee} <span className="text-xs font-normal text-gray-500">BDT / hour</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* BUTTON SECTION (FIXED & RESPONSIVE) */}
            <div className="p-5 pt-0 mt-auto">
                <button
                    className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-indigo-600 
                    dark:bg-gray-800 dark:hover:bg-indigo-600 text-white text-sm font-medium
                    flex items-center justify-center gap-2 transition-all duration-300 shadow-sm
                    group-hover:shadow-indigo-200 dark:group-hover:shadow-none"
                >
                    <span>View Details</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

export default TutorCard;