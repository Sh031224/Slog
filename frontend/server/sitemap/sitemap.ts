const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

const getDate = new Date().toISOString();
const WEB_DOMAIN = "https://slog.website";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

// public/sitemap 내부의 모든 .gz 파일을 불러와 참조하도록 합니다.
(async () => {
  const pages = await globby(["./public/sitemap/*.gz"]);

  const sitemapIndex = `
    ${pages
      .map((page) => {
        const path = page.replace("./public/", "");
        return `
          <sitemap>
            <loc>${`${WEB_DOMAIN}/${path}`}</loc>
            <lastmod>${getDate}</lastmod>
          </sitemap>`;
      })
      .join("")}
  `;

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndex}
    </sitemapindex>
  `;

  const formattedSitemap = formatted(sitemap);

  fs.writeFileSync("./public/sitemap.xml", formattedSitemap, "utf8");
})();

export {};
