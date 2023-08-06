"use client";

import { Input } from "@/components/ui/input";
import Editor from "./editor";
import { useState } from "react";
import { Icons } from "@/components/icons";
import Image from "next/image";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import DEFAULT_EDITOR_CONTENT from "./editor/default-content";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";

export default function CreateNewsPage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useLocalStorage(
    "content",
    DEFAULT_EDITOR_CONTENT
  );

  const [thumbnail, setThumbnail] = useState();
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("thumbnail", thumbnail);
    formData.append("author_id", 1);

    try {
      const response = await axios.post("/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload successful:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex space-x-12"
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
        <Editor content={content} setContent={setContent} />
      </div>
      <div className="w-[30%]">
        <div>
          {thumbnailPreview ? (
            <div className="relative">
              <Image
                src={thumbnailPreview}
                alt="Uploaded Image"
                width={800}
                height={800}
                className="sm:rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          ) : (
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
          )}
          <div className="flex justify-end mt-4">
            <Button type="submit">Simpan Berita</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
