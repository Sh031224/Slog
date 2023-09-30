import RSS from 'rss';

import { fetchPosts } from '../(explore)/actions';

export async function GET() {
  const { posts } = await fetchPosts({ limit: 50000 });

  const site_url = process.env.NEXT_PUBLIC_APP_URL;

  const feedOptions = {
    title: 'Slog | RSS Feed',
    description:
      "This is sh031224's tech blog mainly about front-end technology.",
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/opengraph-image.svg`,
    pubDate: new Date()
  };

  const feed = new RSS(feedOptions);

  posts.map(post => {
    feed.item({
      title: post.title,
      description: post.description || '',
      url: `${site_url}/post/${post.id}`,
      date: post.updatedAt,
      author: 'Sh031224'
    });
  });

  return new Response(feed.xml({ indent: true }), {
    status: 200,
    headers: { 'Content-Type': 'text/xml' }
  });
}
