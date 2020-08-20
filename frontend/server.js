const express = require("express");
const app = express();
const path = require("path");
const request = require("request");
const fs = require("fs");
const cors = require("cors");
const robots = require("express-robots-txt");

app.use(cors());
app.use(robots({ UserAgent: "*", Disallow: "/" }));

app.get("/", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Slog");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
    );
    data = data.replace(/\$OG_URL/g, `https://slog.website/`);
    result = data.replace(
      /\$OG_IMAGE/g,
      "https://data.slog.website/public/op_logo.png"
    );
    response.send(result);
  });
});

app.get("/post/*", function (resApp, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var url = `https://data.slog.website/api/v1/post/${resApp.params[0]}`;

    request(url, { json: true }, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      if (body.data) {
        if (body.data.post.is_temp) {
          data = data.replace(/\$OG_TITLE/g, "Slog");
          data = data.replace(
            /\$OG_DESCRIPTION/g,
            "많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
          );
          data = data.replace(/\$OG_URL/g, `https://slog.website/`);
          data = data.replace(
            /\$OG_IMAGE/g,
            "https://data.slog.website/public/op_logo.png"
          );
        } else {
          data = data.replace(/\$OG_TITLE/g, body.data.post.title);
          data = data.replace(
            /\$OG_DESCRIPTION/g,
            body.data.post.description
              .replace(/ +/g, " ")
              .replace(
                /#+ |-+ |!+\[+.*\]+\(+.*\)|\`|\>+ |\[!+\[+.*\]+\(+.*\)|\<br+.*\>|\[.*\]\(.*\)/g,
                ""
              )
          );
          if (body.data.post.thumbnail) {
            data = data.replace(/\$OG_IMAGE/g, body.data.post.thumbnail);
          } else {
            data = data.replace(
              /\$OG_IMAGE/g,
              "https://data.slog.website/public/op_logo.png"
            );
          }
        }
      } else {
        data = data.replace(/\$OG_TITLE/g, "Slog");
        data = data.replace(
          /\$OG_DESCRIPTION/g,
          "많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
        );
        data = data.replace(/\$OG_URL/g, `https://slog.website/`);
        data = data.replace(
          /\$OG_IMAGE/g,
          "https://data.slog.website/public/op_logo.png"
        );
      }
      result = data;
      response.send(result);
    });
  });
});

app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", function (request, response) {
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, "Slog");
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      "많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
    );
    data = data.replace(/\$OG_URL/g, `https://slog.website/`);
    result = data.replace(
      /\$OG_IMAGE/g,
      "https://data.slog.website/public/op_logo.png"
    );
    response.send(result);
  });
});

require("greenlock-express")
  .init({
    packageRoot: "/root/blog_web",
    configDor: "./src/greenlock.d",
    cluster: false,
    maintainerEmail: "1cktmdgh2@gmail.com"
  })
  .serve(app);
