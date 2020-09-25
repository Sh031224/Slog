const express = require("express");
const next = require("next");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use("/", express.static(path.join(__dirname, "../public")));

    server.get("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    require("greenlock-express")
      .init({
        packageRoot: "/root/blog_web",
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
