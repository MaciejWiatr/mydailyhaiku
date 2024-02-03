import { Migration } from "../migrator";

export const up: Migration = async (params) => {
  const db = params.context.db;

  await db.schema
    .createTable("haiku")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("title", "varchar(255)")
    .addColumn("first_line", "varchar(255)")
    .addColumn("second_line", "varchar(255)")
    .addColumn("third_line", "varchar(255)")
    .addColumn("location", "varchar(255)")
    .addColumn("photo_url", "varchar(255)")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo("now()").notNull()
    )
    .execute();

  await db.schema
    .createTable("auth_user")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("github_id", "integer")
    .addColumn("username", "varchar(255)")
    .execute();

  await db.schema
    .createTable("user_session")
    .addColumn("id", "text", (col) => col.primaryKey())
    .addColumn("user_id", "text", (col) =>
      col.references("auth_user.id").notNull()
    )
    .addColumn("expires_at", "timestamptz", (col) => col.notNull())
    .execute();
};

export const down: Migration = async (params) => {
  const db = params.context.db;

  await db.schema.dropTable("haiku").execute();
  await db.schema.dropTable("user_session").execute();
  await db.schema.dropTable("auth_user").execute();
};
