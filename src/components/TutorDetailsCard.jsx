"use client";

import { useState } from "react";
import {
    BookOpen,
    Video,
    Calendar,
    Banknote,
    ImageOff,
    ArrowLeft,
    Pencil,
    User,
    Phone,
    Mail,
    X,
    MapPin
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// import { EditModalForm } from "@/components/EditModalForm";
// import { DeleteAlert } from "./DeleteAlert";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "@heroui/react";

export default function TutorDetailsCard({ tutor, id }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [imgError, setImgError] = useState(false);
    const router = useRouter();

    // বুকিং ফর্মের স্টেট (স্টুডেন্টের ইনপুট ও অটো-ফিল ডেটা)
    const [studentName, setStudentName] = useState("");
    const [studentPhone, setStudentPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // টিউটর অবজেক্ট থেকে ডেটা ডিস্ট্রাকচারিং
    console.log(tutor, "details tutor");
    const {
        tutorName,
        subject,
        teachingMode,
        totalSlot,
        hourlyFee,
        photoUrl,
        description, // যদি ওরিজিনাল ডেটাতে কোনো ডেসক্রিপশন থাকে
        _id,
        availableDays,
        timeSlot,
        sessionStart,
        location,
        institutionExperience
    } = tutor || {};

    // সেশন বুকিং হ্যান্ডলার
    // const handleBookingSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!studentName || !studentPhone) {
    //         toast.error("Please fill in all required fields.");
    //         return;
    //     }

    //     setIsSubmitting(true);

    //     try {
    //         // অথেন্টিকেটেড ইউজারের (স্টুডেন্ট) টোকেন এবং ইনফো নেওয়া
    //         const { data: sessionData } = await authClient.token();
    //         const currentUser = sessionData?.user;

    //         const bookingData = {
    //             studentName: studentName,
    //             phone: studentPhone,
    //             studentEmail: currentUser?.email || "student@example.com", // অটো-ফিল্ড ইমেইল
    //             tutorId: id || _id, // অটো-ফিল্ড টিউটর আইডি
    //             tutorName: tutorName, // অটো-ফিল্ড টিউটর নেম
    //             bookingStatus: "Pending", // সিস্টেম অটো-জেনারেটেড স্টেটাস
    //             bookedAt: new Date().toISOString()
    //         };

    //         // const res = await fetch("http://localhost:5000/booking", {
    //         //     method: "POST",
    //         //     headers: {
    //         //         "Content-Type": "application/json",
    //         //         authorization: `Bearer ${sessionData?.token}`
    //         //     },
    //         //     body: JSON.stringify(bookingData)
    //         // });

    //         if (res.ok) {
    //             toast.success("Session booked successfully!");
    //             setIsBookModalOpen(false);
    //             // ফর্ম রিসেট
    //             setStudentName("");
    //             setStudentPhone("");
    //         } else {
    //             toast.error("Failed to book session. Try again.");
    //         }
    //     } catch (error) {
    //         console.error("Booking error:", error);
    //         toast.error("Something went wrong!");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 min-h-screen pb-24 text-gray-800 dark:text-gray-100">

            {/* ================= NAV ACTIONS ================= */}
            <div className="max-w-7xl mx-auto px-4 pt-8 flex flex-wrap gap-4 justify-between items-center">
                <Link href="/tutor">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-850 transition font-medium text-sm">
                        <ArrowLeft size={16} />
                        Back to Tutors
                    </button>
                </Link>

                <div className="flex gap-3">
                    {/* EDIT BUTTON */}
                    <button
                        onClick={() => setIsEditOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-850 transition font-medium text-sm"
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    {/* DELETE BUTTON COMPONENT */}
                    {/* <DeleteAlert destination={tutor} id={id} /> */}
                </div>
            </div>

            {/* ================= HERO/IMAGE SECTION ================= */}
            <div className="max-w-7xl mx-auto px-4 mt-6">
                <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-850">
                    {!imgError && photoUrl ? (
                        <Image
                            src={photoUrl}
                            alt={tutorName || "Tutor"}
                            fill
                            priority
                            className="object-cover transition duration-700 hover:scale-102"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center text-gray-400 dark:text-gray-500">
                            <ImageOff size={52} className="mb-2" />
                            <span className="text-sm font-medium">Profile Image Not Available</span>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Content Over Image */}
                    <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 text-white right-6">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            {tutorName || "Unknown Tutor"}
                        </h1>
                        <p className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium mt-3 uppercase tracking-wider">
                            {subject || "General"}
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= MAIN CONTENT GRID ================= */}
            <div className="max-w-7xl mx-auto px-4 mt-12 grid lg:grid-cols-3 gap-8 items-start">

                {/* LEFT: DETAILS & OVERVIEW */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            Overview & Biography
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
                            {institutionExperience || description || `${tutorName} is a professional tutor specializing in ${subject}. Committed to providing high-quality guidance tailored to each student's learning style, offering structured lessons to ensure academic growth.`}
                        </p>
                    </div>

                    {/* TUTOR KEY DETAILS CARD */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/60 rounded-2xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6">Tutor Specifications</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-xl border border-gray-100/50 dark:border-gray-800/30">
                                <BookOpen className="text-indigo-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Expertise Subject</p>
                                    <p className="font-semibold text-sm">{subject}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-xl border border-gray-100/50 dark:border-gray-800/30">
                                <Video className="text-blue-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Teaching Mode</p>
                                    <p className="font-semibold text-sm">{teachingMode}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-xl border border-gray-100/50 dark:border-gray-800/30">
                                <Calendar className="text-emerald-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Available Days</p>
                                    <p className="font-semibold text-sm">{availableDays || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-xl border border-gray-100/50 dark:border-gray-800/30">
                                <Calendar className="text-purple-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Time Slot</p>
                                    <p className="font-semibold text-sm">{timeSlot || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-xl border border-gray-100/50 dark:border-gray-800/30">
                                <Calendar className="text-orange-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Session Start</p>
                                    <p className="font-semibold text-sm">{sessionStart || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-xl border border-gray-100/50 dark:border-gray-800/30">
                                <Banknote className="text-amber-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Hourly Fee</p>
                                    <p className="font-bold text-sm text-black dark:text-gray-100">{hourlyFee} BDT / hr</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-xl border border-gray-100/50 dark:border-gray-800/30 sm:col-span-2">
                                <MapPin className="text-red-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Location</p>
                                    <p className="font-semibold text-sm">{location || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: SIDEBAR PRICING & BOOKING ACTION */}
                <div className="lg:sticky lg:top-24">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-800/60 space-y-6">
                        <div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">Tuition Fee</p>
                            <h3 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                                {hourlyFee} BDT <span className="text-sm font-normal text-gray-500">/ hour</span>
                            </h3>
                        </div>

                        <button
                            onClick={() => setIsBookModalOpen(true)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md shadow-indigo-100 dark:shadow-none hover:-translate-y-0.5"
                        >
                            Book Session Now
                        </button>

                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2.5 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <p>🎯 Verified Educational Background</p>
                            <p>⚡ Instant Booking Confirmation Request</p>
                            <p>💬 Integrated 24/7 Support Desk</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= EDIT MODAL COMPONENT ================= */}
            <div className="hidden">
                {/* <EditModalForm
                    isOpen={isEditOpen}
                    onOpenChange={setIsEditOpen}
                    destination={tutor}
                    id={id}
                /> */}
            </div>

            {/* ================= BOOK SESSION MODAL ================= */}
            {isBookModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100 dark:border-gray-800">
                        <button
                            onClick={() => setIsBookModalOpen(false)}
                            className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            <X size={18} />
                        </button>

                        <h3 className="text-xl font-bold mb-1">Book a Tuition Session</h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">Fill in your information to request a slot.</p>

                        <form className="space-y-4">
                            {/* Student Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Student Name *</label>
                                <div className="relative flex items-center">
                                    <User size={16} className="absolute left-3 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Phone Number *</label>
                                <div className="relative flex items-center">
                                    <Phone size={16} className="absolute left-3 text-gray-400" />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="e.g., +8801XXXXXXXXX"
                                        value={studentPhone}
                                        onChange={(e) => setStudentPhone(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Auto-filled Badge / Details Info */}
                            <div className="bg-gray-50 dark:bg-gray-850 rounded-xl p-3.5 border border-gray-100 dark:border-gray-800/60 text-xs space-y-2 mt-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 font-medium">Selected Tutor:</span>
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">{tutorName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 font-medium">Tutor ID:</span>
                                    <span className="font-mono text-gray-500">{id || _id || "N/A"}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 font-medium">Booking Status:</span>
                                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 rounded-full font-bold">Pending</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsBookModalOpen(false)}
                                    className="w-1/2 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-850 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition disabled:opacity-50"
                                >
                                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}