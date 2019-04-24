import { Pool } from 'pg';

declare function require(moduleName: string): any;

if (process.env.NODE_ENV !== "production") {
  // Used only in development to load environment variables from local file.
  const dotenv: any = require("dotenv");

  dotenv.config();
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 0,
});
