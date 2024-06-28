"use client";

import { Button, Input } from "@nextui-org/react";
import React, { FormEvent, useRef } from "react";

interface Props {
  params: { id: string };
}

function ReplyInput({ params: { id } }: Props) {
  const writerRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

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
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={postReply}>
        <Input ref={writerRef} />
        <Input ref={contentRef} />
        <Button color="primary" type="submit" />
      </form>
    </div>
  );
}

export default ReplyInput;
