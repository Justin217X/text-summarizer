"use client"

import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: string,
    email: string,
    username?: string
}

type AuthContextType = {
    user: User | null,
    signup: (email: string, password: string, username?: string, rememberMe?: boolean) => Promise<void>,
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>,
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Load user from local storage on startup
    useEffect(() => {
        const savedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, [])

    async function signup(email: string, password: string, username?: string, rememberMe = false) {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, username }),
        })

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Signup failed");
        }

        const data = await res.json();
        setUser(data.user);
        if (rememberMe) {
            localStorage.setItem("user", JSON.stringify(data.user));
        } else {
            sessionStorage.setItem("user", JSON.stringify(data.user));
        }
    }

    async function login(email: string, password: string, rememberMe = false) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Login failed");
        }

        const data = await res.json();
        setUser(data.user);
        if (rememberMe) {
            localStorage.setItem("user", JSON.stringify(data.user));
        } else {
            sessionStorage.setItem("user", JSON.stringify(data.user));
        }
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}