"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
    >
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}