import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";

export default function AdminWebConfigPage() {
  return (
    <>
      <TypographyH2>Konfigurasi Website</TypographyH2>
      <p className="mt-4">Infografis Desa</p>
      <Label htmlFor="password">Password</Label>
      {/* <Input
        id="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /> */}
    </>
  );
}
