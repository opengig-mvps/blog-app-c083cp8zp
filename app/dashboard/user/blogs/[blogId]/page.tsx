"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import { useSession } from "next-auth/react";
import { LoaderCircleIcon } from "lucide-react";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

const BlogPage: React.FC = () => {
  const { data: session } = useSession();
  const { blogId } = useParams<{ blogId: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<BlogFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/blogs/${blogId}`);
        setBlog(response?.data?.data);
        reset(response?.data?.data);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId, reset]);

  const onSubmit = async (data: BlogFormData) => {
    try {
      const response = await api.put(`/api/blogs/${blogId}`, data);
      if (response?.data?.success) {
        toast.success("Blog updated successfully!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  if (loading) {
    return <LoaderCircleIcon className="animate-spin" />;
  }

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Edit Blog Post</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Edit Blog Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Input {...register("title")} placeholder="Enter blog title" />
              {errors?.title && (
                <p className="text-red-500 text-sm">{errors?.title?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="content">Content</label>
              <Textarea
                {...register("content")}
                placeholder="Enter blog content"
              />
              {errors?.content && (
                <p className="text-red-500 text-sm">{errors?.content?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Blog"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

const BlogDetailsPage: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const router = useRouter();
  const [blogPost, setBlogPost] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await api.get(`/api/blogs/${blogId}`);
        setBlogPost(response?.data?.data);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
          toast.error("An unexpected error occurred");
        }
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

  if (!blogPost) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>No blog post found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>{blogPost?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{blogPost?.content}</p>
          </CardContent>
        </Card>
        <Button variant="outline" onClick={() => router.push("/dashboard/user/blogs")}>
          Back to Blog List
        </Button>
      </main>
    </div>
  );
};

export { BlogPage, BlogDetailsPage };