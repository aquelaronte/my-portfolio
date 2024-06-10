import SignInPage from '@/components/pages/pages/signin/page'
import { SignInPageStoreProvider } from '@/components/pages/pages/signin/state/page-state'
import React from 'react'

function SignIn() {
  return (
    <SignInPageStoreProvider>
      <SignInPage />
    </SignInPageStoreProvider>
  )
}

export default SignIn
