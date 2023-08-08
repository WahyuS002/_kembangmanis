"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import Editor from "@/components/ui/editor";
import { Toaster, toast } from "sonner";
import { TypographyH2 } from "@/components/ui/typography";

interface Errors {
  title?: string[];
  content?: string[];
  thumbnail?: string[];
}

export default function CreatePostPage() {
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

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      await axios.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsLoading(false);
      toast.success("Berhasil menambahkan berita");
      resetAllInputs();
    } catch (e: any) {
      setIsLoading(false);
      setErrors(e.response.data.errors);
      toast.error("Terjadi Kesalahan");
    }
  };

  const resetAllInputs = () => {
    setTitle("");
    setContent("");
    setThumbnail(undefined);
    setThumbnailPreview(null);
  };

  return (
    <>
      <Toaster />
      <TypographyH2>Tambah Berita</TypographyH2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col-reverse mt-8 lg:space-x-12 lg:flex-row"
        encType="multipart/form-data"
      >
        <div className="space-y-4 lg:w-[70%]">
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
          <div
            className="flex justify-end lg:hidden"
            style={{
              marginTop: "54px",
            }}
          >
            <Button
              className="flex items-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Icons.loadingCircle />}
              Simpan Berita
            </Button>
          </div>
        </div>
        <div className="mb-4 lg:w-[30%] lg:mb-0">
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
            <div className="hidden justify-end mt-4 lg:flex">
              <Button
                className="flex items-center gap-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Icons.loadingCircle />}
                Simpan Berita
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
