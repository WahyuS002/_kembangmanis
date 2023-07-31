import { TypographyH2 } from "@/components/ui/typography";
import { Icons } from "@/components/icons";

export default function AdminBeritaPage() {
  return (
    <>
      <TypographyH2>Berita</TypographyH2>
      <section className="mt-4 grid grid-cols-4 gap-5">
        {[...Array(4)].map(() => (
          <div>
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
