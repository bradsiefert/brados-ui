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
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuPopup,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Separator } from "@/components/ui/separator"

const menuProps = [
  { name: "children", type: "ReactNode", defaultValue: "—" },
]

function Surface(): React.ReactElement {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-xl border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}

export function ContextMenuPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={menuProps} />
          <CompositionNote>
            The menu opens at the pointer. Right click or long press the dashed surface.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A menu that opens at the pointer." title="Context menu">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Surface" layout="stack">
            <Surface />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Surface />
        </div>
      )}
    </PlaygroundShell>
  )
}
