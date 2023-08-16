import { NextResponse } from "next/server";
import data from "@/data/posts.json";

const posts = data;

export async function GET(request: Request) {
  const data = posts.data;

  return NextResponse.json({ data });
}
