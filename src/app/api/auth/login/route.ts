import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        return NextResponse.json({ user: { id: user.id, email: user.email, username: user.username } });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: "Something went wrong: login" }, { status: 500 });
    }
}