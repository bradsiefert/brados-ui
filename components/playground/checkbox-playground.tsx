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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const checkboxProps = [
  { name: "checked", type: "boolean", defaultValue: "false" },
  { name: "indeterminate", type: "boolean", defaultValue: "false" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function LabeledCheckbox({
  checked,
  indeterminate = false,
  disabled = false,
  label,
  description,
}: {
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  label: string
  description?: string
}): React.ReactElement {
  const id = React.useId()

  return (
    <div className="flex items-start gap-2">
      <Checkbox
        checked={checked}
        disabled={disabled}
        id={id}
        indeterminate={indeterminate}
      />
      <div className="grid gap-1">
        <Label htmlFor={id}>{label}</Label>
        {description ? (
          <p className="text-muted-foreground text-xs">{description}</p>
        ) : null}
      </div>
    </div>
  )
}

function CheckboxGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="States">
        <LabeledCheckbox label="Unchecked" />
        <LabeledCheckbox checked label="Checked" />
        <LabeledCheckbox indeterminate label="Mixed" />
        <LabeledCheckbox disabled label="Disabled" />
      </GalleryGroup>
      <GalleryGroup label="With description" layout="stack">
        <LabeledCheckbox
          checked
          description="Emails about product updates, not marketing."
          label="Product news"
        />
      </GalleryGroup>
    </Gallery>
  )
}

export function CheckboxPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [checked, setChecked] = React.useState(true)
  const [indeterminate, setIndeterminate] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [label, setLabel] = React.useState("Product news")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <div className="flex flex-col gap-2">
            <Label htmlFor="checkbox-label">Label</Label>
            <Input
              id="checkbox-label"
              onChange={(event) => setLabel(event.target.value)}
              value={label}
            />
          </div>
          <SwitchField
            checked={checked}
            id="checkbox-checked"
            label="Checked"
            onCheckedChange={setChecked}
          />
          <SwitchField
            checked={indeterminate}
            id="checkbox-mixed"
            label="Indeterminate"
            onCheckedChange={setIndeterminate}
          />
          <SwitchField
            checked={disabled}
            id="checkbox-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={checkboxProps} />
          <CompositionNote>
            Pair the checkbox with a <span className="font-mono text-foreground">Label</span>{" "}
            through <span className="font-mono text-foreground">id</span> and{" "}
            <span className="font-mono text-foreground">htmlFor</span>. Use a group when several
            boxes share one value.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Checked, mixed, disabled, and a description."
        title="Checkbox"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <CheckboxGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <LabeledCheckbox
            checked={checked}
            description="Emails about product updates, not marketing."
            disabled={disabled}
            indeterminate={indeterminate}
            label={label}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
