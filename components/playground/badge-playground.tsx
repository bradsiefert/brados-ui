"use client"

import { CheckIcon } from "@phosphor-icons/react"
import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type BadgeVariant =
  | "default"
  | "outline"
  | "secondary"
  | "destructive"
  | "info"
  | "success"
  | "warning"
  | "error"
type BadgeSize = "sm" | "default" | "lg"

const variants: Choice<BadgeVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Outline", value: "outline" },
  { label: "Secondary", value: "secondary" },
  { label: "Destructive", value: "destructive" },
  { label: "Info", value: "info" },
  { label: "Success", value: "success" },
  { label: "Warning", value: "warning" },
  { label: "Error", value: "error" },
]

const sizes: Choice<BadgeSize>[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const badgeProps = [
  { name: "variant", type: "string", defaultValue: "default" },
  { name: "size", type: "string", defaultValue: "default" },
  { name: "render", type: "ReactElement", defaultValue: "—" },
]

function SampleBadge({
  variant = "default",
  size = "default",
  label,
  icon = false,
  pill = false,
}: {
  variant?: BadgeVariant
  size?: BadgeSize
  label: string
  icon?: boolean
  pill?: boolean
}): React.ReactElement {
  return (
    <Badge className={cn(pill && "rounded-full")} size={size} variant={variant}>
      {icon ? <CheckIcon aria-hidden="true" /> : null}
      {label}
    </Badge>
  )
}

function BadgeGallery(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <GalleryGroup label="Variants">
        {variants.map((variant) => (
          <SampleBadge key={variant.value} label={variant.label} variant={variant.value} />
        ))}
      </GalleryGroup>
      <GalleryGroup label="Sizes">
        <SampleBadge label="Small" size="sm" variant="outline" />
        <SampleBadge label="Default" variant="outline" />
        <SampleBadge label="Large" size="lg" variant="outline" />
      </GalleryGroup>
      <GalleryGroup label="Icon, count, and pill">
        <SampleBadge icon label="Verified" variant="outline" />
        <SampleBadge label="8" variant="secondary" />
        <SampleBadge label="New" pill variant="info" />
      </GalleryGroup>
      <GalleryGroup label="As link">
        <Badge
          render={
            <a href="https://coss.com/ui" rel="noreferrer" target="_blank" />
          }
          variant="outline"
        >
          Docs
        </Badge>
      </GalleryGroup>
    </div>
  )
}

export function BadgePlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [variant, setVariant] = React.useState<BadgeVariant>("default")
  const [size, setSize] = React.useState<BadgeSize>("default")
  const [label, setLabel] = React.useState("Badge")
  const [icon, setIcon] = React.useState(false)
  const [pill, setPill] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="badge-variant"
            label="Variant"
            onChange={setVariant}
            options={variants}
            value={variant}
          />
          <ChoiceField
            id="badge-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="badge-label">Label</Label>
            <Input
              id="badge-label"
              onChange={(event) => setLabel(event.target.value)}
              value={label}
            />
          </div>
          <SwitchField
            checked={icon}
            id="badge-icon"
            label="Icon"
            onCheckedChange={setIcon}
          />
          <SwitchField
            checked={pill}
            id="badge-pill"
            label="Pill"
            onCheckedChange={setPill}
          />
          <Separator />
          <PropsList props={badgeProps} />
          <CompositionNote>
            Pass <span className="font-mono text-foreground">render</span> to turn the badge
            into a link. A pill is <span className="font-mono text-foreground">rounded-full</span>{" "}
            on top of the size radius.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Variants, sizes, icons, counts, and link composition."
        title="Badges"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <BadgeGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleBadge icon={icon} label={label} pill={pill} size={size} variant={variant} />
        </div>
      )}
    </PlaygroundShell>
  )
}
