import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany();

  return NextResponse.json({ success: true, posts });
}
export async function POST(request, response) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must provide a message to create a post.",
      });
    }
    const post = await prisma.post.create({ data: { text } });
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}