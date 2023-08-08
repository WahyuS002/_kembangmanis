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
import { Toaster, toast } from "sonner";

export default function AdminStructuresPage() {
  const [structureImage, setStructureImage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [triggerEffect, setTriggerEffect] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("settingType", "structure");
      formData.append("structureImage", image as File);
      formData.append("settings_value[structuredImage]", image?.name as string);
      formData.append("_method", "PUT");

      await axios.post("/api/settings/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Struktur berhasil diupdate");
      setTriggerEffect(true);
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengupdate struktur");
    }
  };

  useEffect(() => {
    const getStructureImage = async () => {
      const { data } = await axios.get("/api/settings/structure");
      setStructureImage(data.structureImage);
    };

    getStructureImage();
  }, [triggerEffect]);

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-between">
        <TypographyH2>Struktur</TypographyH2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">
              <Icons.pencil className="w-4 h-4 mr-2" />
              Edit Struktur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
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
              <div className="bg-zinc-100 border-4 relative border-dotted border-zinc-200 rounded-xl cursor-pointer p-2 overflow-auto my-6 h-[250px]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-[300px]">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Uploaded Image"
                      width={1000}
                      height={1000}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Icons.uploadCloud className="w-16 h-16 text-zinc-400" />
                  )}
                  <span className="mt-2 text-zinc-400 font-semibold">
                    {!image && "Upload File Struktur Terbaru"}
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
