type Props = {
  children: React.ReactNode;
  comment: React.ReactNode;
};

export default function PostLayout({ children, comment }: Props) {
  return (
    <>
      {children}
      {comment}
    </>
  );
}
