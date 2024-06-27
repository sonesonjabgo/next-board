import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  if (request.method === "GET") {
    const board = await prisma.board.findMany();
    return NextResponse.json(board);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (request.method === "POST") {
    const board = await prisma.board.create({
      data: body,
    });

    return NextResponse.json(board);
  }
}
