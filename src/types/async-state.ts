import { z } from 'zod'

export type AsyncState<State> = {
  value?: State
  hasValue: boolean
  isLoading: boolean
  hasError: boolean
  error?: unknown
}

export type FormState<State, Credentials> = {
  data: AsyncState<State>
  error: unknown | undefined
  validationError: z.ZodError<Credentials> | undefined
}

export type SetFunction<StoreType> = (
  partial:
    | StoreType
    | Partial<StoreType>
    | ((state: StoreType) => StoreType | Partial<StoreType>),
  replace?: boolean | undefined
) => void
