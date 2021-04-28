const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withPlugins = require("next-compose-plugins");
const withTm = require("next-transpile-modules");

module.exports = withPlugins([
  withCSS(
    withSass({
      webpack(config, options) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 100000
            }
          }
        });

        return config;
      }
    })
  ),
  [
    withTm,
    {
      transpileModules: ["react-syntax-highlighter"]
    }
  ]
]);
