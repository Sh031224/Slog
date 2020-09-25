const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

module.exports = withPlugins([
  [
    withBundleAnalyzer,
    {
      analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
      analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
      bundleAnalyzerConfig: {
        server: {
          analyzerMode: "static",
          reportFilename: "../bundles/server.html"
        },
        browser: {
          analyzerMode: "static",
          reportFilename: "../bundles/client.html"
        }
      }
    }
  ],
  [
    withSass,
    {
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]",
        url: false
      }
    }
  ],
  [
    withCss,
    {
      cssLoaderOptions: {
        url: false
      }
    }
  ],
  [withImages]
]);
