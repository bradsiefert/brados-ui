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
import { Group, GroupSeparator } from "@/components/ui/group"
import { Separator } from "@/components/ui/separator"

type Orientation = "horizontal" | "vertical"

const orientations: Choice<Orientation>[] = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
]

const groupProps = [
  { name: "orientation", type: "string", defaultValue: "horizontal" },
]

function SampleGroup({ orientation }: { orientation: Orientation }): React.ReactElement {
  return (
    <Group orientation={orientation}>
      <Button type="button" variant="outline">
        Day
      </Button>
      <GroupSeparator />
      <Button type="button" variant="outline">
        Week
      </Button>
      <GroupSeparator />
      <Button type="button" variant="outline">
        Month
      </Button>
    </Group>
  )
}

export function GroupPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [orientation, setOrientation] = React.useState<Orientation>("horizontal")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="group-orientation"
            label="Orientation"
            onChange={setOrientation}
            options={orientations}
            value={orientation}
          />
          <Separator />
          <PropsList props={groupProps} />
          <CompositionNote>
            Connected controls share one outline. Put a separator between them.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Horizontal and vertical control clusters." title="Group">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Horizontal">
            <SampleGroup orientation="horizontal" />
          </GalleryGroup>
          <GalleryGroup label="Vertical">
            <SampleGroup orientation="vertical" />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleGroup orientation={orientation} />
        </div>
      )}
    </PlaygroundShell>
  )
}
