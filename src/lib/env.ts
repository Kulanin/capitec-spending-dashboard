function required(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

const isMockingEnabled = import.meta.env.VITE_ENABLE_MOCKS !== "false";

export const env = {
  enableMocks: isMockingEnabled,
  apiBaseUrl: isMockingEnabled
    ? ""
    : required("VITE_API_URL"),
} as const;