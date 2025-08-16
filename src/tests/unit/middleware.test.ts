import { describe, it, expect, vi, beforeEach, Mock } from "vitest"

// SUT
import { middleware } from "@/app/middleware"

// ─────────────────────────────────────────────
// Minimal mock for NextRequest
// ─────────────────────────────────────────────
class MockRequest {
  headers = new Headers()
  nextUrl: URL
  url: string
  constructor(pathname: string, origin = "https://example.org") {
    this.nextUrl = new URL(pathname, origin)
    this.url = this.nextUrl.toString()
  }
}

// ─────────────────────────────────────────────
// Mock better-auth cookie helper
// ─────────────────────────────────────────────
const getSessionCookie: Mock<(req: any) => any> = vi.fn()
vi.mock("better-auth/cookies", () => ({
  getSessionCookie: (req: any) => getSessionCookie(req),
}))

// ─────────────────────────────────────────────
// Mock NextResponse
// ─────────────────────────────────────────────
const nextMock = vi.fn(() => ({ type: "next" }))
const redirectMock = vi.fn((url: URL) => ({ type: "redirect", location: url.toString() }))

vi.mock("next/server", async () => {
  const mod = await vi.importActual<any>("next/server")
  return {
    ...mod,
    NextResponse: {
      next: nextMock,
      redirect: redirectMock,
    },
  }
})

// ─────────────────────────────────────────────
// Tests
// ─────────────────────────────────────────────
describe("middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("redirects unauthenticated users to /sign-in", () => {
    getSessionCookie.mockReturnValueOnce(null)
    const req = new MockRequest("/app/workspace")

    // @ts-ignore (req shape is close enough for our middleware)
    const res = middleware(req)

    expect(res).toEqual({
      type: "redirect",
      location: "https://example.org/sign-in",
    })
    expect(redirectMock).toHaveBeenCalled()
  })

  it("allows authenticated users to continue", () => {
    getSessionCookie.mockReturnValueOnce({ value: "fake_session" })
    const req = new MockRequest("/app/workspace")

    // @ts-ignore
    const res = middleware(req)

    expect(res).toEqual({ type: "next" })
    expect(nextMock).toHaveBeenCalled()
  })

  it("ignores non-protected routes", () => {
    getSessionCookie.mockReturnValueOnce(null)
    const req = new MockRequest("/public-page")

    // @ts-ignore
    const res = middleware(req)

    expect(res).toEqual({ type: "next" })
  })
})
