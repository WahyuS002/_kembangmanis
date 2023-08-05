"use client";

import { Icons } from "@/components/icons";
import { TypographyH2 } from "@/components/ui/typography";
import AddNewGalleriesDialog from "./components/add-new-galleris-dialog";

export default function AdminGalleriesPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <TypographyH2>Galeri</TypographyH2>
        <AddNewGalleriesDialog />
      </div>
      <section className="mt-4 grid grid-cols-4 gap-5">
        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <div className="aspect-square rounded-lg bg-zinc-900" />
            <p className="mt-4 font-medium">Dokumentasi Kuda Terbang</p>
            <div className="flex items-center mt-2">
              <Icons.image className="w-4 h-4 mr-1 text-zinc-400" />
              <p className="font-semibold text-zinc-400 text-xs">15 Gambar</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
