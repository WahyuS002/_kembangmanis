"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import PaginationControls from "@/components/ui/pagination-controls";
import { MetaData } from "@/store/types";
import PostCard from "@/components/ui/post/post-card";
import { TypographyH2 } from "@/components/ui/typography";
import axios from "@/lib/axios";
import { Post } from "@/store/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPostPage() {
  const [posts, setPosts] = useState<Post[]>();
  const [pagination, setPagination] = useState<MetaData>({
    currentPage: 1,
    totalPages: 1,
    prevPageUrl: false,
    nextPageUrl: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts?page=${currentPage}`);
        setPosts(response.data.data);
        setPagination(response.data.meta);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <>
      <div className="flex items-center justify-between">
        <TypographyH2>Berita</TypographyH2>
        <Button variant="default">
          <Link href="/admin/posts/create" className="flex items-center">
            <Icons.plus className="w-4 h-4 mr-1" />
            Tambah Berita
          </Link>
        </Button>
      </div>
      <section className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
        {posts?.map((post, index) => (
          <PostCard
            title={post.title}
            slug={post.slug}
            author={post.author}
            created_at={post.created_at}
            thumbnail={post.media?.[0]?.original_url || ""}
            key={index}
          />
        ))}
      </section>
      <PaginationControls
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
