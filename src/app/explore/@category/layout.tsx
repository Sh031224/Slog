export default function CategoryLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="h-fit w-full space-y-1 pb-4 md:sticky md:top-[5.5rem] md:w-56 md:shrink-0 md:pb-0 md:pr-7">
      <h2 className="mb-2 hidden px-4 text-lg font-semibold tracking-tight md:block">
        Categories
      </h2>

      <div className="md:max-h-[80vh] md:space-y-2 md:overflow-y-auto md:pb-4">
        {children}
      </div>
    </aside>
  );
}
