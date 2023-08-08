"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";
import axios from "@/lib/axios";
import { Toaster, toast } from "sonner";
import { Input } from "./input";
import { delay } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface RejectedFile {
  file: File;
  errors: { code: string; message: string }[];
}

interface FileWithPreview extends File {
  preview: string;
}

interface DropzoneProps {
  className?: string;
}

interface Errors {
  title?: string[];
}

const Dropzone: React.FC<DropzoneProps> = ({ className }) => {
  const router = useRouter();

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);
  const [title, setTitle] = useState<string>("");
  const [errors, setErrors] = useState<Errors>();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [
        ...previousFiles,
        ...rejectedFiles.map((file) => ({ file, errors: [] })),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxSize: 1024 * 1000,
    onDrop: (acceptedFiles, fileRejections) => {
      const rejectedFiles = fileRejections.map((rejection) => rejection.file);

      if (acceptedFiles.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (rejectedFiles.length) {
        setRejected((previousFiles) => [
          ...previousFiles,
          ...rejectedFiles.map((file) => ({ file, errors: [] })),
        ]);
      }
    },
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: string) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    files.forEach((image) => formData.append("images[]", image));

    try {
      const response = await axios.post("/api/galleries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(`Berhasil menambahkan galeri ${title}`);
      await delay(1000).then(() => router.push(`/admin/galleries`));
      // Reset form fields and uploaded files after successful upload
      setFiles([]);
      setTitle("");
    } catch (error: any) {
      toast.error("Error uploading images");
      setErrors(error.response.data.errors);
    }
  };

  return (
    <>
      <Toaster />
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Judul Galeri"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl shadow-sm"
          />
          {errors?.title && (
            <span className="text-xs text-red-500">{errors.title}</span>
          )}
        </div>
        <div
          {...getRootProps({
            className: className,
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4 bg-zinc-100 border-4 relative border-dotted border-zinc-200 h-[200px] rounded-xl text-zinc-500">
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Seret &amp; letakkan berkas di sini, atau klik untuk memilih
                berkas
              </p>
            )}
          </div>
        </div>

        {/* Preview */}
        <section className="mt-10">
          <div className="flex gap-4 items-center">
            <TypographyH3>Preview</TypographyH3>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={removeAll}
            >
              Remove all files
            </Button>
          </div>

          {/* Accepted files */}
          <h3 className="text-zinc-600 mt-10 border-b pb-3">Accepted Files</h3>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
            {files.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-contain rounded-md"
                />
                <button
                  type="button"
                  className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                  onClick={() => removeFile(file.name)}
                >
                  <Icons.x className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                </button>
                <p className="mt-2 text-zinc-500 text-[12px] font-medium">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>

          {/* Rejected Files */}
          <h3 className="text-zinc-600 mt-24 border-b pb-3">Rejected Files</h3>
          <ul className="mt-6 flex flex-col">
            {rejected.map(({ file, errors }) => (
              <li key={file.name} className="flex items-start justify-between">
                <div>
                  <p className="mt-2 text-zinc-500 text-sm font-medium">
                    {file.name}
                  </p>
                  <ul className="text-[12px] text-red-400">
                    {errors.map((error) => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeRejected(file.name)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex justify-end mt-8">
          <Button>Tambah Galeri</Button>
        </div>
      </form>
    </>
  );
};

export default Dropzone;
