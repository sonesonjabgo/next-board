import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  if (request.method === "GET") {
    const reply = await prisma.reply.findMany();
    return NextResponse.json(reply);
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (request.method === "POST") {
    const reply = await prisma.reply.create({
      data: body,
    });

    return NextResponse.json(reply);
  }
}
