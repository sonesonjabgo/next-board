"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";
import { usePost } from "../../[id]/postContext";
import dayjs from "dayjs";

function PostDetail() {
  const { post, loading } = usePost();

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h3>{post?.title}</h3>
        <div>
          <p>등록일 : {dayjs(post?.created_at).format("YYYY-MM-DD")}</p>
          <p>수정일 : {dayjs(post?.updated_at).format("YYYY-MM-DD")}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="h-44">
        <p>{post?.content}</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-col">
        <div className="w-full ">
          <div className="flex gap-2">
            <h5>댓글</h5> <h6 className="text-base">{post?.reply.length}</h6>
          </div>
        </div>
        {(() => {
          if (post?.reply)
            return (
              <div className="w-full flex flex-col gap-2">
                {post?.reply.map((reply) => (
                  <div
                    key={reply.reply_id}
                    className="p-3 border-t border-neutral-300"
                  >
                    <p>{reply.writer}</p>
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            );
        })()}
      </CardFooter>
    </Card>
  );
}

export default PostDetail;
