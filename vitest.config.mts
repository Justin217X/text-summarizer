import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // Default environment: jsdom (for components, hooks)
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],

    include: ['src/tests/**/*.test.ts'],

    // Exclude build artifacts, configs, etc.
    exclude: [
      'node_modules',
      '.next',
      '.vercel',
      'dist',
      'build',
      'coverage',
      // 'prisma/migrations',
      'public',
      'src/styles',
      '**/*.config.{js,ts,mjs,mts,cjs,cts}',
      'playwright.config.ts',
    ],

    // Optionally enable threads for speed

    isolate: true,
  },
})
