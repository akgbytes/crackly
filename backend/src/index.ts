import app from "./app";
import { env } from "./configs/env";
import { logger } from "./configs/logger";
import { connectDrizzle } from "./db";

const PORT = env.PORT;

connectDrizzle();

app.listen(8080, () => {
  logger.info(`Server running on port ${PORT}`);
});
