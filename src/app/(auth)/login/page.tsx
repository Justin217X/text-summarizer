"use client"

import React from "react"
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import quillIcon from "../../../../public/quill-icon.png"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login attempt: ", {email, password, rememberMe});
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Login Form */}
            <div className="flex-1 bg-gray-200 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="flex text-center">
                    <Image
                      src={quillIcon}
                      height={150}
                      width={150}
                      alt=""
                    />
                    <div className="flex items-center text-gray-700 text-4xl">
                        Compendia
                    </div>
                </div>

                {/* Sign In Form */}
                <div className="space-y-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                        </label>
                        <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            id="email"
                            type="email"
                            placeholder="johndoe@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 w-full h-12 bg-white border-gray-200 text-gray-700 rounded-md"
                            required
                        />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 w-full h-12 bg-white border-gray-200 text-gray-700 rounded-md"
                            required
                        />
                        </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center space-x-2">
                        <input
                          id="remember"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="remember" className="text-sm text-gray-600">
                        Remember me
                        </label>
                    </div>

                    {/* Sign In Button */}
                    <button type="submit" className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-md">
                        Sign in
                    </button>
                    </form>

                    {/* Links */}
                    <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="#" className="text-black hover:underline font-medium">
                        Sign up
                        </a>
                    </p>
                    <a href="#" className="text-sm text-gray-600 hover:underline block">
                        Forgot Password
                    </a>
                    </div>

                    {/* Social Login */}
                    {/* <div className="pt-4">
                    <SocialLoginButtons />
                    </div> */}
                </div>
            </div>
            </div>


            {/* Right Side - Promotional Content */}
            <div className="flex-1 bg-black text-white flex items-center justify-center p-8 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-20 right-20 w-32 h-32 border border-gray-700 rotate-45 opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-2 h-20 bg-gray-700 rotate-12 opacity-30"></div>

                <div className="w-full max-w-lg space-y-8 relative z-10">
                {/* Large Logo */}
                {/* <div className="text-center">
                    <Image
                      src={quillIcon}
                      height={150}
                      width={150}
                      alt=""
                    />
                    <div className="flex items-center text-gray-700">
                        Compendia
                    </div>
                </div> */}

                {/* Welcome Section */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">Welcome to Compendia</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Join us and start summarizing your text today.
                    </p>
                    <p className="text-gray-400 text-sm">
                        More than 17k people joined us, it's your turn
                    </p>
                </div>

                {/* Promotional Card */}
                <div className="bg-gray-800 border-gray-700 p-6 space-y-4">
                    <h3 className="text-xl font-semibold text-white">
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                    {/* Profile Avatars */}
                    <div className="flex -space-x-2">
                        <img src="/images/profile-1.png" alt="User 1" className="w-8 h-8 rounded-full border-2 border-gray-800" />
                        <img src="/images/profile-2.png" alt="User 2" className="w-8 h-8 rounded-full border-2 border-gray-800" />
                        <img src="/images/profile-3.png" alt="User 3" className="w-8 h-8 rounded-full border-2 border-gray-800" />
                        <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-gray-800 flex items-center justify-center">
                            <span className="text-xs text-white">+2</span>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}