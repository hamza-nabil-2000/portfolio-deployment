/**
 * ThemeProvider
 * -------------
 * Thin wrapper around next-themes that enables dark/light/system
 * theme switching for the entire application.
 *
 * Currently the portfolio uses a single dark cyan theme,
 * but this provider is kept for future multi-theme support.
 */
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
