import { env } from "./configs/env";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

import healthRoute from "./routes/healthCheck.routes";
// import sessionRoutes from "./routes/sessions.routes";
import { errorHandler } from "./middlewares/error.middlewares";

app.use("/api/v1/healthCheck", healthRoute);
// app.use("/api/v1/sessions", sessionRoutes);

app.use(errorHandler);

export default app;
