const production = process.env.NODE_ENV === 'production';
const apiLocalDbUrl = process.env.NEXT_PUBLIC_API_LOCAL_DB_URL;

if (production && !apiLocalDbUrl) {
    throw new Error('NEXT_PUBLIC_API_LOCAL_DB_URL must be configured in production');
}


export const environment = {
    production,
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://gutendex.com',
    apiLocalDbUrl: apiLocalDbUrl ?? 'http://localhost:3000',
} as const;

