"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

function LoginFormContent() {
    const { signIn, signInWithGoogle } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirect") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.title = "Login | MediQueue";
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await signIn(email, password);
            Swal.fire({
                title: "Welcome Back!",
                text: "Login Successful",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: "top-end"
            });
            router.push(redirectUrl);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: error.message || "Invalid credentials. Please try again.",
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
                provider: "google"
            });
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError("Failed to sign in with Google");
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 py-12 px-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl p-8 transition-colors duration-200">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Sign in to manage your bookings and tutors
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
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

                    {/* Password */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => Swal.fire({
                                    title: "Forget Password",
                                    text: "Forget password method is not implemented for examiners' convenience.",
                                    icon: "info",
                                    confirmButtonColor: "#4f46e5"
                                })}
                                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                            >
                                Forgot Password?
                            </button>
                        </div>
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-750 text-white font-semibold py-3.5 rounded-2xl transition duration-300 shadow-md shadow-indigo-100 dark:shadow-none disabled:opacity-50"
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6 flex items-center justify-center">
                    <div className="border-t border-gray-200 dark:border-gray-800 w-full"></div>
                    <span className="absolute bg-white dark:bg-gray-900 px-3 text-xs text-gray-400 font-semibold uppercase">
                        Or continue with
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

                {/* Register Navigation */}
                <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-8">
                    Don't have an account?{" "}
                    <Link
                        href={`/register?redirect=${encodeURIComponent(redirectUrl)}`}
                        className="font-bold text-indigo-600 hover:text-indigo-750 dark:text-indigo-400"
                    >
                        Register Now
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[85vh] flex justify-center items-center">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <LoginFormContent />
        </Suspense>
    );
}
