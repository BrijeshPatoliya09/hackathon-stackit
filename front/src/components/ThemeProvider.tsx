import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  storageKey?: string
  themes?: string[]
  attribute?: "class" | "data-theme"
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "light",
  storageKey = "stackit-theme",
  themes = ["light", "dark"],
  attribute = "class",
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      themes={themes}
      attribute={attribute}
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}