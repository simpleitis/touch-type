import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // An instance of nextAuth which does not have any code which is not edge complatible is created below to access the auth function, rather than importing the auth function from auth.ts
  const { auth } = NextAuth(authConfig);
  const session = await auth();

  const isAuthenticated = !!session?.user?.id;
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", nextUrl.origin));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
