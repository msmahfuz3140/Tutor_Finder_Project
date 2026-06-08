"use client";

import { use, useState, useEffect } from "react";
import TutorDetailsCard from "@/components/TutorDetailsCard";
import PrivateRoute from "@/components/PrivateRoute";
import { API_BASE_URL } from "@/lib/api";

export default function TutorsDetailsPage({ params }) {
    const { id } = use(params);
    const [tutor, setTutor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Tutor Details | MediQueue";

        const fetchTutor = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/tutors/${id}`, {
                    cache: "no-store"
                });
                if (res.ok) {
                    const data = await res.json();
                    setTutor(data);
                }
            } catch (error) {
                console.error("Error fetching tutor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutor();
    }, [id]);

    return (
        <PrivateRoute>
            {loading ? (
                <div className="min-h-[70vh] flex flex-col justify-center items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading tutor details...</p>
                </div>
            ) : tutor ? (
                <TutorDetailsCard tutor={tutor} id={id} />
            ) : (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                    Tutor not found.
                </div>
            )}
        </PrivateRoute>
    );
}