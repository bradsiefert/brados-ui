"use client"

import { TextBIcon, TextItalicIcon, TextUnderlineIcon } from "@phosphor-icons/react"
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@/components/ui/toolbar"

const toolbarProps = [{ name: "children", type: "ReactNode", defaultValue: "—" }]

function EditorToolbar(): React.ReactElement {
  return (
    <Toolbar aria-label="Formatting">
      <ToggleGroup defaultValue={["bold"]} variant="outline">
        <ToolbarButton aria-label="Bold" render={<ToggleGroupItem value="bold" />}>
          <TextBIcon aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton aria-label="Italic" render={<ToggleGroupItem value="italic" />}>
          <TextItalicIcon aria-hidden="true" />
        </ToolbarButton>
        <ToolbarButton aria-label="Underline" render={<ToggleGroupItem value="underline" />}>
          <TextUnderlineIcon aria-hidden="true" />
        </ToolbarButton>
      </ToggleGroup>
      <ToolbarSeparator />
      <ToolbarButton render={<Button size="sm" type="button" variant="outline" />}>
        Link
      </ToolbarButton>
    </Toolbar>
  )
}

export function ToolbarPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={toolbarProps} />
          <CompositionNote>
            A toolbar groups toggles and buttons. Give the toolbar an accessible name.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Formatting toggles and a link button." title="Toolbar">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Editor">
            <EditorToolbar />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <EditorToolbar />
        </div>
      )}
    </PlaygroundShell>
  )
}
