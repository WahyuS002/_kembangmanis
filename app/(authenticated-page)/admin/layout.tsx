import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex">
      <div className="h-screen w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 py-14 px-8">{children}</div>
    </div>
  );
}
