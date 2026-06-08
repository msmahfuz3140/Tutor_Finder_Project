// API Base URL - auto-detects production vs local
// On Vercel (deployed): uses the production backend URL
// Locally: uses localhost:4000, or set NEXT_PUBLIC_API_URL to override
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== "undefined" && window.location.hostname !== "localhost" 
    ? "https://tutor-finder-project-server.vercel.app" 
    : "http://localhost:4000");
