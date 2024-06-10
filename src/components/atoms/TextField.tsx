import { mergeClassnames } from '@/utils/merge-classnames'
import React, { InputHTMLAttributes } from 'react'

export interface TextFieldProps {
  className?: string
  attributes?: InputHTMLAttributes<HTMLInputElement>
}
function TextField({ className, attributes }: TextFieldProps) {
  return (
    <input
      className={mergeClassnames(
        'border-none bg-surface py-2 px-6 rounded-full placeholder-placeholder text-body',
        'border-transparent focus:border-primary border-solid border-[1px] focus:outline-none focus:ring-0',
        'transition-colors duration-100 ease-in-out w-full',
        className
      )}
      {...attributes}
    />
  )
}

export default TextField
