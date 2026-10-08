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
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"

const spinnerProps = [{ name: "className", type: "string", defaultValue: "—" }]

export function SpinnerPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={spinnerProps} />
          <CompositionNote>
            Size the spinner with a size class. It already has an accessible loading name.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Sizes, and a spinner inside a button." title="Spinner">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Sizes">
            <Spinner className="size-4" />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
          </GalleryGroup>
          <GalleryGroup label="In a button">
            <Button disabled type="button">
              <Spinner className="size-4" />
              Saving
            </Button>
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Spinner className="size-6" />
        </div>
      )}
    </PlaygroundShell>
  )
}
