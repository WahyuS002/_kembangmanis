import Dropzone from "@/components/ui/dropzone";
import { TypographyH2 } from "@/components/ui/typography";

export default function CreateGalleriesPage() {
  return (
    <>
      <TypographyH2 className="mb-4">Tambah Galeri</TypographyH2>
      <Dropzone />
    </>
  );
}
