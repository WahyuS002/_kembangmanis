import Image from "next/image";
import { Icons } from "../icons";
import { Gallery } from "@/store/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";
import { Separator } from "./separator";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { delay } from "@/lib/utils";
import axios from "@/lib/axios";
import { Toaster, toast } from "sonner";

interface GalleryCardProps {
  gallery: Gallery;
}

export default function GalleryCard({ gallery }: GalleryCardProps) {
  const onDelete = async () => {
    try {
      await axios.delete(`/api/galleries/${gallery.slug}`);
      toast.success("Galeri berhasil dihapus");
      await delay(1000);
      window.location.reload();
    } catch (error) {
      toast.error("Galeri gagal dihapus");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="aspect-square rounded-lg bg-zinc-900 overflow-hidden relative group">
        <Image
          src={gallery.media[0].original_url}
          alt="Gallery"
          width={300}
          height={300}
          className="object-cover w-full h-full relative"
        />
        <Dialog>
          <DialogTrigger
            className="absolute right-2 top-2 z-20 opacity-0 cursor-pointer group-hover:opacity-100"
            asChild
          >
            <Icons.trash className="w-8 h-8 p-2 bg-red-500 text-white rounded-full shadow-sm" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-2">Hapus Galeri</DialogTitle>
              <DialogDescription>
                Apakah anda yakin untuk menghapus{" "}
                <span className="font-semibold">{gallery.title}</span>?
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <DialogFooter className="flex items-center">
              <DialogPrimitive.Close asChild>
                <Button type="button" variant="secondary">
                  Batal
                </Button>
              </DialogPrimitive.Close>
              <Button type="submit" onClick={onDelete}>
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <p className="mt-4 font-medium">{gallery.title}</p>
      <div className="flex items-center mt-2">
        <Icons.image className="w-4 h-4 mr-1 text-zinc-400" />
        <p className="font-semibold text-zinc-400 text-xs">
          {gallery.media.length} Gambar
        </p>
      </div>
    </div>
  );
}
