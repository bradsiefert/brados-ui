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
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const fieldsetProps = [
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function Address({ disabled }: { disabled: boolean }): React.ReactElement {
  return (
    <Fieldset className="grid w-full max-w-sm gap-3" disabled={disabled}>
      <FieldsetLegend>Address</FieldsetLegend>
      <div className="grid gap-2">
        <Label htmlFor="city">City</Label>
        <Input id="city" placeholder="City" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="region">Region</Label>
        <Input id="region" placeholder="Region" />
      </div>
    </Fieldset>
  )
}

export function FieldsetPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [disabled, setDisabled] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={disabled}
            id="fieldset-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={fieldsetProps} />
          <CompositionNote>
            A legend names the group. Disabling the fieldset disables the controls inside it.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A legend around related fields." title="Fieldset">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Address" layout="stack">
            <Address disabled={false} />
          </GalleryGroup>
          <GalleryGroup label="Disabled" layout="stack">
            <Address disabled />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Address disabled={disabled} />
        </div>
      )}
    </PlaygroundShell>
  )
}
