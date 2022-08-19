import cors from "cors";
import * as bodyParser from "body-parser";
import express from "express";
import controllers from "./controllers";
import { AppDataSource } from "./data-source";

const PORT = 3006;

const app = express();

app.use(cors({ credentials: true, origin: ["http://localhost:3002", "https://slog.website"] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(controllers);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});

module.exports = app;
