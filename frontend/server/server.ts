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

    server.listen(3000, () => {
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch((ex: Error) => {
    console.error(ex.stack);
    process.exit(1);
  });

export {};
