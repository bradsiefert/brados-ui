"use client"

import { BookmarkSimpleIcon } from "@phosphor-icons/react"
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
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"

type ToggleVariant = "default" | "outline"
type ToggleSize = "sm" | "default" | "lg"

const variants: Choice<ToggleVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Outline", value: "outline" },
]

const sizes: Choice<ToggleSize>[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const toggleProps = [
  { name: "variant", type: "string", defaultValue: "default" },
  { name: "size", type: "string", defaultValue: "default" },
  { name: "pressed", type: "boolean", defaultValue: "false" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

export function TogglePlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [variant, setVariant] = React.useState<ToggleVariant>("outline")
  const [size, setSize] = React.useState<ToggleSize>("default")
  const [pressed, setPressed] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="toggle-variant"
            label="Variant"
            onChange={setVariant}
            options={variants}
            value={variant}
          />
          <ChoiceField id="toggle-size" label="Size" onChange={setSize} options={sizes} value={size} />
          <SwitchField
            checked={pressed}
            id="toggle-pressed"
            label="Pressed"
            onCheckedChange={setPressed}
          />
          <SwitchField
            checked={disabled}
            id="toggle-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={toggleProps} />
          <CompositionNote>
            A toggle is a two-state command, such as bold or bookmark. A setting uses a switch.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Default, outline, sizes, and an icon." title="Toggle">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Variants">
            <Toggle>Default</Toggle>
            <Toggle variant="outline">Outline</Toggle>
            <Toggle defaultPressed variant="outline">
              Pressed
            </Toggle>
            <Toggle disabled variant="outline">
              Disabled
            </Toggle>
          </GalleryGroup>
          <GalleryGroup label="Icon">
            <Toggle aria-label="Bookmark" variant="outline">
              <BookmarkSimpleIcon aria-hidden="true" />
            </Toggle>
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Toggle
            disabled={disabled}
            onPressedChange={setPressed}
            pressed={pressed}
            size={size}
            variant={variant}
          >
            Bookmark
          </Toggle>
        </div>
      )}
    </PlaygroundShell>
  )
}
