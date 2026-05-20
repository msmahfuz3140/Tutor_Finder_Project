"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
    useEffect(() => {
        document.title = "Page Not Found | MediQueue";
    }, []);

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 py-12 px-4 transition-colors duration-250">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-150 dark:border-gray-800 shadow-2xl p-8 md:p-10 text-center space-y-6">
                
                {/* 404 Icon & Art */}
                <div className="relative mx-auto w-24 h-24 bg-red-50 dark:bg-red-950/20 rounded-3xl flex items-center justify-center text-red-500 dark:text-red-400">
                    <HelpCircle size={48} className="animate-bounce" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white font-extrabold text-xs px-2 py-0.5 rounded-full shadow-md animate-pulse">404</span>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Page Not Found
                    </h1>
                    <p className="text-gray-550 dark:text-gray-400 text-sm leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Back to Home Button */}
                <div className="pt-2">
                    <Link href="/">
                        <button className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-650 hover:to-blue-700 text-white rounded-2xl text-sm font-bold shadow-md shadow-indigo-100 dark:shadow-none transition flex items-center justify-center gap-2">
                            <ArrowLeft size={16} />
                            Back to Home
                        </button>
                    </Link>
                </div>

                <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800/80">
                    Need support? Contact our desk at info@mediqueue.com
                </div>
            </div>
        </div>
    );
}
