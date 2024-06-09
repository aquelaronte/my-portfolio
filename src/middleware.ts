'use server'

import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('AUTH_TOKEN')

    if (!authCookie) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }
  }

  return NextResponse.next()
}
