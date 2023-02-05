import "dotenv/config";
import * as bodyParser from "body-parser";
import cookies from "cookie-parser";
import cors from "cors";
import express from "express";
import admin from "firebase-admin";
import type { ServiceAccount } from "firebase-admin";

import config from "@/constants/firebase";
import controllers from "@/controllers";
import AppDataSource from "@/data-source";

import DatabaseMiddleware from "./middlewares/database-middleware";

const PORT = 3006;

const app = express();

app.use(cors({ credentials: true, origin: ["http://localhost:3002", "https://slog.website"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookies());

// get config file and initialize
admin.initializeApp({
  credential: admin.credential.cert(config as ServiceAccount)
});

const databaseMiddleware = new DatabaseMiddleware();

app.use("/api", databaseMiddleware.connect, controllers);

// for dev
if (process.env.NODE_ENV !== "production") {
  AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((error) => console.log(error));

  app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
  });
}

export default app;
