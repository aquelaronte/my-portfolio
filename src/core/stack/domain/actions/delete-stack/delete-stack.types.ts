import { Stack } from '@prisma/client'

export interface deleteStackResponse {
  deletedStack: Stack
}

export interface deleteStackCredentials {
  id: string
}
