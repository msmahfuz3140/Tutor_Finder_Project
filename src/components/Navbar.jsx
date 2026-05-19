"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Tutor", path: "/tutor" },
        { name: "Add Tutor", path: "/add-tutor" },
        { name: "My Tutor", path: "/my-tutor" },
        { name: "My Booked Session", path: "/booked-session" },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 text-white px-2 py-1 rounded font-bold">
                            TF
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">
                            Tutors-Finder
                        </h1>
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-gray-600 hover:text-blue-600 font-medium transition"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* AUTH BUTTON */}
                        <Link
                            href="/login"
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Register
                        </Link>
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden"
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {open && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="flex flex-col px-6 py-4 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                onClick={() => setOpen(false)}
                                className="text-gray-700 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            href="/login"
                            className="border px-4 py-2 rounded-lg text-center"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}