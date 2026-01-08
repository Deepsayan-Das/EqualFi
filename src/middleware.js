import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Define routes that do NOT require login
const isPublicRoute = createRouteMatcher([
  '/authn(.*)', 
  '/', 
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 2. If the user is NOT logged in and trying to access a private route
  if (!userId && !isPublicRoute(req)) {
    // Redirect them to the login page
    const signInUrl = new URL('/authn', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // 3. If the user IS logged in and trying to access the login page
  if (userId && isPublicRoute(req) && req.nextUrl.pathname.startsWith('/authn')) {
    // Redirect them to the dashboard
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};