type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-full min-w-full items-center justify-center">
      {children}
    </div>
  );
}
