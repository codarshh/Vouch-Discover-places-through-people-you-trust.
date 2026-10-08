import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { Database } from '../types/database.js';
import { env } from './env.js';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
});

const dialect = new PostgresDialect({
  pool,
});

export const db = new Kysely<Database>({
  dialect,
});

/**
 * Close database connection pool gracefully.
 */
export const closeDatabase = async (): Promise<void> => {
  await db.destroy();
};
