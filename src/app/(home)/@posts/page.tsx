import { notFound } from "next/navigation";

import Posts from "@/features/(home)/@posts";

import { fetchPosts } from "./actions";

export default async function PostsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { categoryId = undefined, isTemp = false } = searchParams;

  const params = {
    categoryId: categoryId !== undefined ? Number(categoryId) : undefined,
    isTemp: isTemp === "true"
  };

  const initialPosts = await fetchPosts(params);

  if (initialPosts.count === 0) {
    notFound();
  }

  return <Posts initialPosts={initialPosts} fetchPosts={fetchPosts} params={params} />;
}
