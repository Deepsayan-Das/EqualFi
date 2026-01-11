import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 1. Add the callback to the public route list
const isPublicRoute = createRouteMatcher([
  '/authn(.*)', 
  '/', 
  '/authn/sso-callback(.*)',
  '/docs(.*)' // Critical: allow this to process
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // 2. Protect private routes
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL('/authn', req.url));
  }

  // 3. Prevent logged-in users from seeing the login page
  // ONLY redirect if they are logged in AND on the base /authn page
  if (userId && req.nextUrl.pathname === '/authn') {
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