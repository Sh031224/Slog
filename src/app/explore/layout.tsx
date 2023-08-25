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
    <div className="flex h-full w-full flex-col md:flex-row md:pt-8">
      {category}

      {posts}

      {children}
    </div>
  );
}
