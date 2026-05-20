"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Swal from "sweetalert2";
import { Edit3, Trash2, Plus, X, GraduationCap, Calendar, Clock, BookOpen, DollarSign, MapPin, Briefcase, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MyTutorsPage() {
    const { user } = useAuth();
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal states
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    // Form fields for updating
    const [tutorName, setTutorName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [subject, setSubject] = useState("");
    const [teachingMode, setTeachingMode] = useState("");
    const [availableDays, setAvailableDays] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [sessionStart, setSessionStart] = useState("");
    const [totalSlot, setTotalSlot] = useState("");
    const [hourlyFee, setHourlyFee] = useState("");
    const [institutionExperience, setInstitutionExperience] = useState("");
    const [location, setLocation] = useState("");

    const fetchMyTutors = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await fetch(`https://tutor-finder-project-server.vercel.app/tutors?email=${encodeURIComponent(user.email)}`, {
                cache: "no-store"
            });
            if (res.ok) {
                const data = await res.json();
                setTutors(data);
            }
        } catch (error) {
            console.error("Error loading tutors:", error);
            Swal.fire({
                title: "Error",
                text: "Failed to load tutors.",
                icon: "error",
                confirmButtonColor: "#4f46e5"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "My Tutors | MediQueue";
        fetchMyTutors();
    }, [user?.email]);

    // Handle Open Update Modal
    const handleOpenUpdateModal = (tutor) => {
        setSelectedTutor(tutor);
        setTutorName(tutor.tutorName || "");
        setPhotoUrl(tutor.photoUrl || "");
        setSubject(tutor.subject || "");
        setTeachingMode(tutor.teachingMode || "");
        setAvailableDays(tutor.availableDays || "");
        setTimeSlot(tutor.timeSlot || "");
        setSessionStart(tutor.sessionStart || "");
        setTotalSlot(tutor.totalSlot || "");
        setHourlyFee(tutor.hourlyFee || "");
        setInstitutionExperience(tutor.institutionExperience || "");
        setLocation(tutor.location || "");
        setIsUpdateModalOpen(true);
    };

    // Handle Submit Update
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedTutor) return;

        setIsUpdating(true);
        const token = localStorage.getItem("token");

        const updatedData = {
            tutorName,
            photoUrl,
            subject,
            teachingMode,
            availableDays,
            timeSlot,
            sessionStart,
            totalSlot: Number(totalSlot),
            hourlyFee: Number(hourlyFee),
            institutionExperience,
            location
        };

        try {
            const res = await fetch(`https://tutor-finder-project-server.vercel.app/tutors/${selectedTutor._id || selectedTutor.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: "Updated!",
                    text: "Tutor profile updated successfully.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                    toast: true,
                    position: "top-end"
                });

                // Update local state directly
                setTutors(prev => prev.map(t => 
                    (t._id === selectedTutor._id || t.id === selectedTutor.id) 
                        ? { ...t, ...updatedData } 
                        : t
                ));
                setIsUpdateModalOpen(false);
            } else {
                Swal.fire({
                    title: "Error",
                    text: data.error || "Failed to update tutor.",
                    icon: "error",
                    confirmButtonColor: "#4f46e5"
                });
            }
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonColor: "#4f46e5"
            });
        } finally {
            setIsUpdating(false);
        }
    };

    // Handle Delete Tutor
    const handleDeleteTutor = (tutorId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this tutor profile!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");
                try {
                    const res = await fetch(`https://tutor-finder-project-server.vercel.app/tutors/${tutorId}`, {
                        method: "DELETE",
                        headers: {
                            "authorization": `Bearer ${token}`
                        }
                    });

                    if (res.ok) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Tutor profile has been deleted.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                            toast: true,
                            position: "top-end"
                        });
                        // Update local state directly
                        setTutors(prev => prev.filter(t => t._id !== tutorId && t.id !== tutorId));
                    } else {
                        const data = await res.json();
                        Swal.fire({
                            title: "Failed",
                            text: data.error || "Failed to delete tutor.",
                            icon: "error",
                            confirmButtonColor: "#4f46e5"
                        });
                    }
                } catch (error) {
                    console.error("Delete error:", error);
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

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 py-12 px-4 transition-colors duration-250">
                <div className="max-w-7xl mx-auto space-y-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                My Registered Tutors
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                View, update, or remove the professional tutor profiles you have listed on the platform.
                            </p>
                        </div>
                        <Link href="/add-tutor">
                            <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-indigo-100 dark:shadow-none transition-all">
                                <Plus size={16} />
                                Add New Tutor
                            </button>
                        </Link>
                    </div>

                    {/* Table / List Section */}
                    {loading ? (
                        <div className="min-h-[50vh] flex flex-col justify-center items-center gap-4">
                            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-500 font-medium animate-pulse">Loading your tutors...</p>
                        </div>
                    ) : tutors.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center p-8 max-w-xl mx-auto">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                                <GraduationCap size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Tutors Listed Yet</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-sm">
                                You haven't added any tutor profiles to your account. Create your first listing to start accepting bookings.
                            </p>
                            <Link href="/add-tutor">
                                <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition">
                                    Create Tutor Profile
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-xl overflow-hidden transition-colors duration-250">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-850 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-gray-150 dark:border-gray-800">
                                            <th className="py-4.5 px-6">Tutor Info</th>
                                            <th className="py-4.5 px-6">Subject</th>
                                            <th className="py-4.5 px-6">Fee / Hour</th>
                                            <th className="py-4.5 px-6">Slots Available</th>
                                            <th className="py-4.5 px-6">Teaching Mode</th>
                                            <th className="py-4.5 px-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-150 dark:divide-gray-800 text-sm text-gray-700 dark:text-gray-300">
                                        {tutors.map((tutor) => (
                                            <tr key={tutor._id || tutor.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-850/30 transition-colors">
                                                <td className="py-4 px-6 flex items-center gap-3">
                                                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shrink-0">
                                                        <Image
                                                            src={tutor.photoUrl || "https://i.ibb.co/tPpV3k1/avatar.png"}
                                                            alt={tutor.tutorName || "Tutor"}
                                                            fill
                                                            sizes="48px"
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{tutor.tutorName}</p>
                                                        <p className="text-xs text-gray-450 dark:text-gray-500 line-clamp-1">{tutor.location}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400">
                                                        {tutor.subject}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 font-semibold text-gray-850 dark:text-gray-200">
                                                    {tutor.hourlyFee} BDT
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`font-semibold ${Number(tutor.totalSlot) === 0 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                                        {tutor.totalSlot}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 font-medium">
                                                    {tutor.teachingMode}
                                                </td>
                                                <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleOpenUpdateModal(tutor)}
                                                        className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-indigo-50 dark:bg-gray-800 dark:hover:bg-indigo-950/30 text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition"
                                                        title="Edit Profile"
                                                    >
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTutor(tutor._id || tutor.id)}
                                                        className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-red-50 dark:bg-gray-800 dark:hover:bg-red-950/30 text-gray-600 hover:text-red-650 dark:text-gray-300 dark:hover:text-red-400 transition"
                                                        title="Delete Listing"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
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

            {/* ================= UPDATE MODAL ================= */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full my-8 p-6 md:p-8 shadow-2xl relative border border-gray-150 dark:border-gray-800">
                        {/* Close button */}
                        <button
                            onClick={() => setIsUpdateModalOpen(false)}
                            className="absolute top-5 right-5 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                        >
                            <X size={18} />
                        </button>

                        <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">Edit Tutor Profile</h3>
                        <p className="text-xs text-gray-450 dark:text-gray-500 mb-6">Modify the tutor listing details below. Changes reflect instantly.</p>

                        <form onSubmit={handleUpdateSubmit} className="space-y-6">
                            
                            {/* Grid container */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 pb-2">
                                {/* Name */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Tutor Name *</label>
                                    <div className="relative flex items-center">
                                        <GraduationCap size={16} className="absolute left-3 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={tutorName}
                                            onChange={(e) => setTutorName(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Photo URL */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Photo URL *</label>
                                    <div className="relative flex items-center">
                                        <LinkIcon size={16} className="absolute left-3 text-gray-400" />
                                        <input
                                            type="url"
                                            required
                                            value={photoUrl}
                                            onChange={(e) => setPhotoUrl(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Subject *</label>
                                    <select
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white cursor-pointer"
                                    >
                                        {["Mathematics", "Physics", "Chemistry", "Biology", "ICT", "English", "Bangla", "Social Science", "Commerce"].map((sub) => (
                                            <option key={sub} value={sub}>{sub}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Teaching Mode */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Teaching Mode *</label>
                                    <select
                                        required
                                        value={teachingMode}
                                        onChange={(e) => setTeachingMode(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white cursor-pointer"
                                    >
                                        {["Online", "Offline", "Both"].map((mode) => (
                                            <option key={mode} value={mode}>{mode}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Available Days */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Available Days *</label>
                                    <div className="relative flex items-center">
                                        <Calendar size={16} className="absolute left-3 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={availableDays}
                                            onChange={(e) => setAvailableDays(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Time Slot */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Time Slot *</label>
                                    <div className="relative flex items-center">
                                        <Clock size={16} className="absolute left-3 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={timeSlot}
                                            onChange={(e) => setTimeSlot(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Session Start Date */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Session Start Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={sessionStart}
                                        onChange={(e) => setSessionStart(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white cursor-pointer"
                                    />
                                </div>

                                {/* Total Slot */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Total Slot Limit *</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={totalSlot}
                                        onChange={(e) => setTotalSlot(e.target.value)}
                                        className="w-full px-3 py-2 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                    />
                                </div>

                                {/* Hourly Fee */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Hourly Fee (BDT) *</label>
                                    <div className="relative flex items-center">
                                        <DollarSign size={16} className="absolute left-3 text-gray-400" />
                                        <input
                                            type="number"
                                            required
                                            min="0"
                                            value={hourlyFee}
                                            onChange={(e) => setHourlyFee(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Location *</label>
                                    <div className="relative flex items-center">
                                        <MapPin size={16} className="absolute left-3 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                {/* Institution & Experience */}
                                <div className="space-y-1 md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400">Institution & Teaching Experience *</label>
                                    <textarea
                                        required
                                        rows="3"
                                        value={institutionExperience}
                                        onChange={(e) => setInstitutionExperience(e.target.value)}
                                        className="w-full p-3 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-xl text-sm outline-none focus:border-indigo-500 transition text-gray-900 dark:text-white resize-none"
                                    />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsUpdateModalOpen(false)}
                                    className="w-1/2 py-2.5 rounded-xl border border-gray-250 dark:border-gray-800 text-sm font-bold hover:bg-gray-55 dark:hover:bg-gray-850 transition text-gray-700 dark:text-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition disabled:opacity-50"
                                >
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </PrivateRoute>
    );
}
