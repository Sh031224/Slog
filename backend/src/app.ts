import "dotenv/config";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import api from "./api";
import * as path from "path";
import * as admin from "firebase-admin";
const serviceAccount = require("./config/firebase.json");

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", api);
app.use("/public", express.static(path.join(__dirname, "../public")));

export default app;
