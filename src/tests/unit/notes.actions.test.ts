import { describe, it, expect, vi, beforeEach } from "vitest"

// SUT
import * as notesActions from "@/app/(app)/actions/notes"

// ─────────────────────────────────────────────
// 1) Mocks
// ─────────────────────────────────────────────
const prismaNoteCreate = vi.fn(async ({ data }) => ({ id: "note_123", ...data }))
const prismaNoteUpdate = vi.fn(async ({ where, data }) => ({ id: where.id, ...data }))
const prismaNoteDelete = vi.fn(async ({ where }) => ({ id: where.id }))
const prismaNoteFindFirst: ReturnType<typeof vi.fn> = vi.fn(async (): Promise<{ id: string; userId: string } | null> => ({ id: "note_123", userId: "user_123" }))

vi.mock("@/lib/prisma", () => ({
  prisma: {
    note: {
      create: (...args: any[]) => prismaNoteCreate(args[0]),
      update: (...args: any[]) => prismaNoteUpdate(args[0]),
      delete: (...args: any[]) => prismaNoteDelete(args[0]),
      findFirst: () => prismaNoteFindFirst(),
    },
  },
}))

// Better Auth session (default: logged in)
const getSession: ReturnType<typeof vi.fn> = vi.fn(async (): Promise<{ user: { id: string; email: string } } | null> => ({ user: { id: "user_123", email: "test@example.com" } }))
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession } },
}))

vi.mock("next/headers", () => ({
  headers: async () => new Headers(),
}))

const revalidateTag = vi.fn()
vi.mock("next/cache", () => ({ revalidateTag }))

// Validation schemas
vi.mock("@/validation/note", async () => {
  const z = await import("zod")
  return {
    NoteCreateSchema: z.object({
      title: z.string().min(1),
      body: z.string().min(1),
    }),
    NoteUpdateSchema: z.object({
      title: z.string().min(1).optional(),
      body: z.string().min(1).optional(),
    }),
  }
})

// ─────────────────────────────────────────────
// 2) Tests
// ─────────────────────────────────────────────
describe("Server Actions: notes CRUD", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    getSession.mockResolvedValue({ user: { id: "user_123", email: "test@example.com" } })
    prismaNoteFindFirst.mockResolvedValue({ id: "note_123", userId: "user_123" })
  })

  // CREATE
  it("createNote → returns { ok: true, note } on success", async () => {
    const fd = new FormData()
    fd.set("title", "My First Note")
    fd.set("body", "Hello world")

    const res = await notesActions.createNote(fd)
    expect(res.ok).toBe(true)
    // @ts-ignore
    expect(res.note).toMatchObject({
      id: "note_123",
      title: "My First Note",
      body: "Hello world",
      userId: "user_123",
    })
    expect(revalidateTag).toHaveBeenCalledWith("notes:user_123")
  })

  it("createNote → invalid input returns { ok: false }", async () => {
    const fd = new FormData()
    fd.set("title", "")
    fd.set("body", "")

    const res = await notesActions.createNote(fd)
    expect(res.ok).toBe(false)
  })

  it("createNote → unauthorized returns { ok: false }", async () => {
    getSession.mockResolvedValueOnce(null)
    const fd = new FormData()
    fd.set("title", "x")
    fd.set("body", "y")
    const res = await notesActions.createNote(fd)
    expect(res.ok).toBe(false)
  })

  // UPDATE
  it("updateNote → returns { ok: true, note } on success", async () => {
    const fd = new FormData()
    fd.set("title", "Updated Title")

    const res = await notesActions.updateNote("note_123", fd)
    expect(res.ok).toBe(true)
    // @ts-ignore
    expect(res.note).toMatchObject({ id: "note_123", title: "Updated Title" })
    expect(prismaNoteUpdate).toHaveBeenCalledWith({
      where: { id: "note_123", userId: "user_123" },
      data: { title: "Updated Title" },
    })
    expect(revalidateTag).toHaveBeenCalledWith("note:note_123")
    expect(revalidateTag).toHaveBeenCalledWith("notes:user_123")
  })

  it("updateNote → invalid input returns { ok: false }", async () => {
    const fd = new FormData()
    fd.set("title", "") // invalid (empty)
    const res = await notesActions.updateNote("note_123", fd)
    expect(res.ok).toBe(false)
  })

  it("updateNote → unauthorized returns { ok: false }", async () => {
    getSession.mockResolvedValueOnce(null)
    const fd = new FormData()
    fd.set("title", "Updated")
    const res = await notesActions.updateNote("note_123", fd)
    expect(res.ok).toBe(false)
  })

  it("updateNote → not found/ownership mismatch returns { ok: false }", async () => {
    prismaNoteFindFirst.mockResolvedValueOnce(null) // note not found or not owned
    const fd = new FormData()
    fd.set("title", "Updated")
    const res = await notesActions.updateNote("note_missing", fd)
    expect(res.ok).toBe(false)
  })

  // DELETE
  it("deleteNote → returns { ok: true } on success", async () => {
    const res = await notesActions.deleteNote("note_123")
    expect(res.ok).toBe(true)
    expect(prismaNoteDelete).toHaveBeenCalledWith({
      where: { id: "note_123", userId: "user_123" },
    })
    expect(revalidateTag).toHaveBeenCalledWith("note:note_123")
    expect(revalidateTag).toHaveBeenCalledWith("notes:user_123")
  })

  it("deleteNote → unauthorized returns { ok: false }", async () => {
    getSession.mockResolvedValueOnce(null)
    const res = await notesActions.deleteNote("note_123")
    expect(res.ok).toBe(false)
  })

  it("deleteNote → not found/ownership mismatch returns { ok: false }", async () => {
    prismaNoteFindFirst.mockResolvedValueOnce(null)
    const res = await notesActions.deleteNote("note_zzz")
    expect(res.ok).toBe(false)
  })
})
