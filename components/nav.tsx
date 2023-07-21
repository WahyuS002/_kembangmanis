import Link from "next/link";
import { Button } from "./ui/button";

export default function Nav() {
  return (
    <nav className="py-10 flex items-center justify-between font-medium container mx-auto">
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
  );
}
