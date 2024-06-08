export class MediaDomain {
  id: string
  name: string
  description: string
  key: string
  createdAt: Date
  updatedAt: Date

  constructor(
    id: string,
    name: string,
    description: string,
    key: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.key = key
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
