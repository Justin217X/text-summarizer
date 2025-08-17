"use client"

import React from "react"
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState("");

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Login Form */}
            <div className="bg-gray-50 flex flex-1 items-center justify-center p-8">
                <div className="w-full max-w-md">

                </div>
                d
            </div>

            {/* Right Side - Promo Content */}
            <div>
                Right
            </div>
        </div>
    )
}