module.exports = {
    darkMode: "class",
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                gray: {
                    55: "#f9fafb", // Very light off-white (gray-50)
                    150: "#f3f4f6", // Light gray (gray-100)
                    205: "#e5e7eb", // Standard border gray (gray-200)
                    250: "#e5e7eb", // Border gray (gray-200)
                    450: "#9ca3af", // Muted text gray (gray-400)
                    550: "#6b7280", // Muted text gray (gray-500)
                    650: "#4b5563", // Darker text gray (gray-600)
                    750: "#374151", // Muted dark text (gray-700)
                    805: "#1f2937", // Dark theme input border (gray-800)
                    850: "#1f2937", // Dark theme input background (gray-800)
                    855: "#111827", // Dark theme panel/card background (gray-900)
                },
                red: {
                    650: "#dc2626", // Alert red (red-600)
                },
                indigo: {
                    450: "#818cf8", // Theme indigo light (indigo-400)
                    655: "#4f46e5", // Theme indigo brand (indigo-600)
                    755: "#4338ca", // Theme indigo dark (indigo-700)
                }
            }
        },
    },
    plugins: [],
};