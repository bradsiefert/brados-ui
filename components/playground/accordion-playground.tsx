"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"

type SectionValue = "shipping" | "billing" | "returns"
type OpenChoice = "none" | SectionValue

const sections: { value: SectionValue; title: string; body: string }[] = [
  {
    value: "shipping",
    title: "Shipping",
    body: "Orders leave the studio within two business days.",
  },
  {
    value: "billing",
    title: "Billing",
    body: "Invoices are sent when the order ships.",
  },
  {
    value: "returns",
    title: "Returns",
    body: "Unused items can be returned within 30 days.",
  },
]

const openChoices: Choice<OpenChoice>[] = [
  { label: "None", value: "none" },
  { label: "Shipping", value: "shipping" },
  { label: "Billing", value: "billing" },
  { label: "Returns", value: "returns" },
]

const accordionProps = [
  { name: "multiple", type: "boolean", defaultValue: "false" },
  { name: "value", type: "string[]", defaultValue: "—" },
  { name: "defaultValue", type: "string[]", defaultValue: "—" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
  { name: "onValueChange", type: "function", defaultValue: "—" },
]

function FaqAccordion({
  multiple = false,
  defaultValue,
  value,
  onValueChange,
  disabledValue,
}: {
  multiple?: boolean
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  disabledValue?: SectionValue
}): React.ReactElement {
  return (
    <Accordion
      className="w-full max-w-xl"
      defaultValue={defaultValue}
      multiple={multiple}
      onValueChange={onValueChange}
      value={value}
    >
      {sections.map((section) => (
        <AccordionItem
          disabled={section.value === disabledValue}
          key={section.value}
          value={section.value}
        >
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionPanel>{section.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function AccordionGallery(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <GalleryGroup label="Single open" layout="stack">
        <FaqAccordion defaultValue={["shipping"]} />
      </GalleryGroup>
      <GalleryGroup label="Multiple open" layout="stack">
        <FaqAccordion defaultValue={["shipping", "billing"]} multiple />
      </GalleryGroup>
      <GalleryGroup label="Disabled item" layout="stack">
        <FaqAccordion defaultValue={["shipping"]} disabledValue="billing" />
      </GalleryGroup>
    </div>
  )
}

function openChoiceFromValue(value: string[]): OpenChoice {
  const current = value[value.length - 1]
  if (current === "shipping" || current === "billing" || current === "returns") {
    return current
  }
  return "none"
}

export function AccordionPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [multiple, setMultiple] = React.useState(false)
  const [open, setOpen] = React.useState<string[]>(["shipping"])
  const [disableBilling, setDisableBilling] = React.useState(false)

  function setOpenChoice(next: OpenChoice) {
    setOpen(next === "none" ? [] : [next])
  }

  function setMultipleOpen(next: boolean) {
    setMultiple(next)
    if (!next) {
      setOpen((current) => current.slice(0, 1))
    }
  }

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={multiple}
            id="accordion-multiple"
            label="Multiple"
            onCheckedChange={setMultipleOpen}
          />
          <ChoiceField
            id="accordion-open"
            label="Open section"
            onChange={setOpenChoice}
            options={openChoices}
            value={openChoiceFromValue(open)}
          />
          <SwitchField
            checked={disableBilling}
            id="accordion-disabled"
            label="Disable billing"
            onCheckedChange={setDisableBilling}
          />
          <Separator />
          <PropsList props={accordionProps} />
          <CompositionNote>
            Each item needs a stable <span className="font-mono text-foreground">value</span>.
            The open value is always a{" "}
            <span className="font-mono text-foreground">string[]</span>, and{" "}
            <span className="font-mono text-foreground">multiple</span> allows more than one
            panel.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Single open, multiple open, and a disabled section."
        title="Accordion"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <AccordionGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <FaqAccordion
            disabledValue={disableBilling ? "billing" : undefined}
            multiple={multiple}
            onValueChange={setOpen}
            value={open}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
