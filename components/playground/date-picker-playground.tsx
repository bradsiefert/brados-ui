"use client"

import { CalendarBlankIcon } from "@phosphor-icons/react"
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
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

const pickerProps = [
  { name: "mode", type: "string", defaultValue: "single" },
  { name: "selected", type: "Date", defaultValue: "—" },
]

function formatDate(date: Date | undefined): string {
  if (!date) {
    return "Pick a date"
  }
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date)
}

function DatePicker({
  closeOnSelect,
}: {
  closeOnSelect: boolean
}): React.ReactElement {
  const [date, setDate] = React.useState<Date | undefined>()
  const [open, setOpen] = React.useState(false)

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button className="w-64 justify-start font-normal" type="button" variant="outline" />
        }
      >
        <CalendarBlankIcon aria-hidden="true" />
        {formatDate(date)}
      </PopoverTrigger>
      <PopoverPopup align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          onSelect={(next) => {
            setDate(next)
            if (closeOnSelect) {
              setOpen(false)
            }
          }}
          selected={date}
        />
      </PopoverPopup>
    </Popover>
  )
}

export function DatePickerPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [closeOnSelect, setCloseOnSelect] = React.useState(true)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={closeOnSelect}
            id="date-picker-close"
            label="Close on select"
            onCheckedChange={setCloseOnSelect}
          />
          <Separator />
          <PropsList props={pickerProps} />
          <CompositionNote>
            A date picker is a <span className="font-mono text-foreground">Popover</span> around a{" "}
            <span className="font-mono text-foreground">Calendar</span>. Control{" "}
            <span className="font-mono text-foreground">open</span> to close after a choice.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A calendar inside a popover." title="Date picker">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Popover" layout="stack">
            <DatePicker closeOnSelect />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <DatePicker closeOnSelect={closeOnSelect} />
        </div>
      )}
    </PlaygroundShell>
  )
}
