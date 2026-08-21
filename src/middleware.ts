import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY_PATHS: Record<string, string> = {
  "/Work": "/work",
  "/About": "/about",
  "/Contact": "/contact",
};

export function middleware(request: NextRequest) {
  const destination = LEGACY_PATHS[request.nextUrl.pathname];
  if (destination) {
    return NextResponse.redirect(new URL(destination, request.url), 308);
  }
}
