type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-[calc(100vh-14rem)] min-w-full items-center justify-center">
      {children}
    </div>
  );
}
