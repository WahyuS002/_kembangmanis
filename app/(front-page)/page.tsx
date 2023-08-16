"use client";

import PostCard from "@/components/ui/post/post-card";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import axios from "axios";
import kantorDesaImg from "@/public/images/kantor-desa.png";
import { MetaData, Post } from "@/store/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <main className="pt-12 container mx-auto lg:pt-24">
        <div className="gap-12 items-center lg:flex">
          <div className="lg:w-1/2">
            <TypographyH1>Desa Kembang Manis</TypographyH1>
            <p className="pt-3 lg:pt-6">
              Platform digital yang menyajikan informasi tentang perkembangan
              terkini Desa Kembang Manis. Menjadi jendela interaktif untuk
              mengenal pesona dan kehidupan di Desa Kembang Manis.
            </p>
          </div>
          <Image
            src={kantorDesaImg}
            alt="kantor desa"
            className="mt-8 w-full h-[30rem] object-cover rounded-xl bg-black lg:mt-0 lg:w-1/2"
          />
        </div>
      </main>
      <section className="pt-20 container mx-auto lg:pt-40">
        <TypographyH2>Infografis Desa</TypographyH2>
        <div className="grid grid-cols-4 mt-10">
          <div className="h-[15rem] aspect-square rounded-xl shadow-sm border-2 flex items-center justify-center">
            <div>
              <div className="text-center font-semibold text-xl">304</div>
              <p>Jumlah KK</p>
            </div>
          </div>
          <div className="h-[15rem] aspect-square rounded-xl shadow-sm border-2 flex items-center justify-center">
            <div>
              <div className="text-center font-semibold text-xl">510</div>
              <p>Laki-laki</p>
            </div>
          </div>
          <div className="h-[15rem] aspect-square rounded-xl shadow-sm border-2 flex items-center justify-center">
            <div>
              <div className="text-center font-semibold text-xl">480</div>
              <p>Perempuan</p>
            </div>
          </div>
          <div className="h-[15rem] aspect-square rounded-xl shadow-sm border-2 flex items-center justify-center">
            <div>
              <div className="text-center font-semibold text-xl">990</div>
              <p>Total Jiwa</p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-20 container mx-auto lg:pt-40">
        <div className="gap-12 items-center lg:flex">
          <div className="h-[30rem] rounded-xl bg-black lg:w-1/2" />
          <div className="lg:w-1/2">
            <TypographyH2 className="mt-10 lg:mt-0">
              Sekilas Tentang Desa Kembang Manis
            </TypographyH2>
            <p className="pt-6">
              Wawasan singkat mengenai daya tarik desa ini. Dengan keindahan
              alamnya, warisan budayanya, dan kehidupan masyarakatnya yang unik,
              desa ini adalah destinasi yang menggabungkan pesona alami dan
              kehangatan budaya.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 container mx-auto lg:py-40">
        <div className="justify-center lg:flex">
          <TypographyH2>Berita Terbaru</TypographyH2>
        </div>
        <div className="mt-10 grid gap-10 container md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
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
        </div>
      </section>
    </div>
  );
}
