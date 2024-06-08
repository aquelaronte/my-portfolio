import { MediaDomain } from '@/core/media/domain'
import { StackDomain } from '@/core/stack/domain'

export class TechnologyDomain {
  id: string
  rate: number
  name: string
  description: string
  media: MediaDomain
  stack: StackDomain
  createdAt: Date
  updatedAt: Date

  constructor(
    id: string,
    rate: number,
    name: string,
    description: string,
    media: MediaDomain,
    stack: StackDomain,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.rate = rate
    this.name = name
    this.description = description
    this.media = media
    this.stack = stack
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
