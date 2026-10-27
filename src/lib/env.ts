function required(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  enableMocks: import.meta.env.VITE_ENABLE_MOCKS === "true",
  apiBaseUrl:
    import.meta.env.VITE_ENABLE_MOCKS === "true"
      ? ""
      : required("VITE_API_URL"),
} as const;
