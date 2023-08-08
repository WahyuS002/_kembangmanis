import Link from "next/link";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useState } from "react";
import { Separator } from "./ui/separator";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Struktur", href: "/structures" },
  { name: "Galeri", href: "/galleries" },
  { name: "Berita", href: "/posts" },
];

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="py-10 items-center justify-between font-medium container mx-auto hidden md:flex">
        <Link href="/">Desa Kembang Manis</Link>
        <ul className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
          <Button>
            <Link href="/login">Masuk</Link>
          </Button>
        </ul>
      </nav>
      <nav className="px-8 pt-10 flex items-center justify-between lg:hidden">
        <div className="bg-zinc-900 w-6 h-6 rounded-full" />
        <Icons.menu
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </nav>
      {isMenuOpen && (
        <ul className="px-8 py-4 sticky top-0 bg-white w-full h-screen text-zinc-600 mt-4">
          {navItems.map((item, index) => (
            <>
              <li key={index}>
                <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              </li>
              <Separator className="mt-2 mb-4" />
            </>
          ))}
          <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
            <Link href="/login">Masuk</Link>
          </Button>
        </ul>
      )}
    </>
  );
}
