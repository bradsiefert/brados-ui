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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type FieldSize = "sm" | "default" | "lg"

const sizes: Choice<FieldSize>[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const inputProps = [
  { name: "size", type: "string", defaultValue: "default" },
  { name: "placeholder", type: "string", defaultValue: "—" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
  { name: "aria-invalid", type: "boolean", defaultValue: "false" },
]

function SampleInput({
  size = "default",
  disabled = false,
  invalid = false,
  placeholder = "Email",
  label,
}: {
  size?: FieldSize
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  label?: string
}): React.ReactElement {
  const id = React.useId()

  return (
    <div className="grid w-64 gap-2">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Input
        aria-invalid={invalid || undefined}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        size={size}
        type="email"
      />
      {invalid ? <p className="text-destructive text-xs">Enter a valid email.</p> : null}
    </div>
  )
}

function TextInputGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Sizes" layout="stack">
        <SampleInput placeholder="Small" size="sm" />
        <SampleInput placeholder="Default" />
        <SampleInput placeholder="Large" size="lg" />
      </GalleryGroup>
      <GalleryGroup label="Label" layout="stack">
        <SampleInput label="Email" />
      </GalleryGroup>
      <GalleryGroup label="Disabled" layout="stack">
        <SampleInput disabled placeholder="Disabled" />
      </GalleryGroup>
      <GalleryGroup label="Invalid" layout="stack">
        <SampleInput invalid label="Email" />
      </GalleryGroup>
    </Gallery>
  )
}

export function TextInputPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [size, setSize] = React.useState<FieldSize>("default")
  const [placeholder, setPlaceholder] = React.useState("Email")
  const [disabled, setDisabled] = React.useState(false)
  const [invalid, setInvalid] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="input-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="input-placeholder">Placeholder</Label>
            <Input
              id="input-placeholder"
              onChange={(event) => setPlaceholder(event.target.value)}
              value={placeholder}
            />
          </div>
          <SwitchField
            checked={disabled}
            id="input-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <SwitchField
            checked={invalid}
            id="input-invalid"
            label="Invalid"
            onCheckedChange={setInvalid}
          />
          <Separator />
          <PropsList props={inputProps} />
          <CompositionNote>
            Set <span className="font-mono text-foreground">aria-invalid</span> for an error, and
            connect the visible label with <span className="font-mono text-foreground">htmlFor</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Sizes, a label, disabled, and invalid."
        title="Text inputs"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <TextInputGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleInput
            disabled={disabled}
            invalid={invalid}
            label="Email"
            placeholder={placeholder}
            size={size}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
