"use client"

import * as React from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type CanvasMode = "gallery" | "specimen"
export type Choice<T extends string> = { label: string; value: T }

export function Gallery({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="flex min-h-80 flex-1 flex-col">
      <div className="m-auto flex w-full flex-col items-center gap-8 p-8">{children}</div>
    </div>
  )
}

export function GalleryGroup({
  label,
  layout = "row",
  children,
}: {
  label: string
  layout?: "row" | "stack"
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="w-full space-y-2">
      <p className="text-center font-medium text-muted-foreground text-xs">{label}</p>
      <div
        className={
          layout === "stack"
            ? "flex w-full flex-col items-center gap-3"
            : "flex flex-wrap items-center justify-center gap-2"
        }
      >
        {children}
      </div>
    </div>
  )
}

export function ChoiceField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: T
  options: Choice<T>[]
  onChange: (value: T) => void
}): React.ReactElement {
  const selected = options.find((option) => option.value === value) ?? null

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        items={options}
        onValueChange={(next) => {
          if (next) {
            onChange(next.value)
          }
        }}
        value={selected}
      >
        <SelectTrigger className="w-full" id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option}>
              {option.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  )
}

export function SwitchField({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}): React.ReactElement {
  return (
    <div className="flex items-center justify-between gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Switch checked={checked} id={id} onCheckedChange={onCheckedChange} />
    </div>
  )
}

export function CanvasModeToggle({
  mode,
  onModeChange,
}: {
  mode: CanvasMode
  onModeChange: (mode: CanvasMode) => void
}): React.ReactElement {
  return (
    <ToggleGroup
      aria-label="Canvas mode"
      onValueChange={(value) => {
        const next = value[0]
        if (next === "gallery" || next === "specimen") {
          onModeChange(next)
        }
      }}
      size="sm"
      value={[mode]}
      variant="outline"
    >
      <ToggleGroupItem value="gallery">Gallery</ToggleGroupItem>
      <ToggleGroupItem value="specimen">Specimen</ToggleGroupItem>
    </ToggleGroup>
  )
}

export function PropsList({
  props,
}: {
  props: { name: string; type: string; defaultValue: string }[]
}): React.ReactElement {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm">Props</h3>
      <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 text-xs">
        {props.map((prop) => (
          <React.Fragment key={prop.name}>
            <dt className="font-mono text-foreground">{prop.name}</dt>
            <dd className="text-end text-muted-foreground">
              {prop.type}
              <span className="text-foreground"> · {prop.defaultValue}</span>
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  )
}

export function CompositionNote({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-sm">Composition</h3>
      <p className="text-muted-foreground text-xs leading-5">{children}</p>
    </div>
  )
}
