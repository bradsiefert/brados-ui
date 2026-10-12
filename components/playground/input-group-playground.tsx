"use client"

import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type AddonKind = "icon" | "prefix" | "suffix" | "button" | "shortcut"
type FieldSize = "sm" | "default" | "lg"

const addons: Choice<AddonKind>[] = [
  { label: "Icon", value: "icon" },
  { label: "Prefix", value: "prefix" },
  { label: "Suffix", value: "suffix" },
  { label: "Button", value: "button" },
  { label: "Shortcut", value: "shortcut" },
]

const sizes: Choice<FieldSize>[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const groupProps = [
  { name: "size", type: "string", defaultValue: "default" },
  { name: "align", type: "string", defaultValue: "inline-start" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function SampleGroup({
  addon,
  size = "default",
  disabled = false,
  placeholder = "Search…",
}: {
  addon: AddonKind
  size?: FieldSize
  disabled?: boolean
  placeholder?: string
}): React.ReactElement {
  const align = addon === "suffix" || addon === "button" || addon === "shortcut" ? "inline-end" : "inline-start"

  return (
    <InputGroup className="w-64">
      <InputGroupInput
        aria-label={placeholder}
        disabled={disabled}
        placeholder={placeholder}
        size={size}
        type={addon === "icon" ? "search" : "text"}
      />
      <InputGroupAddon align={align}>
        {addon === "icon" ? <MagnifyingGlassIcon aria-hidden="true" /> : null}
        {addon === "prefix" ? <InputGroupText>https://</InputGroupText> : null}
        {addon === "suffix" ? <InputGroupText>.com</InputGroupText> : null}
        {addon === "button" ? (
          <Button aria-label="Search" size="icon-sm" type="button" variant="ghost">
            <MagnifyingGlassIcon aria-hidden="true" />
          </Button>
        ) : null}
        {addon === "shortcut" ? <Kbd>⌘K</Kbd> : null}
      </InputGroupAddon>
    </InputGroup>
  )
}

function InputGroupGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Addons" layout="stack">
        <SampleGroup addon="prefix" placeholder="example.com" />
        <SampleGroup addon="suffix" placeholder="studio" />
        <SampleGroup addon="button" placeholder="Search" />
        <SampleGroup addon="shortcut" placeholder="Jump to…" />
      </GalleryGroup>
      <GalleryGroup label="Sizes">
        <SampleGroup addon="icon" size="sm" />
        <SampleGroup addon="icon" />
        <SampleGroup addon="icon" size="lg" />
      </GalleryGroup>
      <GalleryGroup label="Disabled">
        <SampleGroup addon="prefix" disabled placeholder="example.com" />
      </GalleryGroup>
    </Gallery>
  )
}

export function InputGroupPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [addon, setAddon] = React.useState<AddonKind>("icon")
  const [size, setSize] = React.useState<FieldSize>("default")
  const [disabled, setDisabled] = React.useState(false)
  const [placeholder, setPlaceholder] = React.useState("Search…")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="input-group-addon"
            label="Addon"
            onChange={setAddon}
            options={addons}
            value={addon}
          />
          <ChoiceField
            id="input-group-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="input-group-placeholder">Placeholder</Label>
            <Input
              id="input-group-placeholder"
              onChange={(event) => setPlaceholder(event.target.value)}
              value={placeholder}
            />
          </div>
          <SwitchField
            checked={disabled}
            id="input-group-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={groupProps} />
          <CompositionNote>
            Put <span className="font-mono text-foreground">InputGroupAddon</span> after the
            input. <span className="font-mono text-foreground">align</span> places it at the
            start or the end.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Icons, prefixes, suffixes, buttons, and a shortcut."
        title="Input groups"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <InputGroupGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleGroup
            addon={addon}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
