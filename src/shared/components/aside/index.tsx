type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function Aside({ title, children }: Props) {
  return (
    <aside className="sticky top-[3.5rem] z-10 h-fit w-full max-md:bg-background/95 max-md:py-4 max-md:backdrop-blur md:top-[5.5rem] md:mr-7 md:w-56 md:shrink-0">
      {title && (
        <h2 className="mb-2 hidden px-4 text-lg font-semibold tracking-tight md:block">
          {title}
        </h2>
      )}

      <div className="max-md:!mt-0 md:max-h-[80vh] md:space-y-2 md:overflow-y-auto md:pb-4">
        {children}
      </div>
    </aside>
  );
}
