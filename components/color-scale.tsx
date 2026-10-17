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
  gds: "GDS standard scale, applied site wide. Steps run from 100 to 1000. Primary is the blue ramp, shared with info. Neutral also has lightest and darkest.",
  tailwind:
    "Tailwind color families, applied site wide. Steps run from 50 to 950.",
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

const neutralDarkest = "#121212"

/** Same OKLCH lightness as the current neutral ramp through 900.
    Hue held at 264°. 1000 is darker so it sits closer to Darkest. */
const neutralOptions = [
  {
    name: "Current",
    hexes: [
      "#f7f7f7",
      "#edeeef",
      "#d5d7db",
      "#b7bcc3",
      "#818791",
      "#6b7280",
      "#4f5562",
      "#343944",
      "#242831",
      "#191b22",
    ],
  },
  {
    name: "Half Tint",
    hexes: [
      "#f7f7f7",
      "#eeeeee",
      "#d6d7d9",
      "#babcbf",
      "#84878c",
      "#6e7279",
      "#52555b",
      "#36393f",
      "#26282d",
      "#181a1d",
    ],
  },
  {
    name: "Light Tint",
    hexes: [
      "#f7f7f7",
      "#eeeeee",
      "#d6d7d8",
      "#bbbbbd",
      "#858789",
      "#707275",
      "#535558",
      "#38393c",
      "#27282a",
      "#191a1c",
    ],
  },
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
      "header",
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
  const palette = usePaletteSource()

  return `${preset}:${resolvedTheme ?? "light"}:${palette}`
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

function NeutralOptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Neutral Options</CardTitle>
        <CardDescription>
          Same lightness from 100 through 900. 1000 is darker so it sits closer
          to Darkest. Half Tint keeps about half the blue. Light Tint keeps
          about a quarter.
        </CardDescription>
      </CardHeader>
      <CardPanel className="space-y-6">
        <div className="space-y-3">
          <PaletteLabels labelClassName="w-20 shrink-0" steps={gdsSteps} />
          {neutralOptions.map((option) => (
            <div key={option.name} className="flex items-center gap-3">
              <span className="w-20 shrink-0 font-mono text-xs text-foreground">
                {option.name}
              </span>
              <div className="flex flex-1">
                {option.hexes.map((hex, index) => (
                  <PaletteSwatch
                    key={gdsSteps[index]}
                    color={hex}
                    title={`${option.name} ${gdsSteps[index]} ${hex}`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <span className="w-20 shrink-0 font-mono text-xs text-muted-foreground">
              Darkest
            </span>
            <span
              title={`Darkest ${neutralDarkest}`}
              className="block h-8 w-16 rounded-md border border-border"
              style={{ backgroundColor: neutralDarkest }}
            />
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {neutralOptions.map((option) => (
            <div
              key={option.name}
              className="rounded-lg p-3"
              style={{ backgroundColor: neutralDarkest }}
            >
              <div
                className="rounded-md p-3"
                style={{ backgroundColor: option.hexes[9] }}
              >
                <p
                  className="font-mono text-xs"
                  style={{ color: option.hexes[3] }}
                >
                  {option.name}
                </p>
                <div
                  className="mbs-3 rounded-md px-3 py-4"
                  style={{ backgroundColor: option.hexes[8] }}
                >
                  <p
                    className="font-mono text-xs"
                    style={{ color: option.hexes[0] }}
                  >
                    900 on 1000
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardPanel>
    </Card>
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

      <NeutralOptions />

      <Card>
        <CardHeader>
          <CardTitle>Semantic Tokens</CardTitle>
          <CardDescription>
            Role-based tokens that components consume. Values follow the
            palette, the preset, and light or dark mode.
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
