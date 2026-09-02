"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { useUiPreset } from "@/components/ui-preset-provider"
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const paletteFamilies = [
  "neutral",
  "blue",
  "red",
  "emerald",
  "amber",
  "orange",
  "teal",
  "cyan",
  "purple",
  "rose",
] as const

const paletteSteps = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const

type TokenGroup = {
  label: string
  tokens: string[]
}

const semanticGroups: TokenGroup[] = [
  {
    label: "Surfaces",
    tokens: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
    ],
  },
  {
    label: "Brand & accents",
    tokens: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "accent",
      "accent-foreground",
      "muted",
      "muted-foreground",
    ],
  },
  {
    label: "Status",
    tokens: [
      "destructive",
      "destructive-foreground",
      "info",
      "info-foreground",
      "success",
      "success-foreground",
      "warning",
      "warning-foreground",
    ],
  },
  {
    label: "Borders & rings",
    tokens: ["border", "input", "ring"],
  },
  {
    label: "Charts",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
  {
    label: "Sidebar",
    tokens: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ],
  },
]

function useResolvedDeps(): string {
  const { resolvedTheme } = useTheme()
  const { preset } = useUiPreset()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return `${preset}:${resolvedTheme ?? "light"}:${mounted}`
}

function useComputedColor(cssVar: string, deps: string) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const [value, setValue] = React.useState("")

  React.useEffect(() => {
    if (ref.current) {
      setValue(getComputedStyle(ref.current).backgroundColor)
    }
  }, [deps, cssVar])

  return { ref, value }
}

function PaletteSwatch({
  cssVar,
  title,
  className,
}: {
  cssVar: string
  title: string
  className?: string
}) {
  return (
    <span
      title={title}
      className={cn(
        "block h-8 flex-1 border-y border-border first:rounded-l-md first:border-l last:rounded-r-md last:border-r",
        className,
      )}
      style={{ backgroundColor: `var(${cssVar})` }}
    />
  )
}

function TokenSwatch({ token, deps }: { token: string; deps: string }) {
  const cssVar = `--${token}`
  const { ref, value } = useComputedColor(cssVar, deps)

  return (
    <div className="space-y-1.5">
      <span
        ref={ref}
        className="block h-12 w-full rounded-md border border-border"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="space-y-0.5">
        <p className="font-mono text-foreground text-xs">{cssVar}</p>
        <p className="truncate font-mono text-[10px] text-muted-foreground">
          {value || "—"}
        </p>
      </div>
    </div>
  )
}

export function ColorScale() {
  const deps = useResolvedDeps()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Palette</CardTitle>
          <CardDescription>
            Tailwind color families the theme tokens are built from. Steps run
            from 50 to 950.
          </CardDescription>
        </CardHeader>
        <CardPanel className="space-y-3">
          <div className="flex items-center gap-3 ps-16">
            {paletteSteps.map((step) => (
              <span
                key={step}
                className="flex-1 text-center font-mono text-[10px] text-muted-foreground"
              >
                {step}
              </span>
            ))}
          </div>
          {paletteFamilies.map((family) => (
            <div key={family} className="flex items-center gap-3">
              <span className="w-16 shrink-0 font-mono text-foreground text-xs capitalize">
                {family}
              </span>
              <div className="flex flex-1">
                {paletteSteps.map((step) => (
                  <PaletteSwatch
                    key={step}
                    cssVar={`--color-${family}-${step}`}
                    title={`--color-${family}-${step}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </CardPanel>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Semantic tokens</CardTitle>
          <CardDescription>
            Role-based tokens that components consume. Values update with the
            active preset and light/dark mode.
          </CardDescription>
        </CardHeader>
        <CardPanel className="space-y-6">
          {semanticGroups.map((group) => (
            <div key={group.label} className="space-y-3">
              <p className="font-medium text-muted-foreground text-xs">
                {group.label}
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {group.tokens.map((token) => (
                  <TokenSwatch key={token} token={token} deps={deps} />
                ))}
              </div>
            </div>
          ))}
        </CardPanel>
      </Card>
    </div>
  )
}
