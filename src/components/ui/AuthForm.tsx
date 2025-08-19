"use client"

import React from "react"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Mail, Lock, User } from "lucide-react"
import Image from "next/image";
import quillIcon from "../../../public/quill-icon.png"

type FormInputs = {
  email: string
  password: string
  confirmPassword?: string // only used for signup
  username?: string        // only used for signup
  rememberMe?: boolean     // only used for login
}

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormInputs>()

  const passwordValue = watch("password");

   const onSubmit = (data: FormInputs) => {
    if (mode === "login") {
      console.log("Logging in:", data)
      // TODO: call login API
    } else {
      console.log("Signing up:", data)
      // TODO: call signup API
    }
    // pass `data.rememberMe` to backend/session logic

    // wipe fields
    reset();
  }

  return (
    <div className="flex-1 bg-gray-200 flex items-center justify-center p-8 min-h-screen">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center text-center">
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
          <h1 className="text-2xl font-semibold text-gray-900">
            {mode === "login" ? "Sign In" : "Sign Up"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username (signup only) */}
            {mode === "signup" && (
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="username"
                    placeholder="johndoe"
                    {...register("username", { required: "Username is required" })}
                    className="pl-10 w-full h-12 bg-white border-gray-200 text-gray-700 rounded-md"
                  />
                </div>
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
              </div>
            )}


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
                  {...register("email", { required: "Email is required" })}
                  className="pl-10 w-full h-12 bg-white border-gray-200 text-gray-700 rounded-md"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
                  {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min length is 6" },
                  })}
                  className="pl-10 w-full h-12 bg-white border-gray-200 text-gray-700 rounded-md"
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Confirm Password (signup only) */}
            {mode === "signup" && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter Password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match",
                    })}
                    className="pl-10 w-full h-12 bg-white border-gray-200 text-gray-700 rounded-md"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>
            )}


            {/* Remember Me */}
            {mode === "login" && (
            <div className="flex items-center space-x-2">
              <input
                id="rememberMe"
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            )}


            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 bg-black hover:bg-gray-800 text-white rounded-md"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </form>


          {/* Form Change Toggle */}
          <div className="text-center space-y-2">
            {mode === "login" ? (
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-black hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-black hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
            <button
              onClick={() => alert("Forgot password flow coming soon")}
              className="text-sm text-gray-600 hover:underline block"
            >
              Forgot Password
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}