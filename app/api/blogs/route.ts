import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all blog posts
    const blogPosts = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Map the blog posts to include a snippet
    const blogPostsWithSnippet = blogPosts.map((post) => ({
      id: post.id,
      title: post.title,
      snippet: post.content.substring(0, 100) + '...',
      authorId: post.authorId,
      createdAt: post.createdAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    // Send the response with the list of blog posts
    return NextResponse.json(
      {
        success: true,
        message: 'Blogs fetched successfully!',
        data: blogPostsWithSnippet,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}