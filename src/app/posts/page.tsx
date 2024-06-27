import React from "react";
import { Button } from "@nextui-org/react";
import PostTable from "./_components/PostTable";
import Link from "next/link";
import { IPost } from "../../types/post.type";

function PostsPage() {
  const data: IPost[] = [
    {
      board_id: "1",
      title: "게시글 1",
      writer: "문지은",
      created_at: new Date(),
    },
    {
      board_id: "2",
      title: "게시글 2",
      writer: "문지은",
      created_at: new Date(),
    },
    {
      board_id: "3",
      title: "게시글 3",
      writer: "문지은",
      created_at: new Date(),
    },
    {
      board_id: "4",
      title: "게시글 4",
      writer: "문지은",
      created_at: new Date(),
    },
  ];

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
