// API Base URL - production by default, local for development
// On Vercel: just works automatically
// Locally: set NEXT_PUBLIC_API_URL=http://localhost:4000
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://tutor-finder-project-server.vercel.app";