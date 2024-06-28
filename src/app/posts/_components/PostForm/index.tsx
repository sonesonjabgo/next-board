"use client";

import React from "react";
import { Input, Button, Textarea } from "@nextui-org/react";

interface Props {
  title: string;
  content: string;
  writer: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWriterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  type: "CREATE" | "EDIT";
}

function PostForm({
  title,
  content,
  writer,
  onTitleChange,
  onWriterChange,
  onContentChange,
  onSubmit,
  type,
}: Props) {
  const role = () => {
    return type === "CREATE" ? "등록" : "수정";
  };

  return (
    <form className="flex flex-col gap-4 w-96" onSubmit={onSubmit}>
      <h1>게시물 {role()}</h1>
      <Input
        label="제목"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={onTitleChange}
      />
      <Input
        label="작성자"
        placeholder="작성자 이름을 입력해주세요."
        value={writer}
        onChange={onWriterChange}
      />
      <Textarea
        label="내용"
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={onContentChange}
      />
      <Button color="primary" type="submit">
        {role()}
      </Button>
    </form>
  );
}

export default PostForm;
