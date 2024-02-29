import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isLoggedIn: boolean = false;

export function middleware(request: NextRequest) {
  const cookies = request.headers.get("Cookie");
  const token = cookies
    ?.split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (isLoggedIn || token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/"],
};
