"use client";

import { ReactNode } from "react";
import Footer from "./footer";
import Nav from "./nav";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const frontPage = ["/", "/structures", "/galleries", "/posts"];

  if (frontPage.includes(pathname)) {
    return (
      <>
        <Nav />
        {children}
        <Footer />
      </>
    );
  } else {
    return <>{children}</>;
  }
}
