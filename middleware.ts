import { NextRequest, NextResponse } from "next/server"

// ── Brand subdomains → internal routes ──
// ford.auapw.org → /brands/ford
// toyota.auapw.org → /brands/toyota
// etc.

const MAIN_DOMAINS = ["auapw.org", "www.auapw.org", "localhost:3000", "localhost"]

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""
  const url = request.nextUrl.clone()

  // Skip for main domain, API routes, static files
  if (
    MAIN_DOMAINS.some((d) => hostname.includes(d)) ||
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/static") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Extract subdomain: ford.auapw.org → "ford"
  const subdomain = hostname.split(".")[0]

  if (subdomain && subdomain !== "www") {
    // Rewrite to /brands/[brand] route
    url.pathname = `/brands/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
