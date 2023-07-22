import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";

export function Sidebar({ className }: any) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Kembang Manis
          </h2>
          <div className="space-y-1">
            <Link href="/admin/dashboard" className="flex items-center">
              <Button variant="secondary" className="w-full justify-start">
                <Icons.layoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/struktur" className="flex items-center">
              <Button variant="ghost" className="w-full justify-start">
                <Icons.layoutPanelTop className="h-4 w-4 mr-2" />
                Struktur
              </Button>
            </Link>
            <Link href="/admin/galeri" className="flex items-center">
              <Button variant="ghost" className="w-full justify-start">
                <Icons.image className="h-4 w-4 mr-2" />
                Galeri
              </Button>
            </Link>
            <Link href="/admin/berita" className="flex items-center">
              <Button variant="ghost" className="w-full justify-start">
                <Icons.newspaper className="h-4 w-4 mr-2" />
                Berita
              </Button>
            </Link>
            <Link href="/admin/user" className="flex items-center">
              <Button variant="ghost" className="w-full justify-start">
                <Icons.users className="h-4 w-4 mr-2" />
                User
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
