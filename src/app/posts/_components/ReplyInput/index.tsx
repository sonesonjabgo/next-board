"use client";

import { Button, Card, Input, Textarea } from "@nextui-org/react";
import React, { FormEvent, useRef } from "react";
import { usePost } from "../../[id]/postContext";

interface Props {
  params: { id: string };
}

function ReplyInput({ params: { id } }: Props) {
  const { post, loading, addReply } = usePost();
  const writerRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const postReply = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      board_id: Number(id),
      writer: writerRef.current?.value,
      content: contentRef.current?.value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      const newReply = await res.json();
      addReply(newReply);

      writerRef.current!.value = "";
      contentRef.current!.value = "";
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="p-3">
        <form onSubmit={postReply} className="flex flex-col items-end gap-2">
          <div className="flex flex-col w-full gap-1">
            <Input ref={writerRef} placeholder="작성자 명" />
            <Textarea ref={contentRef} placeholder="내용을 입력 해주세요." />
          </div>
          <Button color="primary" type="submit">
            댓글 작성
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ReplyInput;
