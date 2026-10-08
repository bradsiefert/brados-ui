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
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@/components/ui/preview-card"
import { Separator } from "@/components/ui/separator"

const cardProps = [{ name: "children", type: "ReactNode", defaultValue: "—" }]

function SamplePreview(): React.ReactElement {
  return (
    <PreviewCard>
      <PreviewCardTrigger
        className="text-sm underline"
        href="https://coss.com/ui"
        render={<a />}
      >
        coss ui
      </PreviewCardTrigger>
      <PreviewCardPopup className="w-64 p-3">
        <p className="font-medium text-sm">coss ui</p>
        <p className="text-muted-foreground text-xs">Components built on Base UI.</p>
      </PreviewCardPopup>
    </PreviewCard>
  )
}

export function PreviewCardPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={cardProps} />
          <CompositionNote>
            Hover the link to preview it. The popup is for sighted users; the link still navigates.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A hover preview on a link." title="Preview card">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Link">
            <SamplePreview />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SamplePreview />
        </div>
      )}
    </PlaygroundShell>
  )
}
