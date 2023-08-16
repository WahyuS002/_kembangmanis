"use client";

import GalleryCard from "@/components/ui/gallery-card";
import PaginationControls from "@/components/ui/pagination-controls";
import { TypographyH1 } from "@/components/ui/typography";
import axios from "axios";
import { MetaData } from "@/store/types";
import { useEffect, useState } from "react";

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState([]);
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
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchGalleries();
  }, [currentPage]);

  return (
    <div className="min-h-screen pt-10">
      <TypographyH1 className="text-center max-w-3xl mx-auto pb-20">
        Galeri Desa Kembang Manis
      </TypographyH1>
      <section className="mt-4 grid gap-5 container lg:grid-cols-4">
        {galleries.map((gallery, index) => (
          <GalleryCard gallery={gallery} key={index} />
        ))}
      </section>
      <PaginationControls
        pagination={pagination}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
