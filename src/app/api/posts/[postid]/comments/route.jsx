import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request, response) {
  try {
    const { postId } = response.params;

    // Check if the post with the given ID exists
    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found",
      });
    }

    // Retrieve comments for the specific post
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    });

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found",
      });
    }

    // Create a new comment associated with the post
    const newComment = await prisma.comment.create({
      data: {
        text,
        post: {
          connect: { id: postId },
        },
      },
    });

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}