type Props = {
  children: React.ReactNode;
};

export default function PostLayout({ children }: Props) {
  return (
    <article className="flex w-full justify-center pb-6 pt-12 max-md:pt-6">
      <div className="flex w-full max-w-4xl flex-col items-center">
        {children}
      </div>
    </article>
  );
}
