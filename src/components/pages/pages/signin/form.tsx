'use client'

import type { signInCredentials } from '@/core/user/domain'
import { useEffect, type ReactNode } from 'react'
import { useSignInPageStore } from './state/page-state'
import Form from '@/components/atoms/Form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

export interface SignInPageFormProps {
  children?: ReactNode
  className?: string
}
function SignInPageForm({ children, className }: SignInPageFormProps) {
  const { actions: signInPageActions, state: signinPageState } =
    useSignInPageStore((store) => store)

  const router = useRouter()

  useEffect(() => {
    if (signinPageState.signInForm.data.hasValue) {
      signInPageActions.signInForm
        .setToken(signinPageState.signInForm.data.value!.token)
        .then(() => {
          router.push('/admin')
        })
    }
  }, [router, signInPageActions.signInForm, signinPageState])

  return (
    <Form<signInCredentials>
      className={className}
      onSubmit={(event) => signInPageActions.signInForm.onSubmit(event)}
      validation={z.object({
        email: z.string().email(),
        password: z.string().min(8).max(32)
      })}
      onValidationFail={(error) =>
        signInPageActions.signInForm.validationError(error)
      }
    >
      {children}
    </Form>
  )
}

export default SignInPageForm
