export default function ExploreLayout({
  children,
  category,
  posts
}: {
  children: React.ReactNode;
  category: React.ReactNode;
  posts: React.ReactNode;
}) {
  return (
    <div className="flex w-full pt-8">
      {posts}
      {category}

      {children}
    </div>
  );
}
