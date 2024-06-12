import { NextRequest, NextResponse } from 'next/server'

export function signInMiddlware(request: NextRequest): NextResponse<unknown> {
  if (request.nextUrl.pathname.startsWith('/signin')) {
    const authCookie = request.cookies.get('AUTH_TOKEN')

    if (authCookie) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  return NextResponse.next()
}
