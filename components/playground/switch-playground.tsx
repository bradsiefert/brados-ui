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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

const switchProps = [
  { name: "checked", type: "boolean", defaultValue: "false" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function LabeledSwitch({
  checked,
  disabled = false,
  onCheckedChange,
  label,
}: {
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
  label: string
}): React.ReactElement {
  const id = React.useId()

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={checked}
        disabled={disabled}
        id={id}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}

function SwitchGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="States">
        <LabeledSwitch label="Off" />
        <LabeledSwitch checked label="On" />
        <LabeledSwitch disabled label="Disabled" />
        <LabeledSwitch checked disabled label="Disabled on" />
      </GalleryGroup>
    </Gallery>
  )
}

export function SwitchPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [checked, setChecked] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={checked}
            id="switch-checked"
            label="Checked"
            onCheckedChange={setChecked}
          />
          <SwitchField
            checked={disabled}
            id="switch-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={switchProps} />
          <CompositionNote>
            Use a switch for an immediate on or off preference. Tie the label with{" "}
            <span className="font-mono text-foreground">htmlFor</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Off, on, and disabled." title="Switch">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <SwitchGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <LabeledSwitch
            checked={checked}
            disabled={disabled}
            label="Email notifications"
            onCheckedChange={setChecked}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
