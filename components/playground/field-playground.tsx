"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const fieldProps = [
  { name: "invalid", type: "boolean", defaultValue: "false" },
  { name: "name", type: "string", defaultValue: "—" },
]

function SampleField({
  description,
  error,
}: {
  description: boolean
  error: boolean
}): React.ReactElement {
  return (
    <Field className="w-64" invalid={error || undefined} name="name">
      <FieldLabel>Name</FieldLabel>
      <Input placeholder="Ada Lovelace" />
      {description ? <FieldDescription>Shown on your profile.</FieldDescription> : null}
      {error ? <FieldError>Enter a name.</FieldError> : null}
    </Field>
  )
}

export function FieldPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [description, setDescription] = React.useState(true)
  const [error, setError] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={description}
            id="field-description"
            label="Description"
            onCheckedChange={setDescription}
          />
          <SwitchField checked={error} id="field-error" label="Error" onCheckedChange={setError} />
          <Separator />
          <PropsList props={fieldProps} />
          <CompositionNote>
            A field ties the label, control, description, and error together. Set{" "}
            <span className="font-mono text-foreground">invalid</span> when the value fails.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Label, description, and an error." title="Field">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Description" layout="stack">
            <SampleField description error={false} />
          </GalleryGroup>
          <GalleryGroup label="Error" layout="stack">
            <SampleField description error />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleField description={description} error={error} />
        </div>
      )}
    </PlaygroundShell>
  )
}
