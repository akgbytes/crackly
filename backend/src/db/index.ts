import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../config/env";
import { sql } from "drizzle-orm";
import { logger } from "../config/logger";

const client = neon(env.DATABASE_URL!);
export const db = drizzle({ client });

export const connectDrizzle = async () => {
  try {
    await db.execute(sql`SELECT 1`);
    logger.info("Drizzle connected to the database");
  } catch (error: any) {
    logger.error("Drizzle failed to connect to the database", error.message);
    process.exit(1);
  }
};
