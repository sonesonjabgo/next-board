"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { ICreatePost } from "../../../../types/post.type";
import PostForm from "../../_components/PostForm";

interface Props {
  params: { id: number };
}

function EditPostPage({ params: { id } }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/${id}`
      );
      const data = await response.json();
      setTitle(data.title);
      setWriter(data.writer);
      setContent(data.content);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/board/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update post");
      }
      router.push(`/posts/${id}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <PostForm
        type="EDIT"
        title={title}
        onTitleChange={(e) => setTitle(e.target.value)}
        writer={writer}
        onWriterChange={(e) => setWriter(e.target.value)}
        content={content}
        onContentChange={(e) => setContent(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditPostPage;
