'use client'

import { type ReactNode, createContext, useContext, useRef } from 'react'
import { type StoreApi, useStore } from 'zustand'
import { type SignInPageStore, createSignInPageStore } from './store'

export const SignInPageStoreContext =
  createContext<StoreApi<SignInPageStore> | null>(null)

export interface SignInPageStoreProviderProps {
  children: ReactNode
}
export const SignInPageStoreProvider = ({
  children
}: SignInPageStoreProviderProps) => {
  const storeRef = useRef<StoreApi<SignInPageStore>>()

  if (!storeRef.current) {
    storeRef.current = createSignInPageStore()
  }

  return (
    <SignInPageStoreContext.Provider value={storeRef.current}>
      {children}
    </SignInPageStoreContext.Provider>
  )
}

export const useSignInPageStore = <T,>(
  selector: (store: SignInPageStore) => T
): T => {
  const signInPageStoreContext = useContext(SignInPageStoreContext)

  if (!signInPageStoreContext) {
    throw new Error(
      'useSignInPageStore must be used within a SignInPageStoreProvider'
    )
  }

  return useStore(signInPageStoreContext, selector)
}
