import { Sidebar } from "@/components/sidebar";
import { TypographyH2 } from "@/components/ui/typography";

export default function DashboardPage() {
  return (
    <div className="flex">
      <div className="h-screen w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 py-14 px-8">
        <TypographyH2>Dashboard</TypographyH2>
      </div>
    </div>
  );
}
