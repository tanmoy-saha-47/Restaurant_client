import { NextResponse } from "next/server";
import { menuData } from "@/data/menuData";

export async function GET(request: Request) {
  return NextResponse.json(menuData);
}
