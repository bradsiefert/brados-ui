"use client"

import { MoonIcon, PaletteIcon, SunIcon } from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import * as React from "react"

import { usePaletteSource, writePalette } from "@/components/palette-source"
import { useUiPreset } from "@/components/ui-preset-provider"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

function subscribeToClient() {
  return () => {}
}

function useIsClient() {
  return React.useSyncExternalStore(subscribeToClient, () => true, () => false)
}

export function ThemeSelector() {
  const { resolvedTheme, setTheme } = useTheme()
  const { preset, setPreset } = useUiPreset()
  const palette = usePaletteSource()
  const isClient = useIsClient()

  if (!isClient) {
    return <div aria-hidden className="h-9 w-[28rem] shrink-0" />
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <ToggleGroup
        aria-label="Palette source"
        variant="outline"
        value={[palette]}
        onValueChange={(value) => {
          const next = value[0]
          if (next === "gds" || next === "tailwind") {
            writePalette(next)
          }
        }}
      >
        <ToggleGroupItem value="gds" aria-label="GDS standard palette">
          GDS
        </ToggleGroupItem>
        <ToggleGroupItem value="tailwind" aria-label="Tailwind palette">
          Tailwind
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup
        variant="outline"
        value={[preset]}
        onValueChange={(value) => {
          const next = value[0]
          if (next === "custom" || next === "coss-default") {
            setPreset(next)
          }
        }}
      >
        <ToggleGroupItem value="custom" aria-label="Custom theme preset">
          <PaletteIcon aria-hidden="true" />
          Custom
        </ToggleGroupItem>
        <ToggleGroupItem value="coss-default" aria-label="COSS default preset">
          COSS
        </ToggleGroupItem>
      </ToggleGroup>
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
          <SunIcon aria-hidden="true" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark mode">
          <MoonIcon aria-hidden="true" />
          Dark
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
