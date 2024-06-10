import { JWTPayload } from '@/core/core-utils'
import { UserPresentation } from '@/core/user/presentation'
import { NextApiRequest, NextApiResponse } from 'next'

type Response = {
  payload?: JWTPayload
  error?: string
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method === 'POST') {
    const { token } = req.body
    const userPresentation = new UserPresentation()

    const { payload } = userPresentation.decodeToken(token)

    if (!payload) {
      res.status(400).json({ error: 'Invalid token' })
      return
    }

    res.status(200).json({ payload })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
