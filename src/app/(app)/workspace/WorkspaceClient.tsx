"use client"
import { RouterProvider } from "@tanstack/react-router"
// import { router } from "@/routes"

export default function WorkspaceClient() {
  // CSR: runs in the browser only
  return <RouterProvider router={router} />
}
