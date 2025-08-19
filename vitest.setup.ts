// // vitest.setup.ts
// import 'dotenv/config'
// import { afterAll, beforeAll, vi } from 'vitest'

// // ──────────────────────────────────────────────────────────────────────────────
// // 1) Safety guards for DB env vars
// // ──────────────────────────────────────────────────────────────────────────────
// if (process.env.NODE_ENV === 'production') {
//   throw new Error('❌ Do not run tests with NODE_ENV=production.')
// }

// // Prefer a dedicated test database if provided
// if (process.env.POSTGRES_PRISMA_URL_TEST) {
//   process.env.POSTGRES_PRISMA_URL = process.env.POSTGRES_PRISMA_URL_TEST
// }

// // Best-effort check to avoid accidentally hitting a production DB
// const url = process.env.POSTGRES_PRISMA_URL || ''
// const looksLikeProd =
//   /vercel\.app|render\.com|aws|gcp|azure|prod|production/i.test(url) &&
//   !/localhost|127\.0\.0\.1/i.test(url)

// if (looksLikeProd) {
//   // If you truly need to test against a remote DB, set ALLOW_REMOTE_DB_FOR_TESTS=1
//   if (process.env.ALLOW_REMOTE_DB_FOR_TESTS !== '1') {
//     throw new Error(
//       `❌ POSTGRES_PRISMA_URL looks like a production/remote DB.\n` +
//         `   Refusing to run tests. Use POSTGRES_PRISMA_URL_TEST for a test database,\n` +
//         `   or set ALLOW_REMOTE_DB_FOR_TESTS=1 if you really know what you're doing.`,
//     )
//   }
// }

// // ──────────────────────────────────────────────────────────────────────────────
// /** 2) Polyfills */
// // ──────────────────────────────────────────────────────────────────────────────
// // Ensure fetch exists for Node env tests
// if (!(globalThis as any).fetch) {
//   // Node 18+ has global fetch; fallback only if missing
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   ;(globalThis as any).fetch = (await import('node-fetch')).default as any
// }

// // ──────────────────────────────────────────────────────────────────────────────
// // 3) Better Auth session mock (global helpers)
// //    - Tests can call globalThis.__setTestSession({ id, email, name })
// //    - Server code importing "@/lib/auth" will see this mocked session
// // ──────────────────────────────────────────────────────────────────────────────
// type TestUser = { id: string; email?: string; name?: string }
// let __currentSession: { user: TestUser } | null = null

// vi.mock('@/lib/auth', () => {
//   return {
//     auth: {
//       api: {
//         getSession: vi.fn(async (_opts?: any) => __currentSession),
//       },
//     },
//   }
// })

// // Global helpers for tests
// declare global {
//   // Set a fake logged-in user for any code that calls auth.api.getSession(...)
//   // Pass undefined/null to clear (become unauthenticated).
//   // Example: globalThis.__setTestSession({ id: 'user_1', email: 'u@test.com' })
//   //          globalThis.__clearTestSession()
//   // Create minimal headers that "look" authenticated at the middleware level.
//   // Example: const h = globalThis.withSessionHeaders()
//   //          route(GET/POST)({ headers: h })
//   // (Note: your tests can still vi.mock 'better-auth/cookies' explicitly if needed.)
//   // deno-lint-ignore no-var
//   var __setTestSession: (user?: TestUser | null) => void
//   // deno-lint-ignore no-var
//   var __clearTestSession: () => void
//   // deno-lint-ignore no-var
//   var withSessionHeaders: () => Headers
// }

// globalThis.__setTestSession = (user?: TestUser | null) => {
//   __currentSession = user ? { user } : null
// }
// globalThis.__clearTestSession = () => {
//   __currentSession = null
// }
// globalThis.withSessionHeaders = () => {
//   const h = new Headers()
//   // Your middleware may only check cookie presence (not validity).
//   // Adjust this cookie name if your middleware expects a specific one.
//   h.set('cookie', 'session=test; Path=/; HttpOnly')
//   return h
// }

// // ──────────────────────────────────────────────────────────────────────────────
// // 4) Optional: no-op mocks for Next.js cache helpers (avoid errors in unit tests)
// //    If you import revalidateTag/Path in unit tests, they’ll just be no-ops.
// //    Remove this block if you prefer to mock per-file instead.
// // ──────────────────────────────────────────────────────────────────────────────
// vi.mock('next/cache', async () => {
//   const mod = await vi.importActual<any>('next/cache').catch(() => ({}))
//   return {
//     ...mod,
//     revalidateTag: vi.fn(),
//     revalidatePath: vi.fn(),
//     unstable_cache: (...args: any[]) => args[0], // passthrough
//   }
// })

// // ──────────────────────────────────────────────────────────────────────────────
// // 5) Teardown: close Prisma if it was used
// //    We import lazily to avoid creating a client if tests never touch Prisma.
// // ──────────────────────────────────────────────────────────────────────────────
// afterAll(async () => {
//   try {
//     const mod = await import('./prisma') // Update this path if your Prisma client is in a different location, e.g., '../prisma' or './src/lib/prisma'
//     // Placeholder: prisma client not yet implemented
//     // Uncomment and update the import path when you add your prisma client file
//     // if (mod?.prisma?.$disconnect) {
//     //   await mod.prisma.$disconnect()
//     // }
//       await mod.prisma.$disconnect()
//     }
//   } catch {
//     // If prisma wasn't imported anywhere, nothing to do.
//   }
// })

// // (Optional) beforeAll hook: helpful log for clarity during CI
// beforeAll(() => {
//   if (process.env.POSTGRES_PRISMA_URL) {
//     // eslint-disable-next-line no-console
//     console.log('🧪 Using Prisma URL for tests:', process.env.POSTGRES_PRISMA_URL)
//   } else {
//     // eslint-disable-next-line no-console
//     console.log('🧪 No DB URL provided — DB integration tests will be skipped.')
//   }
// })
