import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { prisma } from "@/lib/prisma"

const hasDb = !!process.env.POSTGRES_PRISMA_URL

describe.skipIf(!hasDb)("Prisma ↔ Postgres connectivity", () => {
  beforeAll(async () => {
    // Ensure connection works before tests
    await prisma.$connect()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("can SELECT 1", async () => {
    const result = await prisma.$queryRawUnsafe<{ "?column?": number }[]>("SELECT 1")
    expect(result.length).toBeGreaterThan(0)
    expect(Object.values(result[0])[0]).toBe(1)
  })

  it("can insert and fetch a Note + Summary", async () => {
    const userId = "test_user_" + Date.now()

    // create note
    const note = await prisma.note.create({
      data: { userId, title: "Test title", body: "Test body" },
    })
    expect(note.id).toBeTruthy()

    // create summary
    const summary = await prisma.summary.create({
      data: {
        noteId: note.id,
        content: "Test summary",
        model: "test",
        tokensIn: 1,
        tokensOut: 2,
      },
    })
    expect(summary.id).toBeTruthy()

    // fetch back
    const found = await prisma.note.findUnique({
      where: { id: note.id },
      include: { summaries: true },
    })
    expect(found?.summaries[0]?.content).toBe("Test summary")

    // cleanup
    await prisma.summary.deleteMany({ where: { noteId: note.id } })
    await prisma.note.delete({ where: { id: note.id } })
  })
})
