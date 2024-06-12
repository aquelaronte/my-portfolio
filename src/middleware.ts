'use server'

import type { NextRequest } from 'next/server'
import { mainMiddleware } from './components/middleware'

export function middleware(request: NextRequest) {
  const main = mainMiddleware(request)

  return main
}
