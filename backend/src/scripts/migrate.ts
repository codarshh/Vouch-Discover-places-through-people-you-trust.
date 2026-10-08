import * as path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';
import { promises as fs } from 'fs';
import {
  Kysely,
  PostgresDialect,
} from 'kysely';
import { Migrator, FileMigrationProvider, MigrationResult } from 'kysely/migration';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') }); // Root .env

async function migrateToLatest() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  });

  let error, results;

  if (process.argv[2] === 'down') {
    ({ error, results } = await migrator.migrateDown());
  } else {
    ({ error, results } = await migrator.migrateToLatest());
  }

  results?.forEach((it: MigrationResult) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
