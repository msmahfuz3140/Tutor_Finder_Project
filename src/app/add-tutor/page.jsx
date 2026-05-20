"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Swal from "sweetalert2";
import { FaUser, FaLink, FaBook, FaCalendar, FaClock, FaDollarSign, FaMapMarkerAlt, FaBriefcase, FaGraduationCap } from "react-icons/fa";

export default function AddTutorPage() {
    const { user } = useAuth();
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
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.title = "Add Tutor | MediQueue";
        if (user) {
            setTutorName(user.displayName || "");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subject || !teachingMode) {
            Swal.fire({
                title: "Validation Error",
                text: "Please select a subject and teaching mode.",
                icon: "warning",
                confirmButtonColor: "#4f46e5"
            });
            return;
        }

        setIsSubmitting(true);

        const tutorData = {
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
            location,
            creatorEmail: user?.email,
            creatorName: user?.displayName || "Tutor"
        };

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:4000/tutors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(tutorData)
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: "Success",
                    text: "Tutor profile added successfully!",
                    icon: "success",
                    confirmButtonColor: "#4f46e5"
                });
                setPhotoUrl("");
                setSubject("");
                setTeachingMode("");
                setAvailableDays("");
                setTimeSlot("");
                setSessionStart("");
                setTotalSlot("");
                setHourlyFee("");
                setInstitutionExperience("");
                setLocation("");
            } else {
                Swal.fire({
                    title: "Error",
                    text: data.error || "Failed to add tutor.",
                    icon: "error",
                    confirmButtonColor: "#4f46e5"
                });
            }
        } catch (error) {
            console.error("Error creating tutor:", error);
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again.",
                icon: "error",
                confirmButtonColor: "#4f46e5"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PrivateRoute>
            <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 py-12 px-4 transition-colors duration-250">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                            Add Tutor Profile
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                            Create a detailed professional tutor profile to start accepting booking requests.
                        </p>
                    </div>

                    {/* Card container */}
                    <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-xl p-8 md:p-10 transition-colors duration-250">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            {/* Section 1: Tutor Identity */}
                            <div className="space-y-5">
                                <h2 className="text-lg font-bold text-gray-855 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
                                    <FaGraduationCap className="text-indigo-500" />
                                    Tutor Identity
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Tutor Name</label>
                                        <div className="relative flex items-center">
                                            <FaUser className="absolute left-3.5 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. John Doe"
                                                value={tutorName}
                                                onChange={(e) => setTutorName(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Photo URL */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Photo URL</label>
                                        <div className="relative flex items-center">
                                            <FaLink className="absolute left-3.5 text-gray-400" />
                                            <input
                                                type="url"
                                                required
                                                placeholder="https://example.com/tutor.jpg"
                                                value={photoUrl}
                                                onChange={(e) => setPhotoUrl(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject Dropdown */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Subject / Category</label>
                                        <div className="relative flex items-center">
                                            <FaBook className="absolute left-3.5 text-gray-400" />
                                            <select
                                                required
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select Subject</option>
                                                {["Mathematics", "Physics", "Chemistry", "Biology", "ICT", "English", "Bangla", "Social Science", "Commerce"].map((sub) => (
                                                    <option key={sub} value={sub}>{sub}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Teaching Mode Dropdown */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Teaching Mode</label>
                                        <div className="relative flex items-center">
                                            <FaBriefcase className="absolute left-3.5 text-gray-400" />
                                            <select
                                                required
                                                value={teachingMode}
                                                onChange={(e) => setTeachingMode(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select Mode</option>
                                                {["Online", "Offline", "Both"].map((mode) => (
                                                    <option key={mode} value={mode}>{mode}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Availability & Schedules */}
                            <div className="space-y-5">
                                <h2 className="text-lg font-bold text-gray-855 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
                                    <FaCalendar className="text-emerald-500" />
                                    Availability & Slots
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Available Days */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Available Days</label>
                                        <div className="relative flex items-center">
                                            <FaCalendar className="absolute left-3.5 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Sat, Mon, Wed"
                                                value={availableDays}
                                                onChange={(e) => setAvailableDays(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-805 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Time Slot */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Available Time Slot</label>
                                        <div className="relative flex items-center">
                                            <FaClock className="absolute left-3.5 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. 4:00 PM - 6:00 PM"
                                                value={timeSlot}
                                                onChange={(e) => setTimeSlot(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Session Start Date */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Session Start Date</label>
                                        <input
                                            type="date"
                                            required
                                            value={sessionStart}
                                            onChange={(e) => setSessionStart(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white cursor-pointer"
                                        />
                                    </div>

                                    {/* Total Slots */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Slot Limit</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            placeholder="e.g. 10"
                                            value={totalSlot}
                                            onChange={(e) => setTotalSlot(e.target.value)}
                                            className="w-full px-4 py-2.5 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-805 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Professional Experience & Fees */}
                            <div className="space-y-5">
                                <h2 className="text-lg font-bold text-gray-855 dark:text-gray-200 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
                                    <FaDollarSign className="text-amber-500" />
                                    Tuition Details & Experience
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Hourly Fee */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Hourly Fee (BDT)</label>
                                        <div className="relative flex items-center">
                                            <FaDollarSign className="absolute left-3.5 text-gray-400" />
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                placeholder="e.g. 600"
                                                value={hourlyFee}
                                                onChange={(e) => setHourlyFee(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Location (City / Area)</label>
                                        <div className="relative flex items-center">
                                            <FaMapMarkerAlt className="absolute left-3.5 text-gray-400" />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Mirpur, Dhaka"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    {/* Institution Experience */}
                                    <div className="space-y-1.5 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Institution & Teaching Experience</label>
                                        <textarea
                                            required
                                            rows="4"
                                            placeholder="Describe your current educational institution, past tutoring experience, or relevant academic achievements..."
                                            value={institutionExperience}
                                            onChange={(e) => setInstitutionExperience(e.target.value)}
                                            className="w-full p-4 bg-gray-55 dark:bg-gray-855 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-655 hover:to-blue-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-indigo-100 dark:shadow-none disabled:opacity-50 transition"
                                >
                                    {isSubmitting ? "Adding Profile..." : "Add Tutor Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
}