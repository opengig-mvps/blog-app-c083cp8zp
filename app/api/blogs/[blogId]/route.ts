import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    // Validate and parse the blogId parameter
    const blogId = parseInt(params.blogId, 10);
    if (isNaN(blogId)) {
      return NextResponse.json({ success: false, message: 'Invalid blog ID' }, { status: 400 });
    }

    // Retrieve the full content of the blog post
    const blogPost = await prisma.blogPost.findUnique({
      where: { id: blogId },
    });

    if (!blogPost) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    // Return the full blog post object
    return NextResponse.json({
      success: true,
      message: 'Blog fetched successfully!',
      data: {
        id: blogPost.id,
        title: blogPost.title,
        content: blogPost.content,
        authorId: blogPost.authorId,
        createdAt: blogPost.createdAt.toISOString(),
        updatedAt: blogPost.updatedAt.toISOString(),
      },
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}