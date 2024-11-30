import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { blogId: string } }
) {
  try {
    const blogId = parseInt(params.blogId, 10);
    if (isNaN(blogId)) {
      return NextResponse.json({ success: false, message: 'Invalid blog ID' }, { status: 400 });
    }

    const blogPost = await prisma.blogPost.findUnique({
      where: { id: blogId },
    });

    if (!blogPost) {
      return NextResponse.json({ success: false, message: 'Blog post not found' }, { status: 404 });
    }

    await prisma.blogPost.delete({
      where: { id: blogId },
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully!',
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
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}