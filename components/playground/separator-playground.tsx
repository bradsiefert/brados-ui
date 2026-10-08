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
import { Separator } from "@/components/ui/separator"

type Orientation = "horizontal" | "vertical"

const orientations: Choice<Orientation>[] = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
]

const separatorProps = [
  { name: "orientation", type: "string", defaultValue: "horizontal" },
]

function SampleSeparator({ orientation }: { orientation: Orientation }): React.ReactElement {
  if (orientation === "vertical") {
    return (
      <div className="flex h-8 items-center gap-3 text-sm">
        <span>Notes</span>
        <Separator orientation="vertical" />
        <span>Files</span>
      </div>
    )
  }
  return (
    <div className="grid w-64 gap-3 text-sm">
      <span>Notes</span>
      <Separator />
      <span>Files</span>
    </div>
  )
}

export function SeparatorPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [orientation, setOrientation] = React.useState<Orientation>("horizontal")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="separator-orientation"
            label="Orientation"
            onChange={setOrientation}
            options={orientations}
            value={orientation}
          />
          <PropsList props={separatorProps} />
          <CompositionNote>
            A horizontal rule splits stacked content. A vertical rule splits items on one row.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Horizontal and vertical rules." title="Separator">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Horizontal" layout="stack">
            <SampleSeparator orientation="horizontal" />
          </GalleryGroup>
          <GalleryGroup label="Vertical">
            <SampleSeparator orientation="vertical" />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleSeparator orientation={orientation} />
        </div>
      )}
    </PlaygroundShell>
  )
}
