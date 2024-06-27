import React from "react";
import { Button } from "@nextui-org/react";
import PostTable from "./_components/PostTable";
import Link from "next/link";

function PostsPage() {
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button color="primary">
          <Link href="posts/create">+ New</Link>
        </Button>
      </div>
      <PostTable columns={columns} rows={rows} />
    </div>
  );
}

export default PostsPage;
