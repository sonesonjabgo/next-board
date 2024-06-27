"use client";
import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { IPost } from "../../../../types/post.type";
import dayjs from "dayjs";
import "dayjs/locale/ko";

interface Props {
  data: IPost[];
}

function PostTable({ data }: Props) {
  const router = useRouter();

  const columns = [
    {
      key: "title",
      label: "제목",
    },
    {
      key: "writer",
      label: "작성자",
    },
    {
      key: "created_at",
      label: "작성일",
    },
  ];

  const goDetail = (id: string) => {
    router.push(`/posts/${id}`);
  };

  const formatDate = (date: Date) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  };

  return (
    <Table color="primary" aria-label="table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data} emptyContent={"게시물이 없습니다."}>
        {(item) => (
          <TableRow
            key={item.board_id}
            onClick={() => goDetail(item.board_id)}
            className="hover:bg-gray-50 cursor-pointer"
          >
            <TableCell width={"60%"}>{item.title}</TableCell>
            <TableCell width={"20%"}>{item.writer}</TableCell>
            <TableCell width={"20%"}>{formatDate(item.created_at)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default PostTable;
