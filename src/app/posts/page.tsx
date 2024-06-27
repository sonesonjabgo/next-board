import React from "react";
import { Button } from "@nextui-org/react";
import PostTable from "./_components/PostTable";
import Link from "next/link";
import { IPost } from "../../types/post.type";

const fetchPosts = async (): Promise<IPost[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/board`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};

async function PostsPage() {
  const data = await fetchPosts();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1>게시글 목록</h1>
        <Link href="posts/create">
          <Button color="primary">+ New</Button>
        </Link>
      </div>
      <PostTable data={data} />
    </div>
  );
}

export default PostsPage;
