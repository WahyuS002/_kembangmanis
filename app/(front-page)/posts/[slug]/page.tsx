"use client";

import { TypographyH1 } from "@/components/ui/typography";
import axios from "@/lib/axios";
import { Post } from "@/store/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${params.slug}`);
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [params.slug]);

  return (
    <div className="container my-16">
      <TypographyH1 className="text-center mb-10">{post?.title}</TypographyH1>
      {post && (
        <div className="flex justify-center">
          <Image
            width={1080}
            height={500}
            src={post.media[0].original_url}
            alt={post.title}
          />
        </div>
      )}
      <div className="mt-10">{post?.content}</div>
    </div>
  );
}
