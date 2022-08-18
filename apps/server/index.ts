import cors from "cors";
import * as bodyParser from "body-parser";
import express from "express";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/v1", () => "test");

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

export {};
