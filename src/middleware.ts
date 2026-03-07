
import { clerkClient, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const allowedPaths = {
  AGENT: '/dashboard/agent',
  HOST: '/dashboard/short-stay',
  TENANT: '/dashboard/tenant',
  ADMIN: '/dashboard/admin',
};

export async function middleware(req) {
  const { userId, session } = getAuth(req);

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  const user = await clerkClient.users.getUser(userId);
  const role = user.publicMetadata.role;

  // Check if the user is trying to access a path they are not cleared for
  const requestedPath = req.nextUrl.pathname;
  const allowedPath = allowedPaths[role];

  if (requestedPath !== allowedPath && !requestedPath.startsWith(allowedPath)) {
    return NextResponse.redirect(new URL(allowedPath, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/agent(.*)',
    '/dashboard/short-stay(.*)',
    '/dashboard/tenant(.*)',
    '/dashboard/admin(.*)',
  ],
};
