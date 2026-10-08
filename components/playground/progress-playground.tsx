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
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

const progressProps = [
  { name: "value", type: "number", defaultValue: "—" },
  { name: "max", type: "number", defaultValue: "100" },
]

function SampleProgress({ value }: { value: number | null }): React.ReactElement {
  return (
    <Progress className="w-64" value={value}>
      <div className="flex items-center justify-between">
        <ProgressLabel>Upload</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  )
}

export function ProgressPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={progressProps} />
          <CompositionNote>
            Pass a value for a known amount. Leave the value empty for an indeterminate task.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Partial, complete, and indeterminate." title="Progress">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Values" layout="stack">
            <SampleProgress value={32} />
            <SampleProgress value={100} />
            <SampleProgress value={null} />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleProgress value={32} />
        </div>
      )}
    </PlaygroundShell>
  )
}
