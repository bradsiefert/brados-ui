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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = ["Type", "Color", "Space", "Radius", "Shadow", "Motion", "Icon", "Grid", "Type ramp"]

const scrollProps = [{ name: "scrollFade", type: "boolean", defaultValue: "false" }]

function TagList({ horizontal }: { horizontal: boolean }): React.ReactElement {
  return (
    <ScrollArea className={horizontal ? "w-64 whitespace-nowrap" : "h-40 w-48 rounded-lg border"}>
      <div className={horizontal ? "flex gap-2 p-3" : "grid gap-2 p-3"}>
        {tags.map((tag) => (
          <p className="text-sm" key={tag}>
            {tag}
          </p>
        ))}
      </div>
    </ScrollArea>
  )
}

export function ScrollAreaPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={scrollProps} />
          <CompositionNote>
            Constrain the height or width. The scrollbar appears when the content overflows.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Vertical and horizontal overflow." title="Scroll area">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Vertical">
            <TagList horizontal={false} />
          </GalleryGroup>
          <GalleryGroup label="Horizontal">
            <TagList horizontal />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <TagList horizontal={false} />
        </div>
      )}
    </PlaygroundShell>
  )
}
