import { NextResponse } from "next/server";
import data from "@/data/galleries.json";

const galleries = data;

export async function GET(request: Request) {
  const data = galleries.data;

  return NextResponse.json({ data });
}
