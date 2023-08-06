import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import Link from "next/link";

export default function AdminNewsPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <TypographyH2>Berita</TypographyH2>
        <Button variant="default">
          <Link href="/admin/news/create" className="flex items-center">
            <Icons.plus className="w-4 h-4 mr-1" />
            Tambah Berita
          </Link>
        </Button>
      </div>
      <section className="mt-4 grid grid-cols-4 gap-5">
        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <div className="aspect-square rounded-lg bg-zinc-900" />
            <p className="mt-4 font-medium">Lorem ipsum, dolor...</p>
            <div className="flex items-center mt-2">
              <div className="bg-zinc-900 w-5 h-5 rounded-full" />
              <div className="ml-2">
                <p className="text-sm font-semibold text-zinc-600">
                  Wahyu Syahputra
                </p>
                <p className="text-xs text-zinc-400">1 Agustus 2023</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
