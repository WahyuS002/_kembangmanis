import axios from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return "something";
  //   const data = await axios.get("/api/galleries");

  //   return NextResponse.json({ data });
}
