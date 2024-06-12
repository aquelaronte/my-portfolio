import Form from '@/components/atoms/Form'
import { mergeClassnames } from '@/utils/merge-classnames'
import React, { type ReactNode } from 'react'
import type { signInCredentials } from '@/core/user/domain'

export type SignInFormProps = {
  children?: ReactNode
  className?: string
}
function SignInForm({ children, className }: SignInFormProps) {
  return (
    <Form<signInCredentials> className={mergeClassnames(className)}>
      {children}
    </Form>
  )
}

export default SignInForm
