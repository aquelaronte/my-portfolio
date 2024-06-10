import type { FormHTMLAttributes, FormEvent, ReactNode } from 'react'
import { type ZodObject, type ZodType, ZodError } from 'zod'

export interface FormProps<T extends unknown> {
  children?: ReactNode
  validation?: ZodObject<{ [K in keyof T]: ZodType<T[K]> }>
  className?: string
  attributes?: FormHTMLAttributes<HTMLFormElement>
  onValidationFail?: (error: ZodError<T>) => void
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  onSubmissionFail?: (error: unknown) => void
}
function Form<T extends unknown>({
  children,
  validation,
  className,
  attributes,
  onSubmit,
  onValidationFail,
  onSubmissionFail
}: FormProps<T>) {
  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        try {
          validation?.parse(data)
          onSubmit?.(event)
        } catch (error) {
          if (error instanceof ZodError) {
            onValidationFail?.(error)
          } else {
            onSubmissionFail?.(error)
          }
        }
      }}
      {...attributes}
    >
      {children}
    </form>
  )
}

export default Form
