export default function CategoryLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="sticky top-[5.5rem] h-fit w-56 shrink-0 space-y-1 pr-7">
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        Categories
      </h2>

      <div className="space-y-2">{children}</div>
    </aside>
  );
}
