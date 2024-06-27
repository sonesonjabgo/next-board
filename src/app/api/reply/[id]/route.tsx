import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const existingReply = await prisma.reply.findUnique({
    where: { reply_id: Number(params.id) },
  });

  if (!existingReply) {
    return NextResponse.json({
      status: 404,
      body: "게시글을 찾을 수 없습니다.",
    });
  }

  const updatedReply = await prisma.reply.update({
    where: { reply_id: Number(params.id) },
    data: {
      ...body,
      updated_at: new Date(),
    },
  });

  return NextResponse.json(updatedReply);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleteReply = await prisma.reply.delete({
    where: { reply_id: Number(params.id) },
  });
  return NextResponse.json({});
}
