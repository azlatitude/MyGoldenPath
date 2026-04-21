export interface StoreMigration {
  fromVersion: number;
  toVersion: number;
  run: <T>(state: T) => T;
}

export const passthroughMigration = <T>(state: T): T => state;
