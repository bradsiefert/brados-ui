"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

type Side = "right" | "left" | "top" | "bottom"
type SheetVariant = "default" | "inset"

const sides: Choice<Side>[] = [
  { label: "Right", value: "right" },
  { label: "Left", value: "left" },
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
]

const variants: Choice<SheetVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Inset", value: "inset" },
]

const sheetProps = [
  { name: "side", type: "string", defaultValue: "right" },
  { name: "variant", type: "string", defaultValue: "default" },
]

function SampleSheet({
  side,
  variant,
  trigger,
}: {
  side: Side
  variant: SheetVariant
  trigger: string
}): React.ReactElement {
  return (
    <Sheet>
      <SheetTrigger render={<Button type="button" variant="outline" />}>{trigger}</SheetTrigger>
      <SheetPopup side={side} variant={variant}>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>Density and theme for this workspace.</SheetDescription>
        </SheetHeader>
        <SheetPanel className="text-sm">Changes apply to this browser.</SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button type="button" variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}

export function SheetPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [side, setSide] = React.useState<Side>("right")
  const [variant, setVariant] = React.useState<SheetVariant>("default")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField id="sheet-side" label="Side" onChange={setSide} options={sides} value={side} />
          <ChoiceField
            id="sheet-variant"
            label="Variant"
            onChange={setVariant}
            options={variants}
            value={variant}
          />
          <Separator />
          <PropsList props={sheetProps} />
          <CompositionNote>
            A sheet is a dialog that docks to an edge. Inset keeps a margin around the panel.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Sides and an inset panel." title="Sheet">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Side">
            <SampleSheet side="right" trigger="Right" variant="default" />
            <SampleSheet side="left" trigger="Left" variant="default" />
            <SampleSheet side="right" trigger="Inset" variant="inset" />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleSheet side={side} trigger="Open sheet" variant={variant} />
        </div>
      )}
    </PlaygroundShell>
  )
}
