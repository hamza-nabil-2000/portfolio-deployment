/**
 * Utility: cn()
 * -----------
 * Combines clsx (conditional class names) with tailwind-merge
 * to resolve conflicting Tailwind classes safely.
 *
 * Usage: cn('px-2', isActive && 'bg-blue-500', className)
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
