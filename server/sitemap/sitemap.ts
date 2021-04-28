import prettier from "prettier";
import * as fs from "fs";
import sitemapPost from "./sitemap-post";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

const sitemap = async () => {
  const sitemapPostResult = await sitemapPost();

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${sitemapPostResult}
    </urlset>
  `;

  const formattedSitemap = formatted(sitemap);

  fs.writeFileSync("./public/sitemap.xml", formattedSitemap, "utf8");
};

export default sitemap;
