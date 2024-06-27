import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const existingPost = await prisma.board.findUnique({
    where: { board_id: Number(params.id) },
  });

  if (!existingPost) {
    return NextResponse.json({
      status: 404,
      body: "게시글을 찾을 수 없습니다.",
    });
  }

  const updatedPost = await prisma.board.update({
    where: { board_id: Number(params.id) },
    data: {
      writer: body.writer,
      title: body.title,
      content: body.content,
      updated_at: new Date(),
    },
  });

  return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleteBoard = await prisma.board.delete({
    where: { board_id: Number(params.id) },
  });
  return NextResponse.json({});
}
