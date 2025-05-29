import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import healthRoute from "./routes/healthCheck.routes";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middlewares/error.middlewares";

app.use("/api/v1/healthCheck", healthRoute);
app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);

export default app;
