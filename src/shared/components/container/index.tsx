type Props = {
  children: React.ReactNode;
};

export default function Container({ children }: Props) {
  return (
    <section className="relative min-h-[calc(100vh-14rem)]">{children}</section>
  );
}
