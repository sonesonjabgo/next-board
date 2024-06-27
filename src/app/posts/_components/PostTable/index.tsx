"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

interface Column {
  key: string;
  label: string;
}

interface Row {
  key: string;
  [key: string]: any;
}

interface Props {
  columns: Column[];
  rows: Row[];
}

function PostTable({ columns, rows }: Props) {
  return (
    <Table color="primary" aria-label="table">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={"게시물이 없습니다."}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default PostTable;
