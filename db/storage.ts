import { UmzugStorage } from "umzug";
import { pgPool } from "./client";

export class PostgresStorage implements UmzugStorage {
  private pool = pgPool;

  async executed(): Promise<string[]> {
    await this.init();

    const res = await this.pool.query(`
      SELECT name FROM applied_migrations ORDER BY timestamp;
    `);

    return res.rows.map((row) => row.name);
  }

  async logMigration({ name }: { name: string }): Promise<void> {
    await this.init();

    await this.pool.query(
      `
      INSERT INTO applied_migrations (name) VALUES ($1);
    `,
      [name]
    );
  }

  async unlogMigration({ name }: { name: string }): Promise<void> {
    await this.init();

    await this.pool.query(
      `
      DELETE FROM applied_migrations WHERE name = $1;
    `,
      [name]
    );
  }

  async init() {
    const client = await this.pool.connect();

    try {
      const res = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE  table_schema = 'public' 
          AND    table_name   = 'applied_migrations'
        );
      `);

      if (!res.rows[0].exists) {
        await client.query(`
          CREATE TABLE applied_migrations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);
      }
    } finally {
      client.release();
    }
  }
}
