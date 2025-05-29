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
    z
      .number({
        required_error: `PORT is required`,
        invalid_type_error: `PORT must be a number`,
      })
      .int(`PORT must be an integer`)
      .positive(`PORT must be a positive number`)
  ),

  DATABASE_URL: validURL("DATABASE_URL"),

  ACCESS_TOKEN_SECRET: nonEmptyString("ACCESS_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRY: nonEmptyString("ACCESS_TOKEN_EXPIRY"),
  REFRESH_TOKEN_SECRET: nonEmptyString("REFRESH_TOKEN_SECRET"),
  REFRESH_TOKEN_EXPIRY: nonEmptyString("REFRESH_TOKEN_EXPIRY"),

  CLOUDINARY_NAME: nonEmptyString("CLOUDINARY_NAME"),
  CLOUDINARY_API_KEY: nonEmptyString("CLOUDINARY_API_KEY"),
  CLOUDINARY_SECRET_KEY: nonEmptyString("CLOUDINARY_SECRET_KEY"),

  SERVER_URL: validURL("SERVER_URL"),
  CLIENT_URL: validURL("CLIENT_URL"),

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
