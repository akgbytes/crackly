import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";
import { logger } from "./logger";
import { NodeEnv } from "../utils/constants";

const validURL = (name: string) =>
  z
    .string({
      required_error: `${name} is required`,
      invalid_type_error: `${name} must be a valid URL string`,
    })
    .url(`${name} must be a valid URL`);

const nonEmptyString = (name: string) =>
  z
    .string({
      required_error: `${name} is required`,
      invalid_type_error: `${name} must be a string`,
    })
    .nonempty(`${name} cannot be empty`);

const envSchema = z.object({
  PORT: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: `PORT is required`,
      invalid_type_error: `PORT must be a number`,
    })
  ),

  DATABASE_URL: validURL("DATABASE_URL"),

  SERVER_URL: validURL("SERVER_URL"),
  CLIENT_URL: validURL("CLIENT_URL"),

  GEMINI_API_KEY: nonEmptyString("GEMINI_API_KEY"),
  GOOGLE_CLIENT_ID: nonEmptyString("GOOGLE_CLIENT_ID"),

  NODE_ENV: z.nativeEnum(NodeEnv, {
    errorMap: () => {
      return { message: "NODE_ENV must be 'development' or 'production" };
    },
  }),
});

const createEnv = (env: NodeJS.ProcessEnv) => {
  const result = envSchema.safeParse(env);

  if (!result.success) {
    const messages = result.error.errors
      .map((err) => `- ${err.message}`)
      .join("\n");

    logger.error(`Environment variable validation failed\n${messages}`);
    process.exit(1);
  }

  return result.data;
};

export const env = createEnv(process.env);
