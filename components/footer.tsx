import Link from "next/link";
import { Icons } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 px-4 text-white sm:px-5 md:px-10 lg:px-20">
      <div className="container mx-auto py-8 md:py-12">
        <div className="flex flex-col justify-between lg:flex-row lg:items-center">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <Link className="lg:pr-4" href="/">
              <div className="w-8 h-8 rounded-full bg-zinc-100" />
            </Link>
            <div className="mx-6 hidden h-5 border-r sm:block" />
            <div className="mt-3 text-xs sm:mb-1.5 lg:mt-[3px] lg:pl-4">
              Website Desa Kembang Manis
            </div>
          </div>
          <div className="mt-10 flex flex-col space-y-3 sm:mt-6 sm:flex-row sm:space-y-0 sm:space-x-9 lg:mt-0">
            <Link className="text-xs font-bold" href="/">
              Beranda
            </Link>
            <Link className="text-xs font-bold" href="/structures">
              Struktur
            </Link>
            <Link className="text-xs font-bold" href="/galleries">
              Galeri
            </Link>
            <Link className="text-xs font-bold" href="/posts">
              Berita
            </Link>
          </div>
        </div>
        <hr className="my-8 border-white/50 lg:my-9 lg:border-white/20" />
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex flex-col text-xs items-center sm:flex-row sm:space-x-5">
            <span>Copyright © 2023 KKN 215, Inc. All rights reserved.</span>
            <div className="flex space-x-4 lg:space-x-3 mt-3 sm:mt-0">
              <Link
                href="https://www.instagram.com/desa.kembang.manis/"
                target="_blank"
                rel="noreferrer"
                className="font-bold"
              >
                <Icons.instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=100073082875856"
                target="_blank"
                rel="noreferrer"
                className="font-bold"
              >
                <Icons.facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
