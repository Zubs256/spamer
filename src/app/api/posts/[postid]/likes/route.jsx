import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(request, response) {
  try {
    const { postId } = response.params;

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    const Post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { likes: { increment: 1 } },
    });
    return NextResponse.json({ success: true, post: Post });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}