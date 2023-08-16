"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import axios from "axios";
import { delay, formatDate } from "@/lib/utils";
import { Gallery } from "@/store/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GalleriesDetailPage({
  params,
}: {
  params: { slug: string; queryId: string };
}) {
  const route = useRouter();
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [gallery, setGallery] = useState<Gallery>({
    title: "",
    slug: "",
    media: [],
    created_at: "",
  });

  const searchParams = useSearchParams();
  const photoId = searchParams.get("photoId");

  const copyLinkAddress = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsLinkCopied(true);
    delay(1000).then(() => setIsLinkCopied(false));
  };

  useEffect(() => {
    const fetchGalleryBySlug = async () => {
      try {
        const { data } = await axios.get(`/api/galleries`);
        const foundGallery = data.data.find(
          (gallery: Gallery) => gallery.slug === params.slug
        );
        setGallery(foundGallery);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchGalleryBySlug();
  }, [params.slug]);

  return (
    <div className="m-4">
      {/* {photoId && (
        <Modal images={gallery.media} onClose={() => console.log()} />
      )} */}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="absolute left-0 right-0 bottom-0 h-full bg-gradient-to-t from-zinc-900 via-zinc-800 to-zinc-900"></span>
          </div>
          <h1 className="mt-8 text-base font-bold uppercase tracking-widest z-10">
            {formatDate(gallery.created_at)}
          </h1>
          <p className="max-w-[40ch] text-white/75 z-10 sm:max-w-[32ch]">
            {gallery.title}
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="z-10"
              onClick={() => route.replace("/galleries")}
            >
              Kembali
            </Button>
            {!isLinkCopied ? (
              <Button
                className="z-10"
                variant="secondary"
                onClick={() => copyLinkAddress()}
              >
                <Icons.link className="w-4 h-4 mr-2" />
                Bagikan
              </Button>
            ) : (
              <Button className="z-10" variant="secondary">
                <Icons.check className="w-4 h-4 mr-2" />
                Link berhasil disalin
              </Button>
            )}
          </div>
        </div>
        {gallery.media.map((media, index) => (
          <Link
            href={`/galleries/${params.slug}/?photoId=${media.id}`}
            // as={`/p/${media.id}`}
            key={media.id}
            shallow
            className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
          >
            <Image
              src={media.original_url}
              alt="Galeri Desa Kembang Manis"
              className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
              width={720}
              height={480}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
