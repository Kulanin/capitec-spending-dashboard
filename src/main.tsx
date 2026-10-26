import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

async function enableMocking() {
  const shouldMock =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === "true";
  if (!shouldMock) return;

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
