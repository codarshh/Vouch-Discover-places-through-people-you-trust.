import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve possible .env locations (root .env or local .env)
const possibleEnvPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(__dirname, '../../../.env'),
  path.resolve(__dirname, '../../.env'),
];

for (const envPath of possibleEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

// In test environment, provide safe fallbacks if not explicitly provided
if (process.env.NODE_ENV === 'test') {
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'postgres://friendplace:password@localhost:5432/friendplace_test';
  }
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'test_jwt_secret_key_minimum_length';
  }
  if (!process.env.FRONTEND_URL) {
    process.env.FRONTEND_URL = 'http://localhost:5173';
  }
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(5000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  FRONTEND_URL: z.string().min(1, 'FRONTEND_URL is required'),
  GOOGLE_PLACES_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errorDetails = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');
  console.error('❌ Environment configuration error:\n' + errorDetails);
  throw new Error('Invalid or missing environment variables');
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
