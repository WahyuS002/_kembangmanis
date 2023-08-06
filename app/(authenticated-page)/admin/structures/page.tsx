"use client";

import { TypographyH2 } from "@/components/ui/typography";
import axios from "@/lib/axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Separator } from "@radix-ui/react-separator";

export default function AdminStructuresPage() {
  const [structureImage, setStructureImage] = useState<string>("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("settingType", "structure");
      formData.append("structureImage", imageSrc as string);

      const response = await axios.put("/api/settings/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const getStructureImage = async () => {
      const { data } = await axios.get("/api/settings/structure");
      setStructureImage(data.structureImage);
    };

    getStructureImage();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <TypographyH2>Struktur</TypographyH2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">
              <Icons.pencil className="w-4 h-4 mr-2" />
              Edit Struktur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <DialogHeader>
                <DialogTitle>Edit Struktur</DialogTitle>
                <DialogDescription>
                  Untuk mengedit struktur silahkan klik{" "}
                  <a
                    href="https://www.figma.com/file/WfwPUxS7f8YAv79ZoICFMf/Desa-Kembang-Manis?type=design&node-id=0%3A1&mode=design&t=SDoQzEPZWZZz0I8y-1"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold"
                  >
                    link figma berikut
                  </a>{" "}
                  dan lakukan upload file struktur terbaru dibawah.
                </DialogDescription>
              </DialogHeader>
              <Separator />
              <div className="bg-zinc-100 border-4 relative border-dotted border-zinc-200 aspect-square rounded-xl cursor-pointer p-2 overflow-auto my-6">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[300px]">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Uploaded Image"
                      width={800}
                      height={800}
                    />
                  ) : (
                    <Icons.uploadCloud className="w-16 h-16 text-zinc-400" />
                  )}
                  <span className="mt-2 text-zinc-400 font-semibold">
                    {!imageSrc && "Upload File Struktur Terbaru"}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Simpan Struktur</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Image
        src={structureImage}
        className="mt-12"
        alt="Struktur Pemerintah Desa Kembang Manis"
        width={3842}
        height={1432}
      />
    </>
  );
}
