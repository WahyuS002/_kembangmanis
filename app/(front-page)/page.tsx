"use client";

import PostCard from "@/components/ui/post/post-card";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import axios from "axios";
import kantorDesaImg from "@/public/images/kantor-desa.png";
import posbinduImg from "@/public/images/posbindu.jpg";
import { MetaData, Post } from "@/store/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import YouTube from "react-youtube";

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
        <div className="grid lg:grid-cols-4 mt-10 gap-4 lg:gap-0">
          <div className="lg:h-[15rem] aspect-square rounded-xl shadow-sm border-2 flex items-center justify-center">
            <div>
              <div className="text-center font-semibold text-xl">304</div>
              <p>Jumlah KK</p>
            </div>
          </div>
          <div className="lg:h-[15rem] aspect-square rounded-xl shadow-sm border-2 flex items-center justify-center">
            <div>
              <div className="text-center font-semibold text-xl">510</div>
              <p>Laki-laki</p>
            </div>
          </div>
          <div className="lg:h-[15rem] aspect-square rounded-xl shadow-sm border-2 flex items-center justify-center">
            <div>
              <div className="text-center font-semibold text-xl">480</div>
              <p>Perempuan</p>
            </div>
          </div>
          <div className="lg:h-[15rem] aspect-square rounded-xl shadow-sm border-2 flex items-center justify-center">
            <div>
              <div className="text-center font-semibold text-xl">990</div>
              <p>Total Jiwa</p>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-20 container mx-auto lg:pt-40">
        <div className="flex gap-12 items-center flex-col-reverse lg:flex-row">
          <Dialog>
            <DialogTrigger asChild>
              <div className="h-[30rem] relative rounded-xl overflow-hidden cursor-pointer lg:w-1/2">
                <Image
                  className="relative z-10 w-full h-full object-cover"
                  src={posbinduImg}
                  alt="posbindu"
                />
                <div className="bg-zinc-400/20 w-20 h-20 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 rounded-full p-4" />
                <div className="bg-zinc-100 w-16 h-16 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 rounded-full p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    className=""
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    />
                  </svg>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[20rem] lg:min-w-[45rem]">
              <DialogHeader>
                <DialogTitle>Video Profile Desa Kembang Manis</DialogTitle>
              </DialogHeader>
              <YouTube videoId="VQEEKF-d_yI" />
            </DialogContent>
          </Dialog>
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
        <div className="mt-10 grid gap-10 lg:container md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
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
