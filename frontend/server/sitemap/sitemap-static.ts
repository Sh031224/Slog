const fs = require("fs");
const globby = require("globby");
const prettier = require("prettier");

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();
const WEB_DOMAIN = "https://slog.website";

//
const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });

(async () => {
  // 포함할 페이지와 제외할 페이지 등록
  const pages = await globby([
    // include
    "./src/pages/**/*.tsx",
    "./src/pages/*.tsx",
    // exclude
    "!./src/pages/_app.tsx",
    "!./src/pages/_document.tsx",
    "!./src/pages/_error.tsx",
    "!./src/pages/admin/*.tsx",
    "!./src/pages/api/*.tsx",
    "!./src/pages/**/[idx].tsx",
    "!./src/pages/privacy/index.tsx"
  ]);

  // 파일 경로를 도메인 형태로 변경
  // ../pages/category/index.tsx -> https://slog.website/category
  // ../pages/community/threads -> https://slog.website/community/threads
  const pagesSitemap = `
    ${pages
      .map((page) => {
        const path = page
          .replace("./src/pages/", "")
          .replace(".tsx", "")
          .replace(/\/index/g, "");
        const routePath = path === "index" ? "" : path;
        return `
          <url>
            <loc>${WEB_DOMAIN}/${routePath}</loc>
            <lastmod>${getDate}</lastmod>
          </url>
        `;
      })
      .join("")}`;

  const generatedSitemap = `
  <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${pagesSitemap}
    </urlset>`;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync(
    "./public/sitemap/sitemap-common.xml",
    formattedSitemap,
    "utf8"
  );
})();

export {};
