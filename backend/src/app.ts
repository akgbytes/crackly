import { env } from "./configs/env";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import healthRoute from "./routes/healthCheck.routes";
import authRoutes from "./routes/auth.routes";
import sessionRoutes from "./routes/sessions.routes";
import { errorHandler } from "./middlewares/error.middlewares";

app.use("/api/v1/healthCheck", healthRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sessions", sessionRoutes);

app.use(errorHandler);

export default app;
