"use client";

import React, { FormEvent, useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import { ICreatePost } from "../../../types/post.type";
import { useRouter } from "next/navigation";

function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title) {
      window.alert("제목을 입력해주세요.");
      return;
    }

    if (!writer) {
      window.alert("작성자를 입력해주세요.");
      return;
    }

    if (!content) {
      window.alert("내용을 입력해주세요.");
      return;
    }

    const postData: ICreatePost = {
      title: title,
      writer: writer,
      content: content,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/board`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }
      router.push("/posts");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit}>
        <h1>게시물 등록</h1>
        <Input
          label="제목"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="작성자"
          placeholder="작성자 이름을 입력해주세요."
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        />
        <Textarea
          label="내용"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button color="primary" type="submit">
          등록
        </Button>
      </form>
    </div>
  );
}

export default CreatePostPage;
