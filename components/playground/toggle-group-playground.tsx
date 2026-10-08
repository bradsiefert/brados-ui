"use client"

import { TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon } from "@phosphor-icons/react"
import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type GroupVariant = "default" | "outline"
type Orientation = "horizontal" | "vertical"

const variants: Choice<GroupVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Outline", value: "outline" },
]

const orientations: Choice<Orientation>[] = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
]

const groupProps = [
  { name: "variant", type: "string", defaultValue: "default" },
  { name: "orientation", type: "string", defaultValue: "horizontal" },
  { name: "multiple", type: "boolean", defaultValue: "false" },
]

function AlignGroup({
  variant,
  orientation,
  multiple,
}: {
  variant: GroupVariant
  orientation: Orientation
  multiple: boolean
}): React.ReactElement {
  return (
    <ToggleGroup
      aria-label="Alignment"
      defaultValue={["left"]}
      multiple={multiple}
      orientation={orientation}
      variant={variant}
    >
      <ToggleGroupItem aria-label="Align left" value="left">
        <TextAlignLeftIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align center" value="center">
        <TextAlignCenterIcon aria-hidden="true" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Align right" value="right">
        <TextAlignRightIcon aria-hidden="true" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToggleGroupPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [variant, setVariant] = React.useState<GroupVariant>("outline")
  const [orientation, setOrientation] = React.useState<Orientation>("horizontal")
  const [multiple, setMultiple] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="toggle-group-variant"
            label="Variant"
            onChange={setVariant}
            options={variants}
            value={variant}
          />
          <ChoiceField
            id="toggle-group-orientation"
            label="Orientation"
            onChange={setOrientation}
            options={orientations}
            value={orientation}
          />
          <SwitchField
            checked={multiple}
            id="toggle-group-multiple"
            label="Multiple"
            onCheckedChange={setMultiple}
          />
          <Separator />
          <PropsList props={groupProps} />
          <CompositionNote>
            One group shares the pressed state. Multiple allows more than one item to stay on.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Outline, default, vertical, and multiple."
        title="Toggle group"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Outline">
            <AlignGroup multiple={false} orientation="horizontal" variant="outline" />
          </GalleryGroup>
          <GalleryGroup label="Default">
            <AlignGroup multiple={false} orientation="horizontal" variant="default" />
          </GalleryGroup>
          <GalleryGroup label="Vertical">
            <AlignGroup multiple={false} orientation="vertical" variant="outline" />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <AlignGroup multiple={multiple} orientation={orientation} variant={variant} />
        </div>
      )}
    </PlaygroundShell>
  )
}
