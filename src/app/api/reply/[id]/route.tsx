import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const deleteReply = await prisma.reply.delete({
    where: { reply_id: Number(params.id) },
  });
  return NextResponse.json({});
}
