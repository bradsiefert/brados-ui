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
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const options = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
]

const groupProps = [
  { name: "value", type: "string[]", defaultValue: "—" },
  { name: "defaultValue", type: "string[]", defaultValue: "—" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function FrameworkGroup({
  value,
  onValueChange,
  disabled = false,
  disabledValue,
}: {
  value?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  disabledValue?: string
}): React.ReactElement {
  return (
    <CheckboxGroup
      aria-label="Frameworks"
      disabled={disabled}
      onValueChange={onValueChange}
      value={value}
    >
      {options.map((option) => (
        <Label key={option.value}>
          <Checkbox disabled={option.value === disabledValue} value={option.value} />
          {option.label}
        </Label>
      ))}
    </CheckboxGroup>
  )
}

function CheckboxGroupGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Default" layout="stack">
        <FrameworkGroup value={["next"]} />
      </GalleryGroup>
      <GalleryGroup label="Disabled item" layout="stack">
        <FrameworkGroup disabledValue="astro" value={["next", "vite"]} />
      </GalleryGroup>
      <GalleryGroup label="Disabled group" layout="stack">
        <FrameworkGroup disabled value={["vite"]} />
      </GalleryGroup>
    </Gallery>
  )
}

export function CheckboxGroupPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [value, setValue] = React.useState<string[]>(["next"])
  const [disabled, setDisabled] = React.useState(false)
  const [disableAstro, setDisableAstro] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={disabled}
            id="checkbox-group-disabled"
            label="Disable group"
            onCheckedChange={setDisabled}
          />
          <SwitchField
            checked={disableAstro}
            id="checkbox-group-astro"
            label="Disable Astro"
            onCheckedChange={setDisableAstro}
          />
          <Separator />
          <PropsList props={groupProps} />
          <CompositionNote>
            The group value is a <span className="font-mono text-foreground">string[]</span>.
            Each checkbox needs its own <span className="font-mono text-foreground">value</span>,
            and the label wraps the control.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Shared multi-select with a disabled option."
        title="Checkbox group"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <CheckboxGroupGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <FrameworkGroup
            disabled={disabled}
            disabledValue={disableAstro ? "astro" : undefined}
            onValueChange={setValue}
            value={value}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
