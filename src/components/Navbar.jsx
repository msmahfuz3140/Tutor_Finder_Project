"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logOut } = useAuth();
    const dropdownRef = useRef(null);

    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Tutors", path: "/tutor" },
    ];

    if (user) {
        navLinks.push(
            { name: "Add Tutor", path: "/add-tutor" },
            { name: "My Tutors", path: "/my-tutor" },
            { name: "My Booked Sessions", path: "/booked-session" }
        );
    }

    const handleLogout = async () => {
        try {
            await logOut();
            Swal.fire({
                title: "Logged Out",
                text: "Logout Successful",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
                toast: true,
                position: "top-end"
            });
            setDropdownOpen(false);
            setOpen(false);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-150 dark:border-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-3 py-1.5 rounded-xl font-bold tracking-wider shadow-md shadow-indigo-200 dark:shadow-none">
                            MQ
                        </div>
                        <h1 className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                            MediQueue
                        </h1>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-450 font-semibold transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Dark/Light Toggler */}
                        <button
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-850 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition"
                            aria-label="Toggle Theme"
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {/* User Action / Profile dropdown */}
                        <div className="hidden md:flex items-center gap-2">
                            {user ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition outline-none"
                                    >
                                        <img
                                            src={user.photoURL || "https://i.ibb.co/tPpV3k1/avatar.png"}
                                            alt={user.displayName || "User"}
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500"
                                            onError={(e) => {
                                                e.target.src = "https://i.ibb.co/tPpV3k1/avatar.png";
                                            }}
                                        />
                                        <ChevronDown size={14} className="text-gray-500" />
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2.5 w-56 bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-2xl shadow-xl py-2 z-50">
                                            <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                                                <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                                                    {user.displayName || "Tutor Booking User"}
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-gray-550 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <div className="p-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition font-medium"
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/login"
                                        className="px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-55 dark:hover:bg-gray-800 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-650 hover:to-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-100 dark:shadow-none transition"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle Button / Profile Trigger */}
                        {user ? (
                            <button
                                onClick={() => setOpen(!open)}
                                className="md:hidden p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition outline-none"
                            >
                                <img
                                    src={user.photoURL || "https://i.ibb.co/tPpV3k1/avatar.png"}
                                    alt={user.displayName || "User"}
                                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500"
                                    onError={(e) => {
                                        e.target.src = "https://i.ibb.co/tPpV3k1/avatar.png";
                                    }}
                                />
                            </button>
                        ) : (
                            <button
                                onClick={() => setOpen(!open)}
                                className="md:hidden p-2 text-gray-800 dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                {open ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className={`md:hidden border-t border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-inner`}>
                    <div className="flex flex-col px-6 py-5 gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                onClick={() => setOpen(false)}
                                className={`text-base font-semibold hover:text-indigo-600 dark:hover:text-indigo-400 transition text-gray-700 dark:text-gray-300`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {user ? (
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
                                <div className="flex items-center gap-3 px-1">
                                    <img
                                        src={user.photoURL || "https://i.ibb.co/tPpV3k1/avatar.png"}
                                        alt={user.displayName || "User"}
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500"
                                        onError={(e) => {
                                            e.target.src = "https://i.ibb.co/tPpV3k1/avatar.png";
                                        }}
                                    />
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                                            {user.displayName}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 dark:bg-red-950/20 text-red-650 hover:bg-red-100 rounded-xl transition text-sm font-bold"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <Link
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                    className="w-full py-2.5 text-center border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-850 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-850"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setOpen(false)}
                                    className="w-full py-2.5 text-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-650 hover:to-blue-700 text-white rounded-xl text-sm font-bold"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}