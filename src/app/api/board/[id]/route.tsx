import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { IPostDetail } from "../../../../types/post.type";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<IPostDetail>> {
  const board = await prisma.board.findUnique({
    where: { board_id: Number(params.id) },
    include: { reply: true },
  });

  if (!board) {
    throw NextResponse.error();
  }

  const postDetail: IPostDetail = {
    board_id: String(board.board_id),
    writer: board.writer,
    title: board.title,
    created_at: board.created_at,
    content: board.content,
    updated_at: board.updated_at,
    reply: board.reply.map((reply) => ({
      reply_id: String(reply.reply_id),
      content: reply.content,
      writer: reply.writer,
      created_at: reply.created_at,
    })),
  };

  return NextResponse.json(postDetail);
}

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
    data: { ...body, updated_at: new Date() },
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
