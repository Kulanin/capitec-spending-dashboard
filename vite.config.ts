import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { msw } from "msw/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), msw()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        // Infrastructure & Config (Not business logic)
        "src/api/http.ts",
        "src/api/baseUrl.ts",
        "src/lib/env.ts",
        "src/main.tsx",
        "src/App.tsx",
        "src/utils/queryKeys.ts",
        "src/api/client.ts",
        "src/utils/iconMapper.tsx",

        // Mock Data & Handlers (Test utilities, not production code)
        "src/api/mockData.ts",
        "src/api/handlers.ts",
        "src/mocks/**",

        // TypeScript Interfaces
        "src/types/**",

        // Test files
        "src/**/*.test.ts",
        "src/**/*.test.tsx",
      ],
    },
  },
});
