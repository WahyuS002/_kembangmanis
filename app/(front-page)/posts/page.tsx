"use client";

import PaginationControls from "@/components/ui/pagination-controls";
import PostCard from "@/components/ui/post/post-card";
import { TypographyH1 } from "@/components/ui/typography";
import { Post } from "@/store/types";
import axios from "axios";
import { useEffect, useState } from "react";
// import axios from "@/lib/axios";
// import { MetaData, Post } from "@/store/types";
// import { useEffect, useState } from "react";

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>();
  // const [pagination, setPagination] = useState<MetaData>({
  //   currentPage: 1,
  //   totalPages: 1,
  //   prevPageUrl: false,
  //   nextPageUrl: false,
  // });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts?page=${currentPage}`);
        setPosts(response.data.data);
        // setPagination(response.data.meta);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <div className="min-h-screen pt-10">
      <TypographyH1 className="text-center max-w-3xl mx-auto pb-20">
        Berita
      </TypographyH1>
      <section className="mt-10 grid gap-10 container md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
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
      {/* <PaginationControls
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
}
