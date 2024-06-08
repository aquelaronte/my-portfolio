import { MediaDomain } from '@/core/media'
import { TechnologyDomain } from '@/core/technology/domain'

export class ProjectDomain {
  id: string
  name: string
  description: string
  url: string
  media: MediaDomain
  technologies: TechnologyDomain[]
  createdAt: Date
  updatedAt: Date

  constructor(
    id: string,
    name: string,
    description: string,
    url: string,
    media: MediaDomain,
    technology: TechnologyDomain[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.url = url
    this.media = media
    this.technologies = technology
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
