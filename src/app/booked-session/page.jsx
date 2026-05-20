"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Swal from "sweetalert2";
import { Calendar, Trash2, BookOpen, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function BookedSessionsPage() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyBookings = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`https://tutor-finder-project-server.vercel.app/bookings?email=${encodeURIComponent(user.email)}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                },
                cache: "no-store"
            });
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (error) {
            console.error("Error loading bookings:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to load booking sessions.",
                icon: "error",
                confirmButtonColor: "#4f46e5"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "My Booked Sessions | MediQueue";
        fetchMyBookings();
    }, [user?.email]);

    // Handle Cancel Booking
    const handleCancelBooking = (bookingId) => {
        Swal.fire({
            title: "Cancel Booking?",
            text: "Are you sure you want to cancel this booking session?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, cancel booking"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                try {
                    const res = await fetch(`https://tutor-finder-project-server.vercel.app/bookings/${bookingId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({ status: "cancelled" })
                    });

                    if (res.ok) {
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Booking session has been cancelled.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                            toast: true,
                            position: "top-end"
                        });
                        // Update local state directly
                        setBookings(prev => prev.map(b => 
                            (b._id === bookingId || b.id === bookingId)
                                ? { ...b, bookingStatus: "cancelled" }
                                : b
                        ));
                    } else {
                        const data = await res.json();
                        Swal.fire({
                            title: "Failed",
                            text: data.error || "Failed to cancel booking.",
                            icon: "error",
                            confirmButtonColor: "#4f46e5"
                        });
                    }
                } catch (error) {
                    console.error("Cancel booking error:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                        confirmButtonColor: "#4f46e5"
                    });
                }
            }
        });
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "pending":
                return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40";
            case "approved":
            case "confirmed":
                return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40";
            case "cancelled":
                return "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/40";
            default:
                return "bg-gray-50 text-gray-700 dark:bg-gray-850 dark:text-gray-400 border border-gray-100 dark:border-gray-800";
        }
    };

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 py-12 px-4 transition-colors duration-250">
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                My Booked Sessions
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                View and manage scheduled learning sessions you have booked with expert tutors.
                            </p>
                        </div>
                        <button
                            onClick={fetchMyBookings}
                            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition text-xs font-bold text-gray-700 dark:text-gray-300"
                        >
                            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </div>

                    {/* Content table */}
                    {loading ? (
                        <div className="min-h-[50vh] flex flex-col justify-center items-center gap-4">
                            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 font-medium animate-pulse">Loading bookings...</p>
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center p-8 max-w-xl mx-auto">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                                <Calendar size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Sessions Booked</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-sm">
                                You haven't booked any learning sessions yet. Browse our verified tutors list and schedule your first session.
                            </p>
                            <Link href="/tutor">
                                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition">
                                    Browse Tutors
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-xl overflow-hidden transition-colors duration-250">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-850 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-150 dark:border-gray-800">
                                            <th className="py-4.5 px-6">Tutor Name</th>
                                            <th className="py-4.5 px-6">Student Name</th>
                                            <th className="py-4.5 px-6">Student Email</th>
                                            <th className="py-4.5 px-6">Status</th>
                                            <th className="py-4.5 px-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-150 dark:divide-gray-800 text-sm text-gray-700 dark:text-gray-300">
                                        {bookings.map((booking) => (
                                            <tr key={booking._id || booking.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-850/30 transition-colors">
                                                <td className="py-4.5 px-6 font-bold text-gray-900 dark:text-white">
                                                    {booking.tutorName || "Tutor Profile"}
                                                </td>
                                                <td className="py-4.5 px-6 font-semibold">
                                                    {booking.studentName}
                                                </td>
                                                <td className="py-4.5 px-6 font-mono text-xs text-gray-500">
                                                    {booking.studentEmail}
                                                </td>
                                                <td className="py-4.5 px-6">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${getStatusStyle(booking.bookingStatus)}`}>
                                                        {booking.bookingStatus}
                                                    </span>
                                                </td>
                                                <td className="py-4.5 px-6 text-right">
                                                    {booking.bookingStatus !== "cancelled" ? (
                                                        <button
                                                            onClick={() => handleCancelBooking(booking._id || booking.id)}
                                                            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-650 dark:bg-red-950/20 dark:hover:bg-red-950/40 dark:text-red-400 rounded-lg text-xs font-bold transition"
                                                            title="Cancel Booking"
                                                        >
                                                            <Trash2 size={13} />
                                                            Cancel Session
                                                        </button>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-gray-50 text-gray-400 dark:bg-gray-850 dark:text-gray-600 rounded-lg text-xs font-bold select-none">
                                                            <AlertCircle size={13} />
                                                            Cancelled
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PrivateRoute>
    );
}
