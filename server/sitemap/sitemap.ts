import { Post } from "types/post";
import postResponse from "../lib/postResponse";
import * as fs from "fs";

let getDate = new Date().toISOString();
const WEB_DOMAIN = "https://slog.website";

const sitemap = async () => {
  const posts = await postResponse();

  getDate = new Date(posts[0].updated_at).toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${posts.map(generateSitemapItem).join("")}
  </urlset>
  `;

  fs.writeFileSync("./public/sitemap.xml", sitemap);
};

const generateSitemapItem = (post: Post): string => {
  return `
  <url>
    <loc>${`${WEB_DOMAIN}/post/${post.idx}`}</loc>
    <lastmod>${new Date(post.updated_at).toISOString()}</lastmod>
  </url>
    `;
};

export default sitemap;
