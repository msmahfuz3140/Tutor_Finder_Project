"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaLink } from "react-icons/fa";

function RegisterFormContent() {
    const { createUser, updateUserProfile, signInWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        document.title = "Register | MediQueue";
    }, []);

    const validatePassword = (pass) => {
        if (pass.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!/[A-Z]/.test(pass)) {
            return "Password must contain at least one uppercase letter.";
        }
        if (!/[a-z]/.test(pass)) {
            return "Password must contain at least one lowercase letter.";
        }
        return "";
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        const validationErr = validatePassword(password);
        if (validationErr) {
            setErrorMsg(validationErr);
            return;
        }

        setIsSubmitting(true);
        try {
            await createUser(email, password, name, photoUrl);

            Swal.fire({
                title: "Registration Successful!",
                text: "Please login to your account",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: "top-end"
            });
            router.push("/login");

        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Registration Failed",
                text: error.message || "Something went wrong.",
                icon: "error",
                confirmButtonColor: "#4f46e5"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignInWithGoogle = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
            });
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setErrorMsg(error.message || "Failed to sign in with Google");
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 py-12 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl p-8 transition-colors duration-200">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Create Account
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Register to start booking sessions
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            Full Name
                        </label>
                        <div className="relative flex items-center">
                            <FaUser className="absolute left-4 text-gray-400" />
                            <input
                                type="text"
                                required
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            Email Address
                        </label>
                        <div className="relative flex items-center">
                            <FaEnvelope className="absolute left-4 text-gray-400" />
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Photo URL */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            Photo URL
                        </label>
                        <div className="relative flex items-center">
                            <FaLink className="absolute left-4 text-gray-400" />
                            <input
                                type="url"
                                required
                                placeholder="https://example.com/photo.jpg"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <FaLock className="absolute left-4 text-gray-400" />
                            <input
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-850 border border-gray-200 dark:border-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Error display inside form */}
                    {errorMsg && (
                        <div className="text-xs text-red-500 font-bold bg-red-50 dark:bg-red-950/40 p-3 rounded-xl border border-red-100 dark:border-red-900">
                            ⚠️ {errorMsg}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-750 text-white font-semibold py-3.5 rounded-2xl transition duration-300 shadow-md shadow-indigo-100 dark:shadow-none disabled:opacity-50"
                    >
                        {isSubmitting ? "Registering..." : "Register"}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-gray-200 dark:border-gray-800 w-full"></div>
                    <span className="absolute bg-white dark:bg-gray-900 px-3 text-xs text-gray-400 font-semibold uppercase">
                        Or Register with
                    </span>
                </div>

                {/* Google Sign-in */}
                <button
                    onClick={handleSignInWithGoogle}
                    className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-850 py-3 rounded-2xl transition font-semibold text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                >
                    <FaGoogle className="text-red-500" />
                    Google Account
                </button>

                {/* Login Navigation */}
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-8">
                    Already have an account?{" "}
                    <Link
                        href={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
                        className="font-bold text-indigo-600 hover:text-indigo-750 dark:text-indigo-400"
                    >
                        Login Here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[85vh] flex justify-center items-center">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <RegisterFormContent />
        </Suspense>
    );
}
