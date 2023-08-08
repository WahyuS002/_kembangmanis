"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import Editor from "@/components/ui/editor";
import { Toaster, toast } from "sonner";
import { TypographyH2 } from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import DeleteDialog from "@/components/ui/delete-dialog";
import { delay } from "@/lib/utils";

interface Errors {
  title?: string[];
  content?: string[];
  thumbnail?: string[];
}

interface EditPostPageProps {
  params: {
    slug: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [errors, setErrors] = useState<Errors>();

  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setThumbnail(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail as File);
    formData.append("author_id", "1");
    formData.append("_method", "PUT");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await axios.post(`/api/posts/${params.slug}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsLoading(false);
      toast.success("Berhasil mengedit berita", {
        action: {
          label: "Lihat Berita",
          onClick: () => router.push(`/admin/posts`),
        },
      });
    } catch (e: any) {
      setIsLoading(false);
      setErrors(e.response.data.errors);
      toast.error("Terjadi Kesalahan");
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/posts/${params.slug}`);
      toast.success("Berhasil menghapus berita", {
        duration: 1000,
      });
      resetAllInputs();
      await delay(1000).then(() => router.push(`/admin/posts`));
    } catch (e: any) {
      toast.error("Terjadi Kesalahan");
    }
  };

  const resetAllInputs = () => {
    setTitle("");
    setContent("");
    setThumbnail(undefined);
    setThumbnailPreview(null);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/api/posts/${params.slug}`);

      setTitle(data.title);
      setContent(data.content);
      // setThumbnailPreview(data.media[0].original_url);
    };

    fetchPost();
  }, [params.slug]);

  return (
    <>
      <Toaster />
      <TypographyH2>Edit Berita</TypographyH2>
      <form
        onSubmit={handleSubmit}
        className="flex space-x-12 mt-8"
        encType="multipart/form-data"
      >
        <div className="w-[70%] space-y-4">
          <Input
            type="text"
            placeholder="Judul Berita"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full max-w-screen-lg sm:border sm:rounded-lg border-stone-200 shadow-sm"
          />
          {errors?.title && title === "" && (
            <span className="text-xs text-red-500">{errors.title}</span>
          )}
          <Editor content={content} setContent={setContent} />
          {errors?.content && content === "" && (
            <span className="text-xs text-red-500">{errors.content}</span>
          )}
        </div>
        <div className="w-[30%]">
          <div>
            {thumbnailPreview ? (
              <div className="bg-zinc-100 border-4 relative border-dotted border-zinc-200 aspect-square rounded-xl cursor-pointer p-2">
                <Image
                  src={thumbnailPreview}
                  alt="Uploaded Image"
                  width={800}
                  height={800}
                  className="sm:rounded-lg object-contain w-full h-full"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <>
                <div className="bg-zinc-100 border-4 relative border-dotted border-zinc-200 aspect-square rounded-xl cursor-pointer p-2">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[300px]">
                    <Icons.uploadCloud className="w-16 h-16 text-zinc-400" />

                    <span className="mt-2 text-zinc-400 font-semibold">
                      Upload Thumbnail
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={handleImageChange}
                  />
                </div>
                {errors?.thumbnail && (
                  <span className="text-xs text-red-500">
                    {errors.thumbnail}
                  </span>
                )}
              </>
            )}
            <div className="flex gap-4 justify-end mt-4">
              <DeleteDialog
                title="Hapus Berita"
                description="Sambangi Mahasiswa KKN, Bhabinkamtibmas Polsek Lais Minta Mahasiswa Membaur dengan Warga"
                onDelete={onDelete}
              />
              <Button className="w-32" type="submit" disabled={isLoading}>
                {isLoading ? <Icons.loadingCircle /> : <>Update Berita</>}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
