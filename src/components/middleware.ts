'use server'

import { NextRequest, NextResponse } from 'next/server'
import { adminMiddleware } from './pages/pages/admin/middleware'
import { signInMiddlware } from './pages/pages/signin/middleware'

export function mainMiddleware(request: NextRequest): NextResponse<unknown> {
  let response = NextResponse.next()

  switch (request.nextUrl.pathname) {
    case '/admin':
      response = adminMiddleware(request)
      break
    case '/signin':
      response = signInMiddlware(request)
      break
  }

  return response
}
