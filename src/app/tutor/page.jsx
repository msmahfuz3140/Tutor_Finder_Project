"use client";

import { useState, useEffect } from "react";
import TutorCard from "@/components/TutorCard";
import { Search, Calendar, RefreshCw } from "lucide-react";

export default function TutorsPage() {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchTutors = async (searchVal = "", startVal = "", endVal = "") => {
        setLoading(true);
        try {
            let url = `http://localhost:4000/tutors?`;
            const params = [];
            if (searchVal) params.push(`search=${encodeURIComponent(searchVal)}`);
            if (startVal) params.push(`startDate=${encodeURIComponent(startVal)}`);
            if (endVal) params.push(`endDate=${encodeURIComponent(endVal)}`);
            url += params.join("&");

            const res = await fetch(url, { cache: "no-store" });
            const data = await res.json();
            setTutors(data);
        } catch (error) {
            console.error("Error loading tutors:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Browse Tutors | MediQueue";
        fetchTutors();
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchTutors(search, startDate, endDate);
    };

    const handleReset = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
        fetchTutors("", "", "");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 min-h-screen">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    All Available Tutors
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                    Search and filter through all registered educators to schedule your learning sessions.
                </p>
            </div>

            {/* Search & Filter Controls */}
            <form onSubmit={handleSearchSubmit} className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Search Input */}
                <div className="space-y-1.5 col-span-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Search by Name</label>
                    <div className="relative flex items-center">
                        <Search size={16} className="absolute left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Type tutor's name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* Start Date */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Start Date</label>
                    <div className="relative flex items-center">
                        <Calendar size={16} className="absolute left-3 text-gray-400" />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* End Date */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">End Date</label>
                    <div className="relative flex items-center">
                        <Calendar size={16} className="absolute left-3 text-gray-400" />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 bg-gray-55 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* Buttons Row */}
                <div className="col-span-1 md:col-span-4 flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850 transition text-xs font-bold text-gray-700 dark:text-gray-300"
                    >
                        <RefreshCw size={14} />
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-750 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 dark:shadow-none transition"
                    >
                        Apply Filters
                    </button>
                </div>
            </form>

            {/* Tutors Grid */}
            {loading ? (
                <div className="min-h-[40vh] flex flex-col justify-center items-center gap-4">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm animate-pulse">Filtering tutors...</p>
                </div>
            ) : tutors.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                        No tutors found matching your filters.
                    </p>
                    <button
                        onClick={handleReset}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {tutors.map((tutor) => (
                        <TutorCard key={tutor._id || tutor.id} tutor={tutor} />
                    ))}
                </div>
            )}
        </div>
    );
}