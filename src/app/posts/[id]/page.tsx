import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { IPostDetail } from "../../../types/post.type";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  params: { id: number };
}

async function fetchDetailPage(param: string): Promise<IPostDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/board/${param}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

async function PostDetailPage({ params: { id } }: Props) {
  const data = await fetchDetailPage(String(id));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Link href={`edit/${id}`}>
          <Button>수정</Button>
        </Link>
      </div>
      <Card>
        <CardHeader className="flex justify-between">
          <h3>{data.title}</h3>
          <div>
            <p>등록일 : {dayjs(data.created_at).format("YYYY-MM-DD")}</p>
            <p>수정일 : {dayjs(data.updated_at).format("YYYY-MM-DD")}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="h-44">
          <p>{data.content}</p>
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col">
          <div className="w-full border-b border-neutral-200">
            <div className="flex gap-2">
              <h5>댓글</h5> <h6 className="text-base">{data.reply.length}</h6>
            </div>
          </div>
          {(() => {
            if (data.reply)
              return (
                <div>
                  {data.reply.map((reply) => (
                    <p key={reply.reply_id}>{reply.reply_id}</p>
                  ))}
                </div>
              );
          })()}
        </CardFooter>
      </Card>

      <Card>
        <Input></Input>
        <Input></Input>
        <Input></Input>
      </Card>
    </div>
  );
}

export default PostDetailPage;
