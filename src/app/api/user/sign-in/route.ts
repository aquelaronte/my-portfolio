import { UserPresentation } from '@/core/user/presentation'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const userPresentation = new UserPresentation()

  try {
    const { token } = await userPresentation.signIn.execute({ email, password })
    return Response.json({ token }, { status: 200 })
  } catch (e) {
    const error = new Error(`${e}`)

    return Response.json({ error: error.message }, { status: 400 })
  }
}

export async function PUT(req: Request) {
  const { token } = await req.json()

  if (!token) {
    return Response.json({ error: 'Token is required' }, { status: 400 })
  }

  const cookieStore = cookies()

  cookieStore.set('AUTH_TOKEN', token)

  return Response.json({ token }, { status: 200 })
}

export async function DELETE(req: Request) {
  const cookieStore = cookies()

  cookieStore.delete('AUTH_TOKEN')

  return Response.json({ message: 'Token removed' }, { status: 200 })
}
