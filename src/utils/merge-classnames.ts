import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function mergeClassnames(...classNames: ClassValue[]): string {
  return twMerge(clsx(...classNames))
}
