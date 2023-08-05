import ProfileCard from "@/components/profile-card";
import { TypographyH1 } from "@/components/ui/typography";
import profiles from "@/data.json";

export default function StrukturPage() {
  return (
    <div className="min-h-screen pt-10">
      <TypographyH1 className="text-center max-w-3xl mx-auto pb-20">
        Struktur Pemerintah Desa Kembang Manis
      </TypographyH1>
      {profiles &&
        profiles.map((profile, idX) => <ProfileCard key={idX} {...profile} />)}
    </div>
  );
}
