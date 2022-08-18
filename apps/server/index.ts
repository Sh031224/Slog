import cors from "cors";
import * as bodyParser from "body-parser";
import express from "express";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

export {};
