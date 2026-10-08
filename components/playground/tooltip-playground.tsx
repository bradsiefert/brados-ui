"use client"

import { GearIcon } from "@phosphor-icons/react"
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
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const tooltipProps = [{ name: "children", type: "ReactNode", defaultValue: "—" }]

function Hint({ icon }: { icon: boolean }): React.ReactElement {
  return (
    <Tooltip>
      <TooltipTrigger
        aria-label={icon ? "Settings" : undefined}
        render={<Button size={icon ? "icon" : "default"} type="button" variant="outline" />}
      >
        {icon ? <GearIcon aria-hidden="true" /> : "Hover"}
      </TooltipTrigger>
      <TooltipPopup>Settings</TooltipPopup>
    </Tooltip>
  )
}

export function TooltipPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={tooltipProps} />
          <CompositionNote>
            Hover or focus the trigger. An icon-only trigger still needs an accessible name.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A text trigger and an icon trigger." title="Tooltip">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      <TooltipProvider>
        {mode === "gallery" ? (
          <Gallery>
            <GalleryGroup label="Triggers">
              <Hint icon={false} />
              <Hint icon />
            </GalleryGroup>
          </Gallery>
        ) : (
          <div className="flex min-h-80 flex-1 items-center justify-center p-8">
            <Hint icon />
          </div>
        )}
      </TooltipProvider>
    </PlaygroundShell>
  )
}
