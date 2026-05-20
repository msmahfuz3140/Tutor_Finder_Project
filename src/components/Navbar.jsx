"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Tutors", path: "/tutor" },
        { name: "Add Tutor", path: "/add-tutor" },
        { name: "My Tutors", path: "/my-tutor" },
        { name: "Booked Session", path: "/booked-session" },
    ];

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors">
            <div className="max-w-7xl mx-auto px-4">

                <div className="flex items-center justify-between h-16">


                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold">
                            TF
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                            Tutors-Finder
                        </h1>
                    </Link>

                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">


                        <button
                            onClick={() =>
                                setTheme(isDark ? "light" : "dark")
                            }
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>


                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/login"
                                className="px-3 py-1 border rounded-lg text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Register
                            </Link>
                        </div>


                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden text-gray-800 dark:text-white"
                        >
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>

                    </div>
                </div>
            </div>

            {open && (
                <div
                    className={`md:hidden shadow-lg border-t transition-colors
    ${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}
                >
                    <div className="flex flex-col px-6 py-4 gap-4">

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                onClick={() => setOpen(false)}
                                className={`font-medium transition
                                   ${isDark
                                        ? "text-gray-300 hover:text-blue-400"
                                        : "text-gray-700 hover:text-blue-600"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <button
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition
                               ${isDark
                                    ? "bg-gray-800 text-gray-200"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {isDark ? (
                                <>
                                    <Sun size={18} /> Light Mode
                                </>
                            ) : (
                                <>
                                    <Moon size={18} /> Dark Mode
                                </>
                            )}
                        </button>

                        <Link
                            href="/login"
                            onClick={() => setOpen(false)}
                            className={`px-4 py-2 rounded-lg text-center border transition
                               ${isDark
                                    ? "border-gray-700 text-gray-200 hover:bg-gray-800"
                                    : "border-gray-300 text-gray-800 hover:bg-gray-100"
                                }`}
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            onClick={() => setOpen(false)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 transition"
                        >
                            Register
                        </Link>

                    </div>
                </div>
            )}
        </nav>
    );
}