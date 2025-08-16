Perfect — let’s give your student a **plain-English tech stack description** that explains *why* each part is being used. You can drop this right into your `explanations/tech-stack.md`.

---

# 🛠 Tech Stack Overview

This project is built like a **production-ready SaaS app**. Every piece has a clear role:

---

### **1. Framework: Next.js (App Router)**

* **Why**: Modern React framework with built-in routing, server components, and full-stack capabilities.
* **How we use it**:

  * `(marketing)/` → Public marketing pages (static, fast, SEO-friendly).
  * `(app)/` → Authenticated app area (server-rendered with client “islands”).
  * **Server Actions** → Secure CRUD operations directly connected to the database.
  * **API Routes** → Special cases (like streaming summaries from the LLM).

---

### **2. Database: Vercel Postgres + Prisma**

* **Why**: Cloud-hosted, production-ready Postgres with zero setup; Prisma provides type-safe queries.
* **How we use it**:

  * Store user accounts, notes, summaries.
  * Prisma client handles queries like `prisma.note.findMany()` safely.
  * Easy schema changes with migrations.

---

### **3. Authentication: Better Auth**

* **Why**: Simpler, modern auth library with built-in session handling and Vercel compatibility.
* **How we use it**:

  * `auth.api.getSession()` runs server-side to check if user is logged in.
  * Middleware ensures only authenticated users can access `(app)/`.
  * Provides login, signup, and session management without custom boilerplate.

---

### **4. Client State & Routing**

* **TanStack React Query**

  * **Why**: Handles caching and syncing of server data on the client.
  * **How we use it**: Fetch notes, cache them, auto-refresh after CRUD actions.

* **TanStack Router**

  * **Why**: Stronger client-side routing inside the workspace area.
  * **How we use it**: Switch between `/notes`, `/notes/:id`, `/search`, etc. **without reloading**.

Together, they make the workspace feel like a **mini-SPA inside Next.js**.

---

### **5. LLM Summarization Endpoint**

* **Why**: Offload long-running tasks to an API route with streaming.
* **How we use it**:

  * `/api/summarize` calls the LLM provider.
  * Streams text chunks back to the client.
  * React Query updates the note’s summary in real-time.

---

### **6. Deployment: Vercel**

* **Why**: Seamless hosting for Next.js, built-in Postgres, edge runtime support.
* **How we use it**:

  * Marketing site benefits from edge caching (fast worldwide).
  * API + server actions run in Vercel Functions.
  * Automatic previews for every pull request.

---

### **7. Testing: Vitest**

* **Why**: Fast, modern test runner for TypeScript + React.
* **How we use it**:

  * Unit tests (middleware, auth).
  * Integration tests (server actions, DB connection).
  * The student just runs `npm test` to check correctness.

---

⚡ **Big Picture:**

* **Server Side (Next.js, Prisma, Better Auth)** → Secure, type-safe, reliable.
* **Client Side (React Query, TanStack Router)** → Fast, interactive, SPA-like.
* **Infra (Vercel + Postgres)** → Production hosting with minimal ops overhead.

---

Would you like me to **merge this with the pseudocode walkthrough** (so it reads like: *“file X does this using Y technology”*) or keep them as separate documents for clarity?
