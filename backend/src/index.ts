import app from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { connectDrizzle } from "./db";

const PORT = env.PORT;

connectDrizzle();

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
