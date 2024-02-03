import { Migration } from "@kysely/migrator";

export const up: Migration = async (params) => {
  const db = params.context.db;

  await db.schema
    .alterTable("haiku")
    .alterColumn("photo_url", (col) => col.setDataType("text"))
    .execute();
};
export const down: Migration = async (params) => {
  const db = params.context.db;

  await db.schema
    .alterTable("haiku")
    .alterColumn("photo_url", (col) => col.setDataType("varchar(255)"))
    .execute();
};
