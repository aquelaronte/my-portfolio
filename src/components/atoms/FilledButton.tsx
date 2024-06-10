import { mergeClassnames } from '@/utils/merge-classnames'
import React, { ButtonHTMLAttributes, type ReactNode } from 'react'

export interface FilledButtonProps {
  children?: ReactNode
  className?: string
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>
}
function FilledButton({ children, className, attributes }: FilledButtonProps) {
  return (
    <button
      className={mergeClassnames(
        'bg-primary flex flex-row justify-center items-center',
        'text-white font-bold text-body px-16 py-3',
        'w-full rounded-full text-primaryContrast',
        className
      )}
      {...attributes}
    >
      {children}
    </button>
  )
}

export default FilledButton
