import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '../types/database';
import dotenv from 'dotenv';
import path from 'path';

// Ensure env variables are loaded (useful for scripts running outside app.ts)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required in environment variables.');
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  })
});

export const db = new Kysely<Database>({
  dialect,
});
