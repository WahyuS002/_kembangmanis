import Nav from "@/components/nav";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import NextTopLoader from "nextjs-toploader";
import MainLayout from "@/components/main-layout";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Desa Kembang Manis",
  description: "Website Desa Kembang Manis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-zinc-900`}>
        <NextTopLoader color="black" />
        <MainLayout>{children}</MainLayout>
        <Analytics />
      </body>
    </html>
  );
}
