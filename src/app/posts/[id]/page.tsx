import React from "react";
import { notFound } from "next/navigation";

interface Props {
  params: { id: number };
}

function PostDetailPage({ params: { id } }: Props) {
  if (id > 10) notFound();

  return <div>PostDetailPage {id}</div>;
}

export default PostDetailPage;
