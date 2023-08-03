import Link from "next/link";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { useState } from "react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="py-10 items-center justify-between font-medium container mx-auto hidden md:flex">
        <Link href="/">Desa Kembang Manis</Link>
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/">Beranda</Link>
          </li>
          <li>
            <Link href="/struktur">Struktur</Link>
          </li>
          <li>
            <Link href="/galeri">Galeri</Link>
          </li>
          <li>
            <Link href="/berita">Berita</Link>
          </li>
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
        <ul className="px-8 py-4">
          <li>Lorem, ipsum dolor.</li>
          <li>Lorem, ipsum dolor.</li>
          <li>Lorem, ipsum dolor.</li>
        </ul>
      )}
    </>
  );
}
