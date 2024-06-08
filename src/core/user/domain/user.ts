export class UserDomain {
  id: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date

  constructor(
    id: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id
    this.email = email
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
