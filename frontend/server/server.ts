const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    const serviceWorkers = [
      {
        filename: "firebase-messaging-sw.js",
        path: "./public/firebase-messaging-sw.js"
      }
    ];

    serviceWorkers.forEach(({ filename, path }) => {
      server.get(`/${filename}`, (req: Request, res: Response) => {
        app.serveStatic(req, res, path);
      });
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
