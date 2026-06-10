import { createAuthClient } from "better-auth/react";

// Auto-detect base URL for auth API routes (they're in this same Next.js project)
const getBaseUrl = () => {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getBaseUrl()
});

export default authClient;
