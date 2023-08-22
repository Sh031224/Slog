export default function CategoryLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="w-60 shrink-0 space-y-1 pr-7">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        Categories
      </h2>

      {children}
    </aside>
  );
}
