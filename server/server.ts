import cors from "cors";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import logger from "./lib/logger";
import api from "./api";
import express, { Request, Response } from "express";
import next from "next";
import admin from "firebase-admin";
const path = require("path");
const serviceAccount = require("../src/config/firebase.admin.json");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    createConnection()
      .then((connection) => {
        logger.green("[DB] Connection Success");
      })
      .catch((error) => logger.red("[DB] Connection Error", error.message));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use("/api", api);

    server.use("/api/static", express.static(path.join(__dirname, "./static")));
    server.use("/", express.static(path.join(__dirname, "../public")));

    server.get("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    require("greenlock-express")
      .init({
        packageRoot: "/root/blog_server",
        configDor: "../src/greenlock.d",
        cluster: false,
        maintainerEmail: "1cktmdgh2@gmail.com"
      })
      .serve(server);

    console.log("> Ready on http://localhost");
    console.log("> Ready on https://localhost");
  })
  .catch((ex: Error) => {
    console.error(ex.stack);
    process.exit(1);
  });

export {};
