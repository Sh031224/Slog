import { IPost } from "interface/IPost";
import * as fs from "fs";
import marked from "marked";
import postResponse from "../lib/postResponse";

const WEB_DOMAIN = "https://slog.website";

const rss = async () => {
  const posts = await postResponse(80);

  const rss = `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Slog</title>
      <link>${WEB_DOMAIN}</link>
      <description>많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다.</description>
      <language>ko</language>
      <lastBuildDate>${new Date(posts[0].updated_at).toISOString()}</lastBuildDate>
      <atom:link href="https://slog.website/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join("")}
    </channel>
  </rss>
  `;

  fs.writeFileSync("./public/rss.xml", rss);
};

const generateRssItem = (post: IPost): string => `
  <item>
    <title>
      <![CDATA[ ${post.title} ]]>
     </title>
    <guid>${WEB_DOMAIN}/${post.idx}</guid>
    <link>${WEB_DOMAIN}/${post.idx}</link>
    <description>
      <![CDATA[ ${marked(post.content)} ]]>
    </description>
    <pubDate>${new Date(post.created_at).toISOString()}</pubDate>
  </item>
`;

export default rss;
