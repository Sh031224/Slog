import cors from "cors";
import * as bodyParser from "body-parser";
import express, { type Request, type Response } from "express";
import { AppDataSource } from "./data-source";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return "";
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
    app.listen(PORT, () => {
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

export {};
