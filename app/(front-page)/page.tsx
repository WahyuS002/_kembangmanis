import { TypographyH1, TypographyH2 } from "@/components/ui/typography";
import natureImg from "@/public/images/nature-1.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="pt-24 container mx-auto">
        <div className="flex gap-12 items-center">
          <div className="w-1/2">
            <TypographyH1>
              Website Profil <br /> Desa Kembang Manis
            </TypographyH1>
            <p className="pt-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Explicabo qui aliquid nesciunt consequuntur, quisquam accusantium
              architecto modi cumque, mollitia, quo dolores sint sit corporis
              exercitationem ducimus nisi tempore officiis amet.
            </p>
          </div>
          <div className="w-1/2 h-[30rem] rounded-xl bg-black" />
        </div>
      </main>
      <section className="pt-40 container mx-auto">
        <TypographyH2>Infografis Desa</TypographyH2>
      </section>
      <section className="pt-40 container mx-auto">
        <div className="flex gap-12 items-center">
          <div className="w-1/2 h-[30rem] rounded-xl bg-black" />
          <div className="w-1/2">
            <TypographyH2>Sekilas Tentang Desa Kembang Manis</TypographyH2>
            <p className="pt-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Excepturi asperiores laudantium et atque, suscipit alias aut vel
              ad incidunt totam esse iure quasi facilis distinctio, assumenda
              nemo saepe. Delectus, dolorum!
            </p>
          </div>
        </div>
      </section>
      <section className="py-40 container mx-auto">
        <div className="flex justify-center">
          <TypographyH2>Berita Terbaru</TypographyH2>
        </div>
        <div className="grid grid-cols-3 mt-10 gap-12">
          {[
            [...Array(3)].map((_, index) => (
              <div className="relative overflow-hidden rounded-lg" key={index}>
                <Image className="h-96" src={natureImg} alt="nature" />
                <div className="bg-gradient-to-t from-black to-black/10 blur-lg w-full h-40 absolute bottom-0" />
                <div className="absolute bottom-0 text-white font-medium p-9">
                  <p className="pb-3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Harum natus repellendus autem.
                  </p>
                  <p className="text-xs text-zinc-300">
                    Pengumuman | 2 Hari yang lalu
                  </p>
                </div>
              </div>
            )),
          ]}
        </div>
      </section>
    </div>
  );
}
