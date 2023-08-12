import Image from "next/image";
import { Icons } from "../icons";
import { Gallery } from "@/store/types";
import Link from "next/link";

interface GalleryCardProps {
  gallery: Gallery;
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  return (
    <Link href={`galleries/${gallery.slug}`}>
      <div className="aspect-square rounded-lg bg-zinc-900 overflow-hidden">
        <Image
          src={gallery.media[0].original_url}
          alt="Gallery"
          width={300}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="mt-4 font-medium">{gallery.title}</p>
      <div className="flex items-center mt-2">
        <Icons.image className="w-4 h-4 mr-1 text-zinc-400" />
        <p className="font-semibold text-zinc-400 text-xs">
          {gallery.media.length} Gambar
        </p>
      </div>
    </Link>
  );
}
