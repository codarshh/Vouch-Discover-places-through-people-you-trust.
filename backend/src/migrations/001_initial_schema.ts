import { Kysely, sql } from 'kysely';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  // users
  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('username', 'varchar', (col) => col.unique().notNull())
    .addColumn('email', 'varchar', (col) => col.unique().notNull())
    .addColumn('password_hash', 'varchar', (col) => col.notNull())
    .addColumn('profile_image_url', 'varchar')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema
    .createIndex('users_email_idx')
    .on('users')
    .column('email')
    .execute();
    
  await db.schema
    .createIndex('users_username_idx')
    .on('users')
    .column('username')
    .execute();

  // friendships
  await db.schema
    .createTable('friendships')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('requester_id', 'uuid', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('receiver_id', 'uuid', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('status', 'varchar', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addCheckConstraint('check_status', sql`status IN ('PENDING', 'ACCEPTED', 'REJECTED')`)
    .addCheckConstraint('check_different_users', sql`requester_id != receiver_id`)
    .addUniqueConstraint('unique_friendship', ['requester_id', 'receiver_id'])
    .execute();

  await db.schema
    .createIndex('friendships_requester_idx')
    .on('friendships')
    .column('requester_id')
    .execute();
    
  await db.schema
    .createIndex('friendships_receiver_idx')
    .on('friendships')
    .column('receiver_id')
    .execute();

  // places
  await db.schema
    .createTable('places')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('external_place_id', 'varchar', (col) => col.unique().notNull())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('address', 'varchar')
    .addColumn('latitude', 'double precision')
    .addColumn('longitude', 'double precision')
    .addColumn('category', 'varchar')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute();

  await db.schema
    .createIndex('places_external_place_id_idx')
    .on('places')
    .column('external_place_id')
    .execute();

  // visits
  await db.schema
    .createTable('visits')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('user_id', 'uuid', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('place_id', 'uuid', (col) => col.references('places.id').onDelete('cascade').notNull())
    .addColumn('visited_at', 'timestamp', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addUniqueConstraint('unique_user_place_visit', ['user_id', 'place_id'])
    .execute();

  await db.schema
    .createIndex('visits_user_id_idx')
    .on('visits')
    .column('user_id')
    .execute();
    
  await db.schema
    .createIndex('visits_place_id_idx')
    .on('visits')
    .column('place_id')
    .execute();

  // reviews
  await db.schema
    .createTable('reviews')
    .addColumn('id', 'uuid', (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('user_id', 'uuid', (col) => col.references('users.id').onDelete('cascade').notNull())
    .addColumn('place_id', 'uuid', (col) => col.references('places.id').onDelete('cascade').notNull())
    .addColumn('rating', 'integer', (col) => col.notNull())
    .addColumn('comment', 'text')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .addCheckConstraint('check_rating_range', sql`rating >= 1 AND rating <= 5`)
    .addUniqueConstraint('unique_user_place_review', ['user_id', 'place_id'])
    .execute();

  await db.schema
    .createIndex('reviews_user_id_idx')
    .on('reviews')
    .column('user_id')
    .execute();
    
  await db.schema
    .createIndex('reviews_place_id_idx')
    .on('reviews')
    .column('place_id')
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('reviews').execute();
  await db.schema.dropTable('visits').execute();
  await db.schema.dropTable('places').execute();
  await db.schema.dropTable('friendships').execute();
  await db.schema.dropTable('users').execute();
}
