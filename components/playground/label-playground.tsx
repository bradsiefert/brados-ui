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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const labelProps = [{ name: "htmlFor", type: "string", defaultValue: "—" }]

function Labeled({ id, text }: { id: string; text: string }): React.ReactElement {
  return (
    <div className="grid w-64 gap-2">
      <Label htmlFor={id}>{text}</Label>
      <Input id={id} placeholder="Ada Lovelace" />
    </div>
  )
}

export function LabelPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const id = React.useId()

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={labelProps} />
          <CompositionNote>
            Point <span className="font-mono text-foreground">htmlFor</span> at the control id so
            the label focuses it.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A label tied to a text field." title="Label">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Name" layout="stack">
            <Labeled id="gallery-name" text="Name" />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Labeled id={id} text="Name" />
        </div>
      )}
    </PlaygroundShell>
  )
}
