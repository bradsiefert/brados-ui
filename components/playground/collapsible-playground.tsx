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
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

const collapsibleProps = [
  { name: "open", type: "boolean", defaultValue: "—" },
  { name: "defaultOpen", type: "boolean", defaultValue: "false" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function Details({
  open,
  defaultOpen,
  onOpenChange,
  disabled = false,
}: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
}): React.ReactElement {
  return (
    <Collapsible
      className="w-full max-w-sm"
      defaultOpen={defaultOpen}
      disabled={disabled}
      onOpenChange={onOpenChange}
      open={open}
    >
      <CollapsibleTrigger render={<Button type="button" variant="outline" />}>
        Release notes
      </CollapsibleTrigger>
      <CollapsiblePanel className="pt-3 text-muted-foreground text-sm">
        Version 2 adds grouped suggestions and a bare dialog footer.
      </CollapsiblePanel>
    </Collapsible>
  )
}

function CollapsibleGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Closed" layout="stack">
        <Details />
      </GalleryGroup>
      <GalleryGroup label="Open" layout="stack">
        <Details defaultOpen />
      </GalleryGroup>
      <GalleryGroup label="Disabled" layout="stack">
        <Details disabled />
      </GalleryGroup>
    </Gallery>
  )
}

export function CollapsiblePlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [open, setOpen] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField checked={open} id="collapsible-open" label="Open" onCheckedChange={setOpen} />
          <SwitchField
            checked={disabled}
            id="collapsible-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={collapsibleProps} />
          <CompositionNote>
            One trigger and one panel. Use an accordion when several sections share the open
            state.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Closed, open, and a disabled trigger." title="Collapsible">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <CollapsibleGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Details disabled={disabled} onOpenChange={setOpen} open={open} />
        </div>
      )}
    </PlaygroundShell>
  )
}
