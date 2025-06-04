import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../configs/env";
import { sql } from "drizzle-orm";
import { logger } from "../configs/logger";

const pool = new Pool({ connectionString: env.DATABASE_URL! });
export const db = drizzle(pool);

export const connectDrizzle = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    logger.info("Drizzle connected to the database");
  } catch (error: any) {
    logger.error("Drizzle failed to connect to the database", {
      message: error.message,
    });
    process.exit(1);
  }
};
