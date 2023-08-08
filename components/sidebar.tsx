"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

const items = [
  // {
  //   icon: <Icons.layoutDashboard className="h-4 w-4 mr-2" />,
  //   label: "dashboard",
  //   link: "dashboard",
  // },
  {
    icon: <Icons.layoutPanelTop className="h-4 w-4 mr-2" />,
    label: "struktur",
    link: "structures",
  },
  {
    icon: <Icons.image className="h-4 w-4 mr-2" />,
    label: "galeri",
    link: "galleries",
  },
  {
    icon: <Icons.newspaper className="h-4 w-4 mr-2" />,
    label: "berita",
    link: "posts",
  },
  {
    icon: <Icons.users className="h-4 w-4 mr-2" />,
    label: "user",
    link: "users",
  },
];

export function Sidebar({ className }: any) {
  const pathname = usePathname();

  const isLinkActive = (link: string) => {
    // Check if the current route matches the link
    return pathname === `/admin/${link}`;
  };

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href="/">
            <h2 className="mb-2 px-4 text-2xl font-bold tracking-tight">
              Kembang Manis
            </h2>
          </Link>
          <div className="space-y-1">
            {items.map((item) => (
              <Link
                href={`/admin/${item.link}`}
                className="flex items-center"
                key={`${item.link}`}
              >
                <Button
                  variant={isLinkActive(item.link) ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  {item.icon}
                  <span className="capitalize">{item.label}</span>
                </Button>
              </Link>
            ))}
            <Separator className="my-6" />
            <Link href="/admin/web-config" className="flex items-center">
              <Button
                variant={isLinkActive("web-config") ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Icons.settings className="h-4 w-4 mr-2" />
                <span className="capitalize">Konfigurasi Website</span>
              </Button>
            </Link>
            <Link href="#logout" className="flex items-center">
              <Button variant="ghost" className="w-full justify-start">
                <Icons.logOut className="h-4 w-4 mr-2" />
                <span className="capitalize">Log Out</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
