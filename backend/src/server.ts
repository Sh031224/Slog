import "dotenv/config";
import { createConnection } from "typeorm";
import app from "./app";
import logger from "./lib/logger";

createConnection()
  .then((connection) => {
    logger.green("[DB] Connection Success");
  })
  .catch((error) => logger.red("[DB] Connection Error", error.message));

require("greenlock-express")
  .init({
    packageRoot: "/root/blog_server",
    configDor: "./greenlock.d",
    cluster: false,
    maintainerEmail: "1cktmdgh2@gmail.com"
  })
  .serve(app);
