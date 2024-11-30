import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type BlogPostRequestBody = {
  title: string;
  content: string;
  authorId: string;
};

export async function POST(request: Request) {
  try {
    const body: BlogPostRequestBody = await request.json();

    const { title, content, authorId } = body;

    if (!title || !content || !authorId) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const authorIdInt = parseInt(authorId, 10);

    const user = await prisma.user.findUnique({
      where: { id: authorIdInt },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        authorId: authorIdInt,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post created successfully!',
      data: {
        id: blogPost.id,
        title: blogPost.title,
        content: blogPost.content,
        authorId: blogPost.authorId,
        createdAt: blogPost.createdAt.toISOString(),
        updatedAt: blogPost.updatedAt.toISOString(),
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}