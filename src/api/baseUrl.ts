const ENABLE_MOCKS =
  import.meta.env.VITE_ENABLE_MOCKS === "true";

export const API_BASE_URL = ENABLE_MOCKS
  ? ""
  : import.meta.env.VITE_API_URL || "";
