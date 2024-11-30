"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

// Zod schema for blog form validation
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

const BlogForm: React.FC<{
  onSubmit: (data: BlogFormData) => void;
  loading: boolean;
}> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register("title")} placeholder="Enter blog title" />
        {errors?.title && (
          <p className="text-red-500 text-sm">{errors?.title?.message}</p>
        )}
      </div>
      <div>
        <Textarea {...register("content")} placeholder="Write your blog content" />
        {errors?.content && (
          <p className="text-red-500 text-sm">{errors?.content?.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        {loading ? <LoaderCircleIcon className="animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
};

const BlogsPage: React.FC = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session?.user?.id}/blogs`);
        setBlogs(res?.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [session]);

  const handleCreateOrUpdate = async (data: BlogFormData) => {
    try {
      setLoading(true);
      const res = await api.post(`/api/users/${session?.user?.id}/blogs`, data);
      if (res?.data?.success) {
        toast.success("Blog post saved successfully!");
        setBlogs((prev) => [...prev, res?.data?.data]);
      }
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

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const res = await api.delete(`/api/users/${session?.user?.id}/blogs/${id}`);
      if (res?.data?.success) {
        toast.success("Blog post deleted successfully!");
        setBlogs((prev) => prev?.filter((blog) => blog?.id !== id));
      }
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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Manage Your Blogs</h2>
        <Card>
          <CardHeader>
            <CardTitle>Create or Edit Blog</CardTitle>
          </CardHeader>
          <CardContent>
            <BlogForm onSubmit={handleCreateOrUpdate} loading={loading} />
          </CardContent>
        </Card>
        <div className="mt-8 space-y-4">
          {blogs?.map((blog) => (
            <Card key={blog?.id}>
              <CardHeader>
                <CardTitle>{blog?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{blog?.content}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => handleDelete(blog?.id)}>
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;