import { NextResponse } from 'next/server';

export function middleware(req) {
  const verify = req.cookies['loggedin'];
  const url = req.nextUrl.clone(); // Clone the request URL for manipulation

  if (!verify && url.pathname.includes('/home')) {
    url.pathname = '/'; // Redirect to the root
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
