import ProfileCard from "@/components/profile-card";
import { TypographyH1 } from "@/components/ui/typography";
import Image from "next/image";
import strukturPemerintahImg from "@/public/images/struktur-pemerintah.png";

export default function StructuresPage() {
  return (
    <div className="min-h-screen pt-10">
      <TypographyH1 className="text-center max-w-3xl mx-auto pb-20">
        Struktur Pemerintah Desa Kembang Manis
      </TypographyH1>
      <Image
        src={strukturPemerintahImg}
        alt="Struktur Pemerintah Desa Kembang Manis"
      />
    </div>
  );
}
