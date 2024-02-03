import { Umzug } from "umzug";
import { db } from "@kysely/client";
import { execSync } from "child_process";
import dotenv from "dotenv";
import { PostgresStorage } from "./storage";

dotenv.config({
  path: ".env",
});

const context = {
  db,
} as const;

export const umzug = new Umzug({
  migrations: {
    glob: "./db/migrations/*.ts",
  },
  context,
  storage: new PostgresStorage(),
  logger: console,
});

umzug.on("migrated", () => {
  execSync("pnpm generate");
  process.exit(0);
});

umzug.on("reverted", () => {
  execSync("pnpm generate");
  process.exit(0);
});

export type Migration = typeof umzug._types.migration;

if (require.main === module) {
  umzug.runAsCLI();
}
