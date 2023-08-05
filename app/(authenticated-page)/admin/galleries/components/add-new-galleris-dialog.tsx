import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "@/lib/axios";
import Image from "next/image";
import { Icons } from "@/components/icons";

interface FileWithPreview extends File {
  preview: string;
}

export default function AddNewGalleriesDialog() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [title, setTitle] = useState<string>("");

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    files.forEach((file) => formData.append("files[]", file));

    console.log("Form data:", formData);

    try {
      const response = await axios.post("/api/galleries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
      // Reset form fields and uploaded files after successful upload
      setFiles([]);
      setTitle("");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const addMorePhotos = () => {};

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
        // alt={`${file.name} preview`}
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
  }, [files]);

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

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Input
            type="text"
            placeholder="Judul Galeri"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {files.length > 0 ? (
            <div className="bg-zinc-100 border-4 relative border-dotted border-zinc-200 aspect-square rounded-xl cursor-pointer p-2 overflow-auto my-6">
              <div className="flex justify-center flex-wrap">
                <div
                  className="p-4 flex flex-col justify-center items-center w-32 h-32 relative rounded-md overflow-hidden mr-2 mb-2 bg-zinc-200"
                  onClick={addMorePhotos}
                >
                  <Icons.plusCircle className="w-6 h-6 text-zinc-400" />
                  <p className="text-center text-xs text-zinc-400 font-semibold mt-2">
                    Tambahkan Foto Lainnya
                  </p>
                </div>
                {thumbs}
              </div>
            </div>
          ) : (
            <div
              className="bg-zinc-100 border-4 relative border-dotted border-zinc-200 aspect-square rounded-xl cursor-pointer p-2 overflow-auto my-6"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <Icons.uploadCloud className="w-16 h-16 text-zinc-400" />
                <span className="mt-2 text-zinc-400 font-semibold">
                  Upload Galeri
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit">Simpan Galeri</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
