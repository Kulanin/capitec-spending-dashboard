import { useEffect } from "react";
import { env } from "../lib/env";

export function MSWKeepAlive() {
  useEffect(() => {
    if (!env.enableMocks) return;

    const wakeUpMSW = () => {
      if (navigator.serviceWorker?.controller) {
        navigator.serviceWorker.controller.postMessage("MOCK_ACTIVATE");
      }

      fetch("/msw-heartbeat").catch(() => {});
    };

    const interval = setInterval(wakeUpMSW, 20000);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        wakeUpMSW();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    wakeUpMSW();

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return null;
}
