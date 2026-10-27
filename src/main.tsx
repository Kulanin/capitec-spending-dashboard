import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { env } from "./lib/env";

async function enableMocking() {
  if (!env.enableMocks) {
    return;
  }
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledFrame: "warn" });
}

async function bootstrap() {
  try {
    await enableMocking();
  } catch (err) {
    console.error(
      "[bootstrap] MSW failed to start; continuing without mocks.",
      err,
    );
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void bootstrap();
