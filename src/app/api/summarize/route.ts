import { NextResponse } from "next/server";

type SummaryType = "brief" | "detailed" | "bullet";

export async function POST(req: Request) {
    try {
        const { content, summaryType } = await req.json() as {
            content: string;
            summaryType: SummaryType;
        }

        if (!content || !summaryType) {
            return NextResponse.json({ error: "Missing content or summaryType"}, { status: 400 });
        }

        // 🔹 Mock summary generator (replace later with AI)
        const sentences = content
            .split(/[.!?]+/)
            .filter((s) => s.trim().length > 0);

        let summary = "";

        if (summaryType === "bullet") {
            summary = sentences.slice(0, 3).map((s) => `• ${s.trim()}`).join("\n");
        } else if (summaryType === "detailed") {
            summary = sentences.slice(0, 4).join(". ") + (sentences.length > 4 ? "..." : "");
        } else {
        // brief
            summary = sentences.slice(0, 2).join(". ") + (sentences.length > 2 ? "..." : "");
        }

        return NextResponse.json({ summary });

    } catch (error) {
        console.error("Summarize API error: ", error);
    }
}