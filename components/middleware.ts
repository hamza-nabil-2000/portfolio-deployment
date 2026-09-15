import { NextRequest, NextResponse } from "next/server";

const MAIN_DOMAIN = "hamza-nabil-portfolio.vercel.app";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");

  if (host && host.endsWith(".vercel.app") && host !== MAIN_DOMAIN) {
    const url = request.nextUrl.clone();

    url.protocol = "https:";
    url.host = MAIN_DOMAIN;

    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
