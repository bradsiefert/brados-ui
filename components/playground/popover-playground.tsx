"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  type CanvasMode,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverClose,
  PopoverDescription,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

const popoverProps = [{ name: "open", type: "boolean", defaultValue: "—" }]

function SamplePopover({ close }: { close: boolean }): React.ReactElement {
  return (
    <Popover>
      <PopoverTrigger render={<Button type="button" variant="outline" />}>
        Dimensions
      </PopoverTrigger>
      <PopoverPopup className="w-64">
        <PopoverTitle>Width</PopoverTitle>
        <PopoverDescription>The panel is 320 pixels wide on desktop.</PopoverDescription>
        {close ? (
          <PopoverClose className="mt-3" render={<Button size="sm" type="button" />}>
            Done
          </PopoverClose>
        ) : null}
      </PopoverPopup>
    </Popover>
  )
}

export function PopoverPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={popoverProps} />
          <CompositionNote>
            A popover stays next to its trigger. Use a dialog when the content must take focus.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A hint with an optional close button." title="Popover">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Triggers">
            <SamplePopover close={false} />
            <SamplePopover close />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SamplePopover close />
        </div>
      )}
    </PlaygroundShell>
  )
}
