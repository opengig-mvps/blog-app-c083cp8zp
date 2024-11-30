'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoaderCircleIcon } from 'lucide-react';
import axios from 'axios';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  content: string;
}

const BlogPostPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const router = useRouter();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`/api/blogs/${blogId}`);
        setBlogPost(response?.data?.data);
      } catch (error) {
        setError('Failed to fetch blog post');
        toast.error('Failed to fetch blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [blogId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoaderCircleIcon className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!blogPost) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>No blog post found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <Card>
        <CardHeader>
          <CardTitle>{blogPost?.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{blogPost?.content}</p>
        </CardContent>
      </Card>
      <div className="mt-4">
        <Button variant="outline" onClick={() => router.push('/dashboard/user/blogs')}>
          Back to Blog List
        </Button>
      </div>
    </div>
  );
};

export default BlogPostPage;