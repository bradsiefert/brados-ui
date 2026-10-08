"use client"

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
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/components/ui/number-field"
import { Separator } from "@/components/ui/separator"

type FieldSize = "sm" | "default" | "lg"

const sizes: Choice<FieldSize>[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const fieldProps = [
  { name: "size", type: "string", defaultValue: "default" },
  { name: "defaultValue", type: "number", defaultValue: "—" },
  { name: "min", type: "number", defaultValue: "—" },
  { name: "max", type: "number", defaultValue: "—" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function Quantity({
  size = "default",
  disabled = false,
  scrub = true,
}: {
  size?: FieldSize
  disabled?: boolean
  scrub?: boolean
}): React.ReactElement {
  return (
    <NumberField className="w-48" defaultValue={2} disabled={disabled} max={12} min={0} size={size}>
      {scrub ? <NumberFieldScrubArea label="Quantity" /> : null}
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput aria-label="Quantity" />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}

function NumberFieldGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Sizes">
        <Quantity size="sm" />
        <Quantity />
        <Quantity size="lg" />
      </GalleryGroup>
      <GalleryGroup label="Without scrub">
        <Quantity scrub={false} />
      </GalleryGroup>
      <GalleryGroup label="Disabled">
        <Quantity disabled />
      </GalleryGroup>
    </Gallery>
  )
}

export function NumberFieldPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [size, setSize] = React.useState<FieldSize>("default")
  const [scrub, setScrub] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="number-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <SwitchField checked={scrub} id="number-scrub" label="Scrub label" onCheckedChange={setScrub} />
          <SwitchField
            checked={disabled}
            id="number-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={fieldProps} />
          <CompositionNote>
            The scrub label, group, and input stay inside{" "}
            <span className="font-mono text-foreground">NumberField</span>. Decrement and
            increment sit on either side of the input.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Sizes, a scrub label, and a disabled field." title="Number field">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <NumberFieldGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Quantity disabled={disabled} scrub={scrub} size={size} />
        </div>
      )}
    </PlaygroundShell>
  )
}
