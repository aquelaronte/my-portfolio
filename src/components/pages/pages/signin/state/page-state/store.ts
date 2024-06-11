import type { signInCredentials } from '@/core/user/domain'
import type { Store } from '@/types'
import type { FormState } from '@/types/async-state'
import {
  initializeAsyncState,
  initializeAsyncStateData,
  initializeAsyncStateError,
  initializeAsyncStateLoading
} from '@/utils/async-state'
import type { FormEvent } from 'react'
import { createStore } from 'zustand/vanilla'
import { z } from 'zod'

export type SignInPageStoreState = {
  signInForm: FormState<{ token: string }, signInCredentials>
}

export type SignInPageStoreActions = {
  signInForm: {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
    validationError: (error: z.ZodError<signInCredentials>) => void
    setToken: (token: string) => Promise<void>
  }
}

export type SignInPageStore = Store<
  SignInPageStoreState,
  SignInPageStoreActions
>

export const signInPageStoreDefaultInitialState: SignInPageStoreState = {
  signInForm: {
    data: initializeAsyncState(),
    error: undefined,
    validationError: undefined
  }
}

export const createSignInPageStore = (
  initState: SignInPageStoreState = signInPageStoreDefaultInitialState
) => {
  return createStore<SignInPageStore>()((set) => ({
    state: initState,
    actions: {
      signInForm: {
        setToken: async (token) => {
          await fetch('/api/user/sign-in', {
            method: 'PUT',
            body: JSON.stringify({ token })
          })
        },
        validationError: (error) => {
          set(() => ({
            state: {
              signInForm: {
                data: initializeAsyncState(),
                error: undefined,
                validationError: error
              }
            }
          }))
        },
        onSubmit: async (event) => {
          try {
            set(() => ({
              state: {
                signInForm: {
                  data: initializeAsyncStateLoading(),
                  error: undefined,
                  validationError: undefined
                }
              }
            }))

            const formData = new FormData(event.currentTarget)
            const email = formData.get('email') as string
            const password = formData.get('password') as string

            const response = await fetch('/api/user/sign-in', {
              body: JSON.stringify({ email, password }),
              method: 'POST'
            })

            if (response.status !== 200) {
              throw new Error('Invalid email or password')
            }

            const { token, error } = await response.json()

            if (error) {
              throw new Error(error)
            }

            set(() => ({
              state: {
                signInForm: {
                  data: initializeAsyncStateData({ token }),
                  error: undefined,
                  validationError: undefined
                }
              }
            }))
          } catch (e) {
            const error = Error(`${e}`)

            set(() => ({
              state: {
                signInForm: {
                  data: initializeAsyncStateError(error.message),
                  validationError: undefined,
                  error: error.message
                }
              }
            }))
          }
        }
      }
    }
  }))
}
