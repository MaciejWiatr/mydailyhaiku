import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AppliedMigrations {
  id: Generated<number>;
  name: string;
  timestamp: Generated<Timestamp>;
}

export interface AuthUser {
  githubId: number | null;
  id: string;
  username: string | null;
}

export interface Haiku {
  createdAt: Generated<Timestamp>;
  firstLine: string | null;
  id: Generated<number>;
  location: string | null;
  photoUrl: string | null;
  secondLine: string | null;
  thirdLine: string | null;
  title: string | null;
}

export interface UserSession {
  expiresAt: Timestamp;
  id: string;
  userId: string;
}

export interface DB {
  appliedMigrations: AppliedMigrations;
  authUser: AuthUser;
  haiku: Haiku;
  userSession: UserSession;
}
