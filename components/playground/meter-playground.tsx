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
import { Meter, MeterLabel, MeterValue } from "@/components/ui/meter"
import { Separator } from "@/components/ui/separator"

const meterProps = [
  { name: "value", type: "number", defaultValue: "—" },
  { name: "min", type: "number", defaultValue: "0" },
  { name: "max", type: "number", defaultValue: "100" },
]

function SampleMeter({ value, label }: { value: number; label: string }): React.ReactElement {
  return (
    <Meter className="w-64" max={100} min={0} value={value}>
      <div className="flex items-center justify-between">
        <MeterLabel>{label}</MeterLabel>
        <MeterValue />
      </div>
    </Meter>
  )
}

export function MeterPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={meterProps} />
          <CompositionNote>
            A meter shows a known quantity, such as storage used. Task completion uses progress.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Low, mid, and full measurements." title="Meter">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Values" layout="stack">
            <SampleMeter label="Storage" value={24} />
            <SampleMeter label="Storage" value={64} />
            <SampleMeter label="Storage" value={100} />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleMeter label="Storage" value={64} />
        </div>
      )}
    </PlaygroundShell>
  )
}
