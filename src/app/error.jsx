"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorPage({ error, reset }) {
    useEffect(() => {
        document.title = "Application Error | MediQueue";
        console.error("Application runtime error:", error);
    }, [error]);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 py-12 px-4 transition-colors duration-250">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-2xl p-8 md:p-10 text-center space-y-6">
                
                {/* Error Icon */}
                <div className="mx-auto w-16 h-16 bg-amber-50 dark:bg-amber-955/20 rounded-2xl flex items-center justify-center text-amber-500">
                    <AlertTriangle size={36} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
                        Something went wrong!
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        An error occurred while loading this page. Our technical team has been notified.
                    </p>
                    {error?.message && (
                        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-xl text-left text-xs font-mono text-gray-650 dark:text-gray-400 break-words">
                            Error: {error.message}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="pt-2 flex gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-1/2 py-3 px-4 border border-gray-250 dark:border-gray-800 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-850 transition"
                    >
                        Reload Page
                    </button>
                    <button
                        onClick={() => reset()}
                        className="w-1/2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-indigo-100 dark:shadow-none transition flex items-center justify-center gap-1.5"
                    >
                        <RefreshCcw size={14} />
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
