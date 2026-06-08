"use client";

import { useState } from "react";
import {
    BookOpen,
    Video,
    Calendar,
    Banknote,
    ImageOff,
    ArrowLeft,
    User,
    Phone,
    X,
    MapPin
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { API_BASE_URL } from "@/lib/api";

export default function TutorDetailsCard({ tutor, id }) {
    const [isBookModalOpen, setIsBookModalOpen] = useState(false);
    const [imgError, setImgError] = useState(false);
    const { user } = useAuth();

    // Booking form states
    const [studentName, setStudentName] = useState(user?.displayName || "");
    const [studentPhone, setStudentPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        tutorName,
        subject,
        teachingMode,
        totalSlot,
        hourlyFee,
        photoUrl,
        availableDays,
        timeSlot,
        sessionStart,
        location,
        institutionExperience
    } = tutor || {};

    const handleOpenBookingModal = () => {
        // Validation before opening modal
        if (Number(totalSlot) <= 0) {
            Swal.fire({
                title: "Unavailable",
                text: "No available slots left.",
                icon: "warning",
                confirmButtonColor: "#4f46e5"
            });
            return;
        }

        const currentDateStr = new Date().toISOString().split("T")[0];
        if (sessionStart && currentDateStr < sessionStart) {
            Swal.fire({
                title: "Unavailable",
                text: "Booking is not available yet for this tutor.",
                icon: "warning",
                confirmButtonColor: "#4f46e5"
            });
            return;
        }

        setIsBookModalOpen(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!studentName || !studentPhone) {
            Swal.fire({
                title: "Error",
                text: "Please fill in all required fields.",
                icon: "error",
                confirmButtonColor: "#4f46e5"
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            const bookingData = {
                studentName,
                phone: studentPhone,
                studentEmail: user?.email || "student@example.com",
                tutorId: id || tutor?._id,
                tutorName,
                bookingStatus: "pending"
            };

            const res = await fetch(`${API_BASE_URL}/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(bookingData)
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: "Booked!",
                    text: "Session booked successfully!",
                    icon: "success",
                    confirmButtonColor: "#4f46e5"
                });
                setIsBookModalOpen(false);
                setStudentName("");
                setStudentPhone("");
                
                // Reload page to reflect updated slot count
                window.location.reload();
            } else {
                Swal.fire({
                    title: "Booking Failed",
                    text: data.error || "Failed to book session.",
                    icon: "error",
                    confirmButtonColor: "#4f46e5"
                });
            }
        } catch (error) {
            console.error("Booking error:", error);
            Swal.fire({
                title: "Error",
                text: "Something went wrong!",
                icon: "error",
                confirmButtonColor: "#4f46e5"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 min-h-screen pb-24 text-gray-800 dark:text-gray-100 transition-colors">

            {/* ================= NAV ACTIONS ================= */}
            <div className="max-w-7xl mx-auto px-4 pt-8">
                <Link href="/tutor">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition font-semibold text-sm">
                        <ArrowLeft size={16} />
                        Back to Tutors
                    </button>
                </Link>
            </div>

            {/* ================= HERO/IMAGE SECTION ================= */}
            <div className="max-w-7xl mx-auto px-4 mt-6">
                <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-150 to-gray-200 dark:from-gray-800 dark:to-gray-850">
                    {!imgError && photoUrl ? (
                        <Image
                            src={photoUrl}
                            alt={tutorName || "Tutor"}
                            fill
                            priority
                            className="object-cover"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center text-gray-400 dark:text-gray-500">
                            <ImageOff size={52} className="mb-2" />
                            <span className="text-sm font-semibold">Profile Image Not Available</span>
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    {/* Content Over Image */}
                    <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 text-white right-6">
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                            {tutorName || "Unknown Tutor"}
                        </h1>
                        <p className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold mt-3 uppercase tracking-wider">
                            {subject || "General"}
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= MAIN CONTENT GRID ================= */}
            <div className="max-w-7xl mx-auto px-4 mt-12 grid lg:grid-cols-3 gap-8 items-start">

                {/* LEFT: DETAILS & OVERVIEW */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Warnings Section */}
                    {Number(totalSlot) === 0 && (
                        <div className="bg-red-50 dark:bg-red-950/40 text-red-650 dark:text-red-400 p-5 rounded-2xl border border-red-150 dark:border-red-900/60 text-sm font-bold shadow-sm animate-pulse">
                            ⚠️ This session is fully booked. You can't join at the moment.
                        </div>
                    )}

                    <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800/80 rounded-3xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 text-[#4f46e5]">
                            Overview & Experience
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                            {institutionExperience || `${tutorName} is a professional tutor specializing in ${subject}. Committed to providing high-quality guidance tailored to each student's learning style, offering structured lessons to ensure academic growth.`}
                        </p>
                    </div>

                    {/* SPECIFICATIONS */}
                    <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800/80 rounded-3xl p-6 md:p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 text-[#4f46e5]">Tutor Specifications</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                                <BookOpen className="text-indigo-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Expertise Subject</p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-gray-250">{subject}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                                <Video className="text-blue-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Teaching Mode</p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-gray-250">{teachingMode}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                                <Calendar className="text-emerald-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Available Days</p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-gray-250">{availableDays || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                                <Calendar className="text-purple-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Time Slot</p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-gray-250">{timeSlot || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                                <Calendar className="text-orange-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Session Start Date</p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-gray-250">{sessionStart || "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800/40">
                                <Calendar className="text-pink-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Slots Left</p>
                                    <p className="font-bold text-sm text-gray-850 dark:text-gray-200">{totalSlot}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-850 rounded-2xl border border-gray-100 dark:border-gray-800/40 sm:col-span-2">
                                <MapPin className="text-red-500 shrink-0" size={20} />
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Location</p>
                                    <p className="font-bold text-sm text-gray-800 dark:text-gray-250">{location || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: SIDEBAR PRICING & BOOKING ACTION */}
                <div className="lg:sticky lg:top-24">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-6 border border-gray-150 dark:border-gray-800/80 space-y-6">
                        <div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Tuition Fee</p>
                            <h3 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                                {hourlyFee} BDT <span className="text-sm font-normal text-gray-500">/ hour</span>
                            </h3>
                        </div>

                        <button
                            onClick={handleOpenBookingModal}
                            disabled={Number(totalSlot) === 0}
                            className="w-full bg-indigo-600 hover:bg-indigo-750 disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-white py-3.5 rounded-2xl font-bold transition shadow-md shadow-indigo-150 dark:shadow-none"
                        >
                            Book Session Now
                        </button>

                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2.5 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <p>🎯 Verified Educational Background</p>
                            <p>⚡ Instant Booking Confirmation</p>
                            <p>💬 Dedicated Student Support Desk</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= BOOK SESSION MODAL ================= */}
            {isBookModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-gray-150 dark:border-gray-800">
                        <button
                            onClick={() => setIsBookModalOpen(false)}
                            className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            <X size={18} />
                        </button>

                        <h3 className="text-xl font-bold mb-1">Book a Tuition Session</h3>
                        <p className="text-xs text-gray-450 dark:text-gray-500 mb-6">Confirm your details to register a booking slot.</p>

                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            {/* Student Name */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Student Name *</label>
                                <div className="relative flex items-center">
                                    <User size={16} className="absolute left-3 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Your full name"
                                        value={studentName}
                                        onChange={(e) => setStudentName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-850 border border-gray-250 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Phone Number *</label>
                                <div className="relative flex items-center">
                                    <Phone size={16} className="absolute left-3 text-gray-400" />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+8801XXXXXXXXX"
                                        value={studentPhone}
                                        onChange={(e) => setStudentPhone(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-850 border border-gray-255 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Auto-filled details */}
                            <div className="bg-gray-55 dark:bg-gray-850 rounded-2xl p-4 border border-gray-150 dark:border-gray-800 text-xs space-y-2.5 mt-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 font-bold uppercase tracking-wider">Tutor Name:</span>
                                    <span className="font-bold text-gray-800 dark:text-gray-350">{tutorName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 font-bold uppercase tracking-wider">Tutor ID:</span>
                                    <span className="font-mono text-gray-500">{id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 font-bold uppercase tracking-wider">Student Email:</span>
                                    <span className="font-bold text-gray-800 dark:text-gray-350">{user?.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 font-bold uppercase tracking-wider">Status:</span>
                                    <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 rounded-full font-bold">Pending</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsBookModalOpen(false)}
                                    className="w-1/2 py-2.5 rounded-xl border border-gray-250 dark:border-gray-800 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-850 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-755 text-white text-sm font-bold transition disabled:opacity-50"
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