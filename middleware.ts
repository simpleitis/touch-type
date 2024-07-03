import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export const middleware = async (request: NextRequest) => {
  const { nextUrl } = request;

  const session = await auth();

  const isAuthenticated = !!session?.user?.email;
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", nextUrl.origin));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
