"use client"

import { createContext, useContext, useEffect, useState } from "react";

type User = {
    email: string,
    password: string,
    username?: string
}

type AuthContextType = {
    user: User | null,
    signup: (email: string, password: string, username?: string) => boolean,
    login: (email: string, password: string, remember: boolean) => boolean,
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
        // console.log("savedUser", savedUser);
    }, [])

    const signup = (email: string, password: string, username?: string) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        // prevent duplicate signup
        if (users.find((u: User) => u.email === email)) {
            alert("User already exists");
            return false;
        }

        const newUser: User = { email, password, username };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful, you can log in");
        return true;
    }

    const login = (email: string, password: string, remember: boolean) => {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        const existingUser = users.find(
            (u) => u.email === email && u.password === password
        );

        // user not found
        if (!existingUser) {
            alert("Invalid credentials");
            return false;
        }

        // persist session
        if (remember) {
            localStorage.setItem("user", JSON.stringify(existingUser));
        } else  {
            sessionStorage.setItem("user", JSON.stringify(existingUser));
        }

        setUser(existingUser);
        return true;
    }

    const logout = () => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context
}