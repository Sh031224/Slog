import "dotenv/config";
import { createConnection } from "typeorm";
import * as http from "http";
import app from "./app";
import logger from "./lib/logger";

const { PORT } = process.env;

createConnection()
  .then((connection) => {
    logger.green("[DB] Connection Success");
  })
  .catch((error) => logger.red("[DB] Connection Error", error.message));

http.createServer(app).listen(PORT || 8080, () => {
  logger.green(`[HTTP] Server is listening to ${PORT}`);
});
