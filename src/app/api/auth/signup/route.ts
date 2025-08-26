import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { email, password, username } = await req.json();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Default username to before @ in email if not provided
        const finalUsername = username || email.split("@")[0];

        // Create User
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username: finalUsername,
            },
        });

        return NextResponse.json({ user: { id: user.id, email: user.email, username: user.username } });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong: login" }, { status: 500 });
    }
}