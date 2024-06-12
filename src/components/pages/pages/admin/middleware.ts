'use server'

import { NextRequest, NextResponse } from 'next/server'

export function adminMiddleware(request: NextRequest): NextResponse<unknown> {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authCookie = request.cookies.get('AUTH_TOKEN')

    if (!authCookie) {
      const url = new URL(request.url)
      const queryParams = url.searchParams

      const token = queryParams.get('token')

      if (!token) {
        return NextResponse.redirect(new URL('/signin', request.url))
      }

      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  return NextResponse.next()
}
