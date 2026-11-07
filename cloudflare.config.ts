import { bindings, defineConfig, defineWorker, triggers } from "@cloudflare/config";

export const appWorker = defineWorker({
  name: "hello-app",
  compatibilityDate: "2026-06-16",
  compatibilityFlags: ["nodejs_compat"],
  entrypoint: "./src/app-worker.ts",
  observability: { enabled: true },
});

export default defineConfig({
  worker: defineWorker({
    name: "hello-internet",
    compatibilityDate: "2026-06-16",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint: "./src/worker.ts",
    observability: {
      enabled: true,
    },
    env: {
      DB: bindings.d1({ name: "hello-internet-db" }),
      APP: bindings.worker({ worker: appWorker }),
    },
    triggers: [triggers.scheduled({ schedule: "* * * * *" })],
  }),
});