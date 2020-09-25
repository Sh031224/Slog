const axios = require("axios");
const fs = require("fs");
const prettier = require("prettier");
const SERVER = require("../../src/config/index.json").server;

// 오늘 날짜 가져오기 & 도메인 설정
const getDate = new Date().toISOString();

const WEB_DOMAIN = "https://slog.website";

const formatted = (sitemap) => prettier.format(sitemap, { parser: "html" });
(async () => {
  let response = [];

  // axios를 이용해 post 리스트 가져오기
  // <API_DOAMIN>, <API_NAME> 등은 실제 값이 아닙니다!
  await axios({
    method: "get",
    url: `${SERVER}/api/v1/post?page=1&limit=100000`,
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      response = res.data.data.posts;
    })
    .catch((e) => {
      console.log(e.response.data);
    });

  // xml 구조에 맞게 파싱하여 재조립
  const postListSitemap = `
  ${response
    .map((post) => {
      return `
        <url>
          <loc>${`${WEB_DOMAIN}/post/${post.idx}`}</loc>
          <lastmod>${getDate}</lastmod>
        </url>`;
    })
    .join("")}
`;

  const generatedSitemap = `
	<?xml version="1.0" encoding="UTF-8"?>
  	<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${postListSitemap}
  </urlset>
`;

  const formattedSitemap = formatted(generatedSitemap);

  fs.writeFileSync(
    "./public/sitemap/sitemap-posts.xml",
    formattedSitemap,
    "utf8"
  );
})();

export {};
