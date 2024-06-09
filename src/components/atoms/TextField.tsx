import { mergeClassnames } from '@/utils/merge-classnames'
import React from 'react'

export interface TextFieldProps {
  className?: string
  width?: string
  placeholder?: string
  tabIndex?: number
}
function TextField({
  className,
  width = 'w-full',
  placeholder,
  tabIndex
}: TextFieldProps) {
  return (
    <input
      className={mergeClassnames(
        'border-none bg-surface py-2 px-6 rounded-full placeholder-placeholder text-body',
        'border-transparent focus:border-primary border-solid border-[1px] focus:outline-none focus:ring-0',
        'transition-colors duration-100 ease-in-out',
        width,
        className
      )}
      placeholder={placeholder}
      tabIndex={tabIndex}
      type='text'
    />
  )
}

export default TextField
