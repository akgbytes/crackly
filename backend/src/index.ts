import express from "express";
import { logger } from "./config/logger";
import { env } from "./config/env";

const app = express();
const PORT = env.PORT;

import healthRoute from "./routes/healthCheck.routes";
import { errorHandler } from "./middlewares/error.middlewares";

app.use("/api/v1/healthCheck", healthRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
