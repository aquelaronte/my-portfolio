import { UserPresentation } from '@/core/user/presentation'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const userPresentation = new UserPresentation()
  console.log('email', email)
  console.log('password', password)

  try {
    const { token } = await userPresentation.signIn({ email, password })
    return Response.json({ token }, { status: 200 })
  } catch (error) {
    return Response.json({ error }, { status: 400 })
  }
}
