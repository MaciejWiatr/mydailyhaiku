import { DB } from "./types";
import { Pool } from "pg";
import { CamelCasePlugin, Kysely, PostgresDialect, sql } from "kysely";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const dialect = new PostgresDialect({
  pool: pgPool,
});

export const db = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
  log: ["query", "error"],
});

export const createMigrationsTable = async () => {
  const exists = sql`SELECT to_regclass('schema_name.table_name')`.execute(db);

  console.log(exists);
};
