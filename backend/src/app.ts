import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

import healthRoute from "./routes/healthCheck.route";
import interviewSetRoutes from "./routes/interviewSet.route";
import { errorHandler } from "./middlewares/error.middleware";
import { env } from "./configs/env";

app.use("/api/v1/health", healthRoute);
app.use("/api/v1/interview-set", interviewSetRoutes);

app.use(errorHandler);

export default app;
