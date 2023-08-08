"use client";

import { Icons } from "@/components/icons";
import { TypographyH2 } from "@/components/ui/typography";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Gallery, MetaData } from "@/store/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PaginationControls from "@/components/ui/pagination-controls";
import GalleryCard from "@/components/ui/gallery-card";

export default function AdminGalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [pagination, setPagination] = useState<MetaData>({
    currentPage: 1,
    totalPages: 1,
    prevPageUrl: false,
    nextPageUrl: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const { data } = await axios.get(`/api/galleries?page=${currentPage}`);
        setGalleries(data.data);
        setPagination(data.meta);
      } catch (error) {
        console.log("Error fetching galleries:", error);
      }
    };

    fetchGalleries();
  }, [currentPage]);

  return (
    <>
      <div className="flex items-center justify-between">
        <TypographyH2>Galeri</TypographyH2>
        <Button variant="default" asChild>
          <Link href="/admin/galleries/create">
            <Icons.plus className="w-4 h-4 mr-1" />
            Tambah Galeri
          </Link>
        </Button>
      </div>
      <section className="mt-4 grid lg:grid-cols-4 gap-5">
        {galleries.map((gallery, index) => (
          <GalleryCard gallery={gallery} key={index} />
        ))}
      </section>
      <PaginationControls
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
