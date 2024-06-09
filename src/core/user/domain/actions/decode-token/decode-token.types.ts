export interface decodeTokenCredentials {
  token: string
}

export interface decodeTokenResponse {
  payload: {
    id: string
    email: string
  } | null
}
