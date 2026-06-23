"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ThemeSelector() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div aria-hidden className="h-9 w-[8.5rem] shrink-0" />
  }

  return (
    <ToggleGroup
      variant="outline"
      value={resolvedTheme ? [resolvedTheme] : []}
      onValueChange={(value) => {
        const next = value[0]
        if (next === "light" || next === "dark") {
          setTheme(next)
        }
      }}
    >
      <ToggleGroupItem value="light" aria-label="Light mode">
        <Sun aria-hidden="true" />
        Light
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Dark mode">
        <Moon aria-hidden="true" />
        Dark
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
