import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ isValid: false }, { status: 400 });
  }

  try {
    const response = await axios.get(url);
    if (
      response.status === 200 &&
      response.headers["content-type"].includes("image")
    ) {
      return NextResponse.json({ isValid: true });
    } else {
      return NextResponse.json({ isValid: false });
    }
  } catch {
    return NextResponse.json({ isValid: false });
  }
}
