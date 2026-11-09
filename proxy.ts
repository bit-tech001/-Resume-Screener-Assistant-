
import { NextResponse, type NextRequest } from "next/server";

import {
  COOKIE_NAME,
  REDIRECT_COOKIE_NAME,
  REDIRECT_MAX_AGE_SECONDS,
  verifySessionToken,
} from "@/lib/session";

const AUTH_PATHS = ["/login", "/signup"];

const PROTECTED_PATHS = [
  "/",
  "/dashboard",
  "/analyzer",
  "/history",
  "/analysis",
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (path) =>
      pathname === path || pathname.startsWith(`${path}/`)
  );
}

function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.includes(pathname);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await verifySessionToken(
    request.cookies.get(COOKIE_NAME)?.value
  );

  if (isAuthPath(pathname)) {
    if (session) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }

    return NextResponse.next();
  }

  if (isProtectedPath(pathname) && !session) {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );

    if (pathname !== "/") {
      response.cookies.set(REDIRECT_COOKIE_NAME, pathname, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: REDIRECT_MAX_AGE_SECONDS,
      });
    }

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/analyzer/:path*",
    "/history/:path*",
    "/analysis/:path*",
    "/login",
    "/signup",
  ],
};
