import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { IPostDetail } from "../../../types/post.type";
import dayjs from "dayjs";
import Link from "next/link";
import ReplyInput from "../_components/ReplyInput";
import NotFound from "../../not-found";
import PostDetail from "../_components/PostDetail";
import PostProvider from "./postContext";

interface Props {
  params: { id: string };
}

async function PostDetailPage({ params: { id } }: Props) {
  if (id.length > 10) NotFound();

  return (
    <PostProvider id={id}>
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <Link href={`edit/${id}`}>
            <Button>수정</Button>
          </Link>
        </div>
        <PostDetail />
        <ReplyInput params={{ id }} />
      </div>
    </PostProvider>
  );
}

export default PostDetailPage;
