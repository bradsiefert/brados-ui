"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { usePaletteSource } from "@/components/palette-source"
import { useUiPreset } from "@/components/ui-preset-provider"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  gdsFamilies,
  gdsNeutralEnds,
  gdsSteps,
  gdsSwatches,
} from "@/lib/gds-palette"
import { cn } from "@/lib/utils"

const paletteCopy = {
  gds: "GDS standard scale. Steps run from 100 to 1000. Primary is the blue ramp, shared with info. Neutral also has lightest and darkest. This view does not restyle components.",
  tailwind:
    "Tailwind color families the theme tokens are built from. Steps run from 50 to 950.",
}

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
    label: "Brand & Accents",
    tokens: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "accent",
      "accent-foreground",
      "muted",
      "muted-foreground",
      "primary-outline-border",
      "primary-outline-foreground",
    ],
  },
  {
    label: "Status",
    tokens: [
      "destructive",
      "destructive-foreground",
      "destructive-outline-border",
      "destructive-outline-foreground",
      "info",
      "info-foreground",
      "success",
      "success-foreground",
      "warning",
      "warning-foreground",
    ],
  },
  {
    label: "Borders & Rings",
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

  return `${preset}:${resolvedTheme ?? "light"}`
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
  color,
  title,
  className,
}: {
  color: string
  title: string
  className?: string
}) {
  return (
    <span
      title={title}
      className={cn(
        "block h-8 flex-1 border-y border-border first:rounded-l-md first:border-l last:rounded-r-md last:border-r",
        className
      )}
      style={{ backgroundColor: color }}
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
        <p className="font-mono text-xs text-foreground">{cssVar}</p>
        <p className="truncate font-mono text-[10px] text-muted-foreground">
          {value || "—"}
        </p>
      </div>
    </div>
  )
}

function PaletteLabels({
  steps,
  labelClassName,
}: {
  steps: readonly (string | number)[]
  labelClassName: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span className={labelClassName} />
      {steps.map((step) => (
        <span
          key={step}
          className="flex-1 text-center font-mono text-[10px] text-muted-foreground"
        >
          {step}
        </span>
      ))}
    </div>
  )
}

function TailwindPalette() {
  return (
    <>
      <PaletteLabels labelClassName="w-16 shrink-0" steps={paletteSteps} />
      {paletteFamilies.map((family) => (
        <div key={family} className="flex items-center gap-3">
          <span className="w-16 shrink-0 font-mono text-xs text-foreground capitalize">
            {family}
          </span>
          <div className="flex flex-1">
            {paletteSteps.map((step) => (
              <PaletteSwatch
                key={step}
                color={`var(--color-${family}-${step})`}
                title={`--color-${family}-${step}`}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

function GdsPalette() {
  return (
    <>
      <PaletteLabels labelClassName="w-20 shrink-0" steps={gdsSteps} />
      {gdsFamilies.map((family) => (
        <div key={family.name} className="flex items-center gap-3">
          <span className="w-20 shrink-0 font-mono text-xs text-foreground capitalize">
            {family.name}
          </span>
          <div className="flex flex-1">
            {gdsSwatches(family).map((swatch) => (
              <PaletteSwatch
                key={swatch.step}
                color={swatch.hex}
                title={`${swatch.token} ${swatch.hex}`}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <span className="w-20 shrink-0" />
        <div className="flex flex-1 gap-3">
          {gdsNeutralEnds.map((end) => (
            <div
              key={end.name}
              className="flex min-w-0 flex-1 items-center gap-2"
            >
              <span
                title={`${end.token} ${end.hex}`}
                className="block h-8 w-16 shrink-0 rounded-md border border-border"
                style={{ backgroundColor: end.hex }}
              />
              <span className="truncate font-mono text-xs text-muted-foreground">
                {end.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const CHART_GROUP_LABEL = "Charts"

export function ColorScale() {
  const deps = useResolvedDeps()
  const [showChartColors, setShowChartColors] = React.useState(false)
  const palette = usePaletteSource()

  const visibleGroups = semanticGroups.filter(
    (group) => group.label !== CHART_GROUP_LABEL || showChartColors
  )

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Palette</CardTitle>
          <CardDescription>{paletteCopy[palette]}</CardDescription>
        </CardHeader>
        <CardPanel className="space-y-3">
          {palette === "gds" ? <GdsPalette /> : <TailwindPalette />}
        </CardPanel>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Semantic Tokens</CardTitle>
          <CardDescription>
            Role-based tokens that components consume. Values update with the
            active preset and light/dark mode.
          </CardDescription>
          <CardAction>
            <Label className="flex items-center gap-2">
              Chart Colors
              <Switch
                checked={showChartColors}
                onCheckedChange={setShowChartColors}
              />
            </Label>
          </CardAction>
        </CardHeader>
        <CardPanel className="space-y-6">
          {visibleGroups.map((group) => (
            <div key={group.label} className="space-y-3">
              <p className="text-xs font-medium text-muted-foreground">
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
