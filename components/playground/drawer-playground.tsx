"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"

type DrawerSide = "bottom" | "right" | "left" | "top"

const sides: Choice<DrawerSide>[] = [
  { label: "Bottom", value: "bottom" },
  { label: "Right", value: "right" },
  { label: "Left", value: "left" },
  { label: "Top", value: "top" },
]

const drawerProps = [
  { name: "position", type: "string", defaultValue: "bottom" },
  { name: "showBar", type: "boolean", defaultValue: "false" },
]

function SampleDrawer({
  position,
  trigger,
}: {
  position: DrawerSide
  trigger: string
}): React.ReactElement {
  return (
    <Drawer>
      <DrawerTrigger render={<Button type="button" variant="outline" />}>
        {trigger}
      </DrawerTrigger>
      <DrawerPopup position={position} showBar={position === "bottom"} showCloseButton>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Update the name shown on your projects.</DrawerDescription>
        </DrawerHeader>
        <DrawerPanel className="text-sm">The drawer slides in from the {position}.</DrawerPanel>
        <DrawerFooter>
          <DrawerClose render={<Button type="button" variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  )
}

export function DrawerPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [position, setPosition] = React.useState<DrawerSide>("bottom")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="drawer-position"
            label="Position"
            onChange={setPosition}
            options={sides}
            value={position}
          />
          <Separator />
          <PropsList props={drawerProps} />
          <CompositionNote>
            Open a trigger to slide the panel in. Bottom drawers can show a drag bar.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Panels from the bottom, right, left, and top." title="Drawer">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Position">
            <SampleDrawer position="bottom" trigger="Bottom" />
            <SampleDrawer position="right" trigger="Right" />
            <SampleDrawer position="left" trigger="Left" />
            <SampleDrawer position="top" trigger="Top" />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleDrawer position={position} trigger="Open drawer" />
        </div>
      )}
    </PlaygroundShell>
  )
}
