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
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"

const kbdProps = [{ name: "children", type: "ReactNode", defaultValue: "—" }]

export function KbdPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={kbdProps} />
          <CompositionNote>
            One key is a <span className="font-mono text-foreground">Kbd</span>. A chord uses{" "}
            <span className="font-mono text-foreground">KbdGroup</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Single keys and a shortcut chord." title="Kbd">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Keys">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <Kbd>Esc</Kbd>
          </GalleryGroup>
          <GalleryGroup label="Chord">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center gap-2 p-8">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
      )}
    </PlaygroundShell>
  )
}
