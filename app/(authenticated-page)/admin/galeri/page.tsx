"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface FileWithPreview extends File {
  preview: string;
}

export default function AdminGaleriPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  console.log(files);

  const thumbs = files.map((file) => (
    <div
      className="w-32 h-32 relative rounded-md overflow-hidden mr-2 mb-2 group"
      key={file.name}
    >
      <img
        className="w-full h-full object-cover"
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <Button
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden group-hover:block"
        variant="outline"
        onClick={() => handleDeleteFile(file.name)}
      >
        Delete
      </Button>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <TypographyH2>Galeri</TypographyH2>
        <TambahGaleriDialog />
      </div>
      <section className="mt-4 grid grid-cols-4 gap-5">
        {[...Array(4)].map(() => (
          <div>
            <div className="aspect-square rounded-lg bg-zinc-900" />
            <p className="text-center mt-4 font-medium">
              Dokumentasi Kuda Terbang
            </p>
            <div className="flex justify-center items-center mt-2">
              <Icons.image className="w-4 h-4 mr-1 text-zinc-400" />
              <p className="font-semibold text-zinc-400 text-xs">15 Gambar</p>
            </div>
          </div>
        ))}
      </section>
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside className="flex">{thumbs}</aside>
      </section>
    </>
  );
}

function TambahGaleriDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Icons.plus className="w-4 h-4 mr-1" />
          Tambah Galeri
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Galeri</DialogTitle>
          <DialogDescription>
            Tambahkan galeri foto atau gambar di sini. Jangan lupa untuk
            menyimpannya setelah selesai.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Input type="email" placeholder="Judul Galeri" />
        <div className="bg-zinc-100 border-4 relative border-dotted border-zinc-200 aspect-square rounded-xl">
          <Icons.uploadCloud className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-zinc-400" />
        </div>
        <DialogFooter>
          <Button type="submit">Simpan Galeri</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
