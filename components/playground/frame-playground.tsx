"use client"

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
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/components/ui/frame"
import { Separator } from "@/components/ui/separator"

const frameProps = [{ name: "children", type: "ReactNode", defaultValue: "—" }]

function SampleFrame({ footer }: { footer: boolean }): React.ReactElement {
  return (
    <Frame className="w-full max-w-sm">
      <FrameHeader>
        <FrameTitle>Notes</FrameTitle>
        <FrameDescription>Shared with the studio.</FrameDescription>
      </FrameHeader>
      <FramePanel className="text-sm">Three open comments on the latest draft.</FramePanel>
      {footer ? <FrameFooter className="text-muted-foreground text-xs">Updated today</FrameFooter> : null}
    </Frame>
  )
}

export function FramePlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [footer, setFooter] = React.useState(true)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField checked={footer} id="frame-footer" label="Footer" onCheckedChange={setFooter} />
          <Separator />
          <PropsList props={frameProps} />
          <CompositionNote>
            A frame groups a header, panel, and optional footer on one surface.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A framed header, panel, and footer." title="Frame">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="With footer" layout="stack">
            <SampleFrame footer />
          </GalleryGroup>
          <GalleryGroup label="Panel only" layout="stack">
            <SampleFrame footer={false} />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleFrame footer={footer} />
        </div>
      )}
    </PlaygroundShell>
  )
}
