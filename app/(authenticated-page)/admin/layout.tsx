"use client";

import { Icons } from "@/components/icons";
import AppLayout from "@/components/layouts/app-layout";
import { Sidebar } from "@/components/sidebar";
import { ReactNode, useState } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <AppLayout>
      <div className="min-h-screen bg-zinc-50 lg:flex">
        <nav className="px-4 py-4 flex items-center justify-between bg-white border-b lg:hidden">
          <div className="bg-zinc-900 w-6 h-6 rounded-full" />
          <Icons.menu
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </nav>
        {isMenuOpen && (
          <div className="bg-white border-r absolute z-20 w-full lg:static lg:w-1/4 lg:h-screen">
            <Sidebar setIsMenuOpen={setIsMenuOpen} />
          </div>
        )}
        <div className="bg-white border-r absolute z-20 hidden w-full lg:block lg:static lg:w-1/4 lg:h-screen">
          <Sidebar setIsMenuOpen={setIsMenuOpen} />
        </div>
        <div className="py-8 px-4 lg:py-14 lg:px-8 lg:w-3/4">{children}</div>
      </div>
    </AppLayout>
  );
}
