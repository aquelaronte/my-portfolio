'use client'

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'

export type ProvidersProps = {
  children: React.ReactNode
}
function Providers({ children }: ProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>{children}</HydrationBoundary>
    </QueryClientProvider>
  )
}

export default Providers
