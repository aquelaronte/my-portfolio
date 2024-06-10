'use client'

import type { signInCredentials } from '@/core/user/domain'
import type { ReactNode } from 'react'
import { useSignInPageStore } from './state/page-state'
import Form from '@/components/atoms/Form'
import { z } from 'zod'

export interface SignInPageFormProps {
  children?: ReactNode
  className?: string
}
function SignInPageForm({ children, className }: SignInPageFormProps) {
  const { actions: signInPageActions } = useSignInPageStore((store) => store)

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
