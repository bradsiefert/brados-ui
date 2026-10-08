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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

type FieldSize = "sm" | "default" | "lg"

const sizes: Choice<FieldSize>[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const textareaProps = [
  { name: "size", type: "string", defaultValue: "default" },
  { name: "placeholder", type: "string", defaultValue: "—" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
  { name: "aria-invalid", type: "boolean", defaultValue: "false" },
]

function SampleTextarea({
  size = "default",
  disabled = false,
  invalid = false,
  placeholder = "Write a note…",
}: {
  size?: FieldSize
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
}): React.ReactElement {
  const id = React.useId()

  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor={id}>Note</Label>
      <Textarea
        aria-invalid={invalid || undefined}
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        size={size}
      />
      {invalid ? <p className="text-destructive text-xs">Add a few more words.</p> : null}
    </div>
  )
}

function TextareaGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Sizes" layout="stack">
        <SampleTextarea placeholder="Small" size="sm" />
        <SampleTextarea placeholder="Default" />
        <SampleTextarea placeholder="Large" size="lg" />
      </GalleryGroup>
      <GalleryGroup label="Disabled" layout="stack">
        <SampleTextarea disabled placeholder="Disabled" />
      </GalleryGroup>
      <GalleryGroup label="Invalid" layout="stack">
        <SampleTextarea invalid />
      </GalleryGroup>
    </Gallery>
  )
}

export function TextareaPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [size, setSize] = React.useState<FieldSize>("default")
  const [placeholder, setPlaceholder] = React.useState("Write a note…")
  const [disabled, setDisabled] = React.useState(false)
  const [invalid, setInvalid] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="textarea-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="textarea-placeholder">Placeholder</Label>
            <Textarea
              id="textarea-placeholder"
              onChange={(event) => setPlaceholder(event.target.value)}
              value={placeholder}
            />
          </div>
          <SwitchField
            checked={disabled}
            id="textarea-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <SwitchField
            checked={invalid}
            id="textarea-invalid"
            label="Invalid"
            onCheckedChange={setInvalid}
          />
          <Separator />
          <PropsList props={textareaProps} />
          <CompositionNote>
            The label points at the textarea with{" "}
            <span className="font-mono text-foreground">htmlFor</span>.{" "}
            <span className="font-mono text-foreground">aria-invalid</span> marks an error.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Sizes, disabled, and invalid." title="Textarea">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <TextareaGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleTextarea
            disabled={disabled}
            invalid={invalid}
            placeholder={placeholder}
            size={size}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
