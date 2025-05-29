import express from "express";
import cors from "cors";

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

import healthRoute from "./routes/healthCheck.routes";
import { errorHandler } from "./middlewares/error.middlewares";

app.use("/api/v1/healthCheck", healthRoute);
app.use(errorHandler);

export default app;
