"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircleIcon } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  snippet: string;
}

const BlogListPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`/api/blogs?page=${currentPage}`);
        setBlogPosts(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
      } catch (err: any) {
        setError("Failed to fetch blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [currentPage]);

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

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Published Blog Posts</h1>
          <p className="text-muted-foreground">
            Explore our collection of informative blog posts.
          </p>
        </div>

        {blogPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {blogPosts?.map((post) => (
              <Card key={post?.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>
                    <Link href={`/dashboard/user/blogs/${post?.id}`}>
                      {post?.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{post?.snippet}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Alert className="max-w-2xl">
            <AlertTitle>No blog posts available</AlertTitle>
            <AlertDescription>
              Check back later for new blog posts.
            </AlertDescription>
          </Alert>
        )}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BlogListPage;