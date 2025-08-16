import { describe, it, expect } from "vitest"
import * as authRoute from "@/app/(app)/api/auth/[...all]/route"

// ─────────────────────────────────────────────
// This is a smoke test — we just want to ensure
// the route is correctly wired and exports handlers.
// ─────────────────────────────────────────────
describe("Auth route wiring", () => {
  it("exports GET and POST handlers", () => {
    expect(typeof (authRoute as any).GET).toBe("function")
    expect(typeof (authRoute as any).POST).toBe("function")
  })
})
