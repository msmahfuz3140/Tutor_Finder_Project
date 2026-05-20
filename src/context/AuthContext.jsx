"use client";

import { createContext, useContext, useEffect, useState } from "react";
import authClient from "../lib/auth-client";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync user state and loading state with Better Auth session hook
  const { data: session, isPending } = authClient.useSession();

  const createUser = async (email, password) => {
    setLoading(true);
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name: email.split("@")[0] // default placeholder name
    });
    if (error) {
      setLoading(false);
      throw new Error(error.message || "Registration failed");
    }
    return data;
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const { data, error } = await authClient.signIn.email({ email, password });
    if (error) {
      setLoading(false);
      throw new Error(error.message || "Login failed");
    }
    return data;
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: window.location.origin
    });
    if (error) {
      setLoading(false);
      throw new Error(error.message || "Google Authentication failed");
    }
    return data;
  };

  const logOut = async () => {
    setLoading(true);
    const { error } = await authClient.signOut();
    if (error) {
      setLoading(false);
      throw new Error(error.message || "Logout failed");
    }
  };

  const updateUserProfile = async (name, photoURL) => {
    const { data, error } = await authClient.updateUser({
      name,
      image: photoURL
    });
    if (error) {
      throw new Error(error.message || "Failed to update profile");
    }
    
    // Refresh user state manually to ensure responsiveness
    setUser(prev => prev ? { ...prev, displayName: name, photoURL } : null);
    return data;
  };

  useEffect(() => {
    const syncSession = async () => {
      if (session) {
        // Map Better Auth session properties to Firebase equivalents so other pages don't break
        const mappedUser = {
          uid: session.user.id,
          id: session.user.id,
          displayName: session.user.name,
          email: session.user.email,
          photoURL: session.user.image,
          ...session.user
        };
        setUser(mappedUser);

        // Fetch JWT from backend and store in client
        try {
          const response = await fetch("https://tutor-finder-project-server.vercel.app/jwt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: session.user.email })
          });
          const data = await response.json();
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
        } catch (err) {
          console.error("Error signing JWT with backend:", err);
        }
      } else {
        setUser(null);
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    if (!isPending) {
      syncSession();
    } else {
      setLoading(true);
    }
  }, [session, isPending]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
