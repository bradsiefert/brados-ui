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
  Menu,
  MenuCheckboxItem,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "@/components/ui/menu"
import { Separator } from "@/components/ui/separator"

const menuProps = [
  { name: "openOnHover", type: "boolean", defaultValue: "false" },
]

function SampleMenu({ hover }: { hover: boolean }): React.ReactElement {
  return (
    <Menu>
      <MenuTrigger openOnHover={hover} render={<Button type="button" variant="outline" />}>
        Account
      </MenuTrigger>
      <MenuPopup>
        <MenuItem>
          Profile
          <MenuShortcut>⇧⌘P</MenuShortcut>
        </MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuSeparator />
        <MenuCheckboxItem defaultChecked>Show status</MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  )
}

export function MenuPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [hover, setHover] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={hover}
            id="menu-hover"
            label="Open on hover"
            onCheckedChange={setHover}
          />
          <Separator />
          <PropsList props={menuProps} />
          <CompositionNote>
            Compose the trigger with a button. A checkbox item keeps its own checked state.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Actions, a shortcut, and a checkbox item." title="Menu">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Click">
            <SampleMenu hover={false} />
          </GalleryGroup>
          <GalleryGroup label="Hover">
            <SampleMenu hover />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleMenu hover={hover} />
        </div>
      )}
    </PlaygroundShell>
  )
}
