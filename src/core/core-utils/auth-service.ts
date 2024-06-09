import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import 'dotenv/config'

export interface JWTPayload {
  id: string
  email: string
}

export const authService = {
  signJWT: (data: JWTPayload) => jwt.sign(data, process.env.JWT_SECRET!),
  verifyJWT: (token: string) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
    } catch (error) {
      return null
    }
  },
  encryptPWD: async (password: string): Promise<string> =>
    await bcrypt.hash(password, 10),
  verifyPWD: async (password: string, hash: string): Promise<boolean> =>
    await bcrypt.compare(password, hash)
}
