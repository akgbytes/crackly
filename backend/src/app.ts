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
import aiRoutes from "./routes/ai.routes";
import sessionRoutes from "./routes/sessions.routes";
import questionsRoutes from "./routes/questions.routes";
import { errorHandler } from "./middlewares/error.middlewares";
import { env } from "./configs/env";

app.use("/api/v1/healthCheck", healthRoute);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/sessions", sessionRoutes);
app.use("/api/v1/questions", questionsRoutes);
app.use(errorHandler);

export default app;
