"use client"

import * as React from "react"

import { useUiPreset } from "@/components/ui-preset-provider"
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Measure = "family" | "size" | "weight" | "tracking" | "leading"

type TypeRowData = {
  id: string
  className: string
  sample: string
  token: string
  stock?: string
  note: string
  measure: Measure
}

const FAMILY_ROWS: TypeRowData[] = [
  {
    id: "sans",
    className: "font-sans text-base",
    sample: "The quick brown fox",
    token: "font-sans",
    stock: "Cal Sans",
    note: "Body, buttons, labels",
    measure: "family",
  },
  {
    id: "heading",
    className: "font-heading text-base",
    sample: "The quick brown fox",
    token: "font-heading",
    stock: "Cal Sans",
    note: "Same face as sans",
    measure: "family",
  },
  {
    id: "mono",
    className: "font-mono text-base",
    sample: "The quick brown fox",
    token: "font-mono",
    stock: "Paper Mono",
    note: "code, kbd, samp, pre",
    measure: "family",
  },
]

const SIZE_ROWS: TypeRowData[] = [
  {
    id: "badge-sm",
    className: "text-[.625rem]",
    sample: "Typography",
    token: "text-[.625rem]",
    note: "Badge sm",
    measure: "size",
  },
  {
    id: "xs",
    className: "text-xs",
    sample: "Typography",
    token: "text-xs",
    note: "Captions, shortcuts, badge, button xs",
    measure: "size",
  },
  {
    id: "sm",
    className: "text-sm",
    sample: "Typography",
    token: "text-sm",
    note: "Body, menus, buttons, labels, inputs",
    measure: "size",
  },
  {
    id: "base",
    className: "text-base",
    sample: "Typography",
    token: "text-base",
    note: "Button xl, OTP lg",
    measure: "size",
  },
  {
    id: "lg",
    className: "text-lg",
    sample: "Typography",
    token: "text-lg",
    note: "Card title, popover title",
    measure: "size",
  },
  {
    id: "xl",
    className: "text-xl",
    sample: "Typography",
    token: "text-xl",
    note: "Dialog, alert dialog, sheet, drawer, empty titles",
    measure: "size",
  },
]

const WEIGHT_ROWS: TypeRowData[] = [
  {
    id: "normal",
    className: "font-normal text-base",
    sample: "The quick brown fox jumps over the lazy dog.",
    token: "font-normal",
    stock: "400",
    note: "Breadcrumb current",
    measure: "weight",
  },
  {
    id: "medium",
    className: "font-medium text-base",
    sample: "The quick brown fox jumps over the lazy dog.",
    token: "font-medium",
    stock: "500",
    note: "Controls and labels",
    measure: "weight",
  },
  {
    id: "semibold",
    className: "font-semibold text-base",
    sample: "The quick brown fox jumps over the lazy dog.",
    token: "font-semibold",
    stock: "600",
    note: "Titles",
    measure: "weight",
  },
]

const TRACKING_ROWS: TypeRowData[] = [
  {
    id: "tracking-0",
    className: "text-sm tracking-normal",
    sample: "Typography",
    token: "tracking-normal",
    note: "Default",
    measure: "tracking",
  },
  {
    id: "tracking-widest",
    className: "text-sm tracking-widest",
    sample: "Typography",
    token: "tracking-widest",
    note: "Menu, command, and context-menu shortcuts",
    measure: "tracking",
  },
]

const LEADING_ROWS: TypeRowData[] = [
  {
    id: "leading-none",
    className: "max-w-sm text-sm leading-none",
    sample: "Titles and table cells sit on a line height of one.",
    token: "leading-none",
    note: "Titles and table cells",
    measure: "leading",
  },
  {
    id: "leading-label",
    className: "max-w-sm font-medium text-sm/4",
    sample: "Field labels use a 16px line on desktop.",
    token: "text-sm/4",
    note: "Field label",
    measure: "leading",
  },
  {
    id: "leading-step",
    className: "max-w-sm text-sm",
    sample: "Body copy keeps the line height that comes with the size step.",
    token: "text-sm",
    note: "Step default",
    measure: "leading",
  },
  {
    id: "leading-input",
    className: "max-w-sm text-sm leading-7.5",
    sample: "Inputs set line height equal to the control height.",
    token: "leading-7.5",
    note: "Input",
    measure: "leading",
  },
]

const ROLE_ROWS: TypeRowData[] = [
  {
    id: "dialog-title",
    className: "font-heading font-semibold text-xl leading-none",
    sample: "Delete this item?",
    token: "font-heading font-semibold text-xl leading-none",
    note: "Dialog title",
    measure: "size",
  },
  {
    id: "card-title",
    className: "font-semibold text-lg leading-none",
    sample: "Card title",
    token: "font-semibold text-lg leading-none",
    note: "Card title",
    measure: "size",
  },
  {
    id: "body",
    className: "text-muted-foreground text-sm",
    sample: "Supporting copy under a title.",
    token: "text-sm text-muted-foreground",
    note: "Body",
    measure: "size",
  },
  {
    id: "label",
    className: "font-medium text-sm/4",
    sample: "Email",
    token: "font-medium text-sm/4",
    note: "Label",
    measure: "size",
  },
  {
    id: "caption",
    className: "text-muted-foreground text-xs",
    sample: "Updated two minutes ago",
    token: "text-xs text-muted-foreground",
    note: "Caption",
    measure: "size",
  },
  {
    id: "shortcut",
    className: "font-medium text-xs tracking-widest",
    sample: "⌘K",
    token: "text-xs tracking-widest",
    note: "Shortcut",
    measure: "tracking",
  },
  {
    id: "code",
    className: "font-mono text-xs",
    sample: "font-sans",
    token: "font-mono text-xs",
    note: "Code",
    measure: "family",
  },
]

function formatPx(value: string): string {
  const px = Number.parseFloat(value)
  if (Number.isNaN(px)) {
    return value
  }
  const rounded = Math.round(px * 10) / 10
  return Number.isInteger(rounded) ? `${rounded}px` : `${rounded}px`
}

function firstFamily(fontFamily: string): string {
  return fontFamily.split(",")[0]?.replaceAll('"', "").trim() ?? fontFamily
}

function readMetrics(element: HTMLElement, measure: Measure): string {
  const style = getComputedStyle(element)
  if (measure === "family") {
    return firstFamily(style.fontFamily)
  }
  if (measure === "weight") {
    return style.fontWeight
  }
  if (measure === "tracking") {
    return style.letterSpacing === "normal" ? "0" : formatPx(style.letterSpacing)
  }
  if (measure === "leading") {
    return formatPx(style.lineHeight)
  }
  return `${formatPx(style.fontSize)} / ${formatPx(style.lineHeight)}`
}

function TypeRow({ row }: { row: TypeRowData }): React.ReactElement {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const [metrics, setMetrics] = React.useState("—")
  const { preset } = useUiPreset()

  React.useEffect(() => {
    if (!ref.current) {
      return
    }
    setMetrics(readMetrics(ref.current, row.measure))
  }, [preset, row.className, row.measure])

  return (
    <div className="grid items-baseline gap-x-4 gap-y-1 border-b border-border py-3 last:border-b-0 sm:grid-cols-[192px_minmax(0,1fr)]">
      <div className="max-w-[192px] space-y-0.5 text-right">
        <p className="font-mono text-foreground text-xs">{row.token}</p>
        <p className="font-mono text-[10px] text-muted-foreground">
          {metrics}
          {row.stock ? ` · stock ${row.stock}` : ""}
        </p>
        <p className="text-muted-foreground text-xs">{row.note}</p>
      </div>
      <p
        ref={ref}
        className={cn("min-w-0 text-wrap text-foreground wrap-break-word", row.className)}
      >
        {row.sample}
      </p>
    </div>
  )
}

function TypeCard({
  title,
  description,
  rows,
}: {
  title: string
  description: string
  rows: TypeRowData[]
}): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardPanel>
        {rows.map((row) => (
          <TypeRow key={row.id} row={row} />
        ))}
      </CardPanel>
    </Card>
  )
}

export function Typography(): React.ReactElement {
  return (
    <div className="space-y-4">
      <TypeCard
        description="The sample is the face loaded now. Stock COSS is named beside it."
        rows={FAMILY_ROWS}
        title="Families"
      />
      <TypeCard
        description="Desktop sizes COSS primitives set, smallest to biggest."
        rows={SIZE_ROWS}
        title="Size"
      />
      <TypeCard
        description="Weights COSS primitives set, smallest to biggest."
        rows={WEIGHT_ROWS}
        title="Weight"
      />
      <TypeCard
        description="Letter spacing COSS primitives set, smallest to biggest."
        rows={TRACKING_ROWS}
        title="Letter spacing"
      />
      <TypeCard
        description="Line height COSS primitives set, smallest to biggest."
        rows={LEADING_ROWS}
        title="Line height"
      />
      <TypeCard
        description="Named ways text is set in COSS primitives."
        rows={ROLE_ROWS}
        title="Type roles"
      />
    </div>
  )
}
