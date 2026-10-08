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
import { Radio, RadioGroup } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

type Plan = "starter" | "studio" | "enterprise"

const plans: { label: string; value: Plan }[] = [
  { label: "Starter", value: "starter" },
  { label: "Studio", value: "studio" },
  { label: "Enterprise", value: "enterprise" },
]

const planChoices: Choice<Plan>[] = plans

const radioProps = [
  { name: "value", type: "string", defaultValue: "—" },
  { name: "defaultValue", type: "string", defaultValue: "—" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function PlanGroup({
  value,
  onValueChange,
  disabled = false,
  disabledValue,
  horizontal = false,
}: {
  value?: Plan
  onValueChange?: (value: Plan) => void
  disabled?: boolean
  disabledValue?: Plan
  horizontal?: boolean
}): React.ReactElement {
  return (
    <RadioGroup
      aria-label="Plan"
      className={horizontal ? "flex-row" : undefined}
      disabled={disabled}
      onValueChange={(next) => {
        if (next === "starter" || next === "studio" || next === "enterprise") {
          onValueChange?.(next)
        }
      }}
      value={value}
    >
      {plans.map((plan) => (
        <Label key={plan.value}>
          <Radio disabled={plan.value === disabledValue} value={plan.value} />
          {plan.label}
        </Label>
      ))}
    </RadioGroup>
  )
}

function RadioGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Vertical" layout="stack">
        <PlanGroup value="studio" />
      </GalleryGroup>
      <GalleryGroup label="Horizontal" layout="stack">
        <PlanGroup horizontal value="starter" />
      </GalleryGroup>
      <GalleryGroup label="Disabled option" layout="stack">
        <PlanGroup disabledValue="enterprise" value="studio" />
      </GalleryGroup>
      <GalleryGroup label="Disabled group" layout="stack">
        <PlanGroup disabled value="starter" />
      </GalleryGroup>
    </Gallery>
  )
}

export function RadioPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [value, setValue] = React.useState<Plan>("studio")
  const [horizontal, setHorizontal] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [disableEnterprise, setDisableEnterprise] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="radio-value"
            label="Selected"
            onChange={setValue}
            options={planChoices}
            value={value}
          />
          <SwitchField
            checked={horizontal}
            id="radio-horizontal"
            label="Horizontal"
            onCheckedChange={setHorizontal}
          />
          <SwitchField
            checked={disableEnterprise}
            id="radio-enterprise"
            label="Disable Enterprise"
            onCheckedChange={setDisableEnterprise}
          />
          <SwitchField
            checked={disabled}
            id="radio-disabled"
            label="Disable group"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={radioProps} />
          <CompositionNote>
            One group, one selected value. Wrap each{" "}
            <span className="font-mono text-foreground">Radio</span> in a label.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Vertical, horizontal, and disabled options."
        title="Radio"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <RadioGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <PlanGroup
            disabled={disabled}
            disabledValue={disableEnterprise ? "enterprise" : undefined}
            horizontal={horizontal}
            onValueChange={setValue}
            value={value}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
