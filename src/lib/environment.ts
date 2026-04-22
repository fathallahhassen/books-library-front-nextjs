export const environment = {
  production: process.env.NODE_ENV === 'production',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://gutendex.com',
  apiLocalDbUrl: process.env.NEXT_PUBLIC_API_LOCAL_DB_URL ?? 'http://localhost:3000',
} as const;