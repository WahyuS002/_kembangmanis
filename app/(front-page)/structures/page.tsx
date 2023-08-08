import { TypographyH1 } from "@/components/ui/typography";
import axios from "@/lib/axios";
import Image from "next/image";

async function getStructureImage() {
  const { data } = await axios.get("/api/settings/structure-image");
  return data.structureImage;
}

export default async function StructuresPage() {
  const structureImage = await getStructureImage();

  return (
    <div className="min-h-screen pt-10">
      <TypographyH1 className="text-center max-w-3xl mx-auto pb-20">
        Struktur Pemerintah Desa Kembang Manis
      </TypographyH1>
      <div className="flex justify-center">
        <Image src={structureImage} width={1080} height={1080} alt="" />
      </div>
    </div>
  );
}
