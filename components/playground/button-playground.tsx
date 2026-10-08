"use client"

import { PlusCircleIcon, SlidersIcon, XIcon } from "@phosphor-icons/react"
import * as React from "react"

import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type ButtonVariant = NonNullable<ButtonProps["variant"]>
type ButtonSize = NonNullable<ButtonProps["size"]>
type CanvasMode = "gallery" | "specimen"
type IconMode = "none" | "leading" | "icon-only"
type Choice<T extends string> = { label: string; value: T }

const variants: Choice<ButtonVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Primary outline", value: "primary-outline" },
  { label: "Outline", value: "outline" },
  { label: "Secondary", value: "secondary" },
  { label: "Ghost", value: "ghost" },
  { label: "Link", value: "link" },
  { label: "Destructive", value: "destructive" },
  { label: "Destructive outline", value: "destructive-outline" },
]

const textSizes: Choice<ButtonSize>[] = [
  { label: "Extra small", value: "xs" },
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
  { label: "Extra large", value: "xl" },
]

const iconSizes: Choice<ButtonSize>[] = [
  { label: "Extra small", value: "icon-xs" },
  { label: "Small", value: "icon-sm" },
  { label: "Default", value: "icon" },
  { label: "Large", value: "icon-lg" },
  { label: "Extra large", value: "icon-xl" },
]

const iconModes: Choice<IconMode>[] = [
  { label: "None", value: "none" },
  { label: "Leading", value: "leading" },
  { label: "Icon only", value: "icon-only" },
]

const buttonProps = [
  { name: "variant", type: "string", defaultValue: "default" },
  { name: "size", type: "string", defaultValue: "default" },
  { name: "loading", type: "boolean", defaultValue: "false" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
  { name: "children", type: "ReactNode", defaultValue: "—" },
  { name: "render", type: "ReactElement", defaultValue: "—" },
]

function toIconSize(size: ButtonSize): ButtonSize {
  switch (size) {
    case "xs":
    case "icon-xs":
      return "icon-xs"
    case "sm":
    case "icon-sm":
      return "icon-sm"
    case "lg":
    case "icon-lg":
      return "icon-lg"
    case "xl":
    case "icon-xl":
      return "icon-xl"
    default:
      return "icon"
  }
}

function toTextSize(size: ButtonSize): ButtonSize {
  switch (size) {
    case "xs":
    case "icon-xs":
      return "xs"
    case "sm":
    case "icon-sm":
      return "sm"
    case "lg":
    case "icon-lg":
      return "lg"
    case "xl":
    case "icon-xl":
      return "xl"
    default:
      return "default"
  }
}

function GalleryGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="space-y-2">
      <p className="font-medium text-muted-foreground text-xs">{label}</p>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

function ChoiceField<T extends string>({
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

function ButtonGallery(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <GalleryGroup label="Variants">
        <Button>Primary</Button>
        <Button variant="primary-outline">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="destructive-outline">Destructive</Button>
      </GalleryGroup>
      <GalleryGroup label="Sizes">
        <Button size="xs" variant="outline">
          Extra small
        </Button>
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button variant="outline">Default</Button>
        <Button size="lg" variant="outline">
          Large
        </Button>
        <Button size="xl" variant="outline">
          Extra large
        </Button>
      </GalleryGroup>
      <GalleryGroup label="With icon">
        <Button>
          <PlusCircleIcon aria-hidden="true" />
          Add item
        </Button>
        <Button variant="outline">
          <SlidersIcon aria-hidden="true" />
          Settings
        </Button>
      </GalleryGroup>
      <GalleryGroup label="Icon only">
        <Button aria-label="Settings" size="icon-xs" variant="ghost">
          <SlidersIcon aria-hidden="true" />
        </Button>
        <Button aria-label="Settings" size="icon-sm" variant="outline">
          <SlidersIcon aria-hidden="true" />
        </Button>
        <Button aria-label="Settings" size="icon" variant="outline">
          <SlidersIcon aria-hidden="true" />
        </Button>
        <Button aria-label="Close" size="icon-lg" variant="ghost">
          <XIcon aria-hidden="true" />
        </Button>
      </GalleryGroup>
      <GalleryGroup label="States">
        <Button loading>Loading</Button>
        <Button disabled>Disabled</Button>
        <Button disabled variant="outline">
          Disabled outline
        </Button>
      </GalleryGroup>
      <GalleryGroup label="As link">
        <Button
          render={
            <a href="https://coss.com/ui" rel="noreferrer" target="_blank" />
          }
          variant="link"
        >
          Visit docs
        </Button>
      </GalleryGroup>
    </div>
  )
}

export function ButtonPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [variant, setVariant] = React.useState<ButtonVariant>("default")
  const [size, setSize] = React.useState<ButtonSize>("default")
  const [icon, setIcon] = React.useState<IconMode>("none")
  const [label, setLabel] = React.useState("Button")
  const [disabled, setDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  function setIconMode(next: IconMode) {
    setIcon(next)
    setSize((current) => (next === "icon-only" ? toIconSize(current) : toTextSize(current)))
  }

  const sizeOptions = icon === "icon-only" ? iconSizes : textSizes

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="button-variant"
            label="Variant"
            onChange={setVariant}
            options={variants}
            value={variant}
          />
          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm" id="button-icon-label">
              Icon
            </span>
            <ToggleGroup
              aria-labelledby="button-icon-label"
              onValueChange={(value) => {
                const next = value[0]
                if (next === "none" || next === "leading" || next === "icon-only") {
                  setIconMode(next)
                }
              }}
              size="sm"
              value={[icon]}
              variant="outline"
            >
              {iconModes.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <ChoiceField
            id="button-size"
            label="Size"
            onChange={setSize}
            options={sizeOptions}
            value={size}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="button-label">Label</Label>
            <Input
              id="button-label"
              onChange={(event) => setLabel(event.target.value)}
              value={label}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="button-disabled">Disabled</Label>
            <Switch
              checked={disabled}
              id="button-disabled"
              onCheckedChange={setDisabled}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="button-loading">Loading</Label>
            <Switch checked={loading} id="button-loading" onCheckedChange={setLoading} />
          </div>
          <Separator />
          <div className="space-y-3">
            <h3 className="font-medium text-sm">Props</h3>
            <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 text-xs">
              {buttonProps.map((prop) => (
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
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Composition</h3>
            <p className="text-muted-foreground text-xs leading-5">
              Pass <span className="font-mono text-foreground">render</span> to turn the
              button into another element, such as a link. An icon-only button needs an
              accessible name.
            </p>
          </div>
        </div>
      }
    >
      <CanvasIntro
        description="Variants, sizes, icons, loading, and composition patterns."
        title="Button"
      >
        <ToggleGroup
          aria-label="Canvas mode"
          onValueChange={(value) => {
            const next = value[0]
            if (next === "gallery" || next === "specimen") {
              setMode(next)
            }
          }}
          size="sm"
          value={[mode]}
          variant="outline"
        >
          <ToggleGroupItem value="gallery">Gallery</ToggleGroupItem>
          <ToggleGroupItem value="specimen">Specimen</ToggleGroupItem>
        </ToggleGroup>
      </CanvasIntro>
      {mode === "gallery" ? (
        <ButtonGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Button
            aria-label={icon === "icon-only" ? label : undefined}
            disabled={disabled}
            loading={loading}
            size={size}
            variant={variant}
          >
            {icon === "none" ? null : <PlusCircleIcon aria-hidden="true" />}
            {icon === "icon-only" ? null : label}
          </Button>
        </div>
      )}
    </PlaygroundShell>
  )
}
