function required(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  apiBaseUrl: import.meta.env.PROD
    ? required('VITE_API_AWS_URL')
    : import.meta.env.VITE_API_LOCAL_URL ?? 'http://localhost:8080',
} as const;