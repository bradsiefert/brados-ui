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
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"

type CalendarMode = "single" | "range"

const modes: Choice<CalendarMode>[] = [
  { label: "Single", value: "single" },
  { label: "Range", value: "range" },
]

const calendarProps = [
  { name: "mode", type: "string", defaultValue: "single" },
  { name: "showOutsideDays", type: "boolean", defaultValue: "true" },
  { name: "numberOfMonths", type: "number", defaultValue: "1" },
]

function CalendarView({
  mode,
  months = 1,
  showOutsideDays = true,
}: {
  mode: CalendarMode
  months?: number
  showOutsideDays?: boolean
}): React.ReactElement {
  if (mode === "range") {
    return <Calendar mode="range" numberOfMonths={months} showOutsideDays={showOutsideDays} />
  }
  return <Calendar mode="single" numberOfMonths={months} showOutsideDays={showOutsideDays} />
}

function CalendarGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Single" layout="stack">
        <CalendarView mode="single" />
      </GalleryGroup>
      <GalleryGroup label="Range" layout="stack">
        <CalendarView mode="range" />
      </GalleryGroup>
      <GalleryGroup label="Two months" layout="stack">
        <CalendarView mode="range" months={2} />
      </GalleryGroup>
    </Gallery>
  )
}

export function CalendarPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [selection, setSelection] = React.useState<CalendarMode>("single")
  const [outside, setOutside] = React.useState(true)
  const [months, setMonths] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="calendar-mode"
            label="Mode"
            onChange={setSelection}
            options={modes}
            value={selection}
          />
          <SwitchField
            checked={months}
            id="calendar-months"
            label="Two months"
            onCheckedChange={setMonths}
          />
          <SwitchField
            checked={outside}
            id="calendar-outside"
            label="Outside days"
            onCheckedChange={setOutside}
          />
          <Separator />
          <PropsList props={calendarProps} />
          <CompositionNote>
            <span className="font-mono text-foreground">mode</span> is single or range.
            A range can span <span className="font-mono text-foreground">numberOfMonths</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Single dates, ranges, and a two-month grid." title="Calendar">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <CalendarGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <CalendarView
            mode={months ? "range" : selection}
            months={months ? 2 : 1}
            showOutsideDays={outside}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
