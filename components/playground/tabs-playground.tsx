"use client"

import { GearIcon, HouseIcon, UserIcon } from "@phosphor-icons/react"
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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsPanel, TabsTab, type TabsVariant } from "@/components/ui/tabs"

type Orientation = "horizontal" | "vertical"

const variants: Choice<TabsVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Underline", value: "underline" },
]

const orientations: Choice<Orientation>[] = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
]

const tabsProps = [
  { name: "variant", type: "string", defaultValue: "default" },
  { name: "orientation", type: "string", defaultValue: "horizontal" },
  { name: "defaultValue", type: "string", defaultValue: "—" },
]

function SampleTabs({
  variant,
  orientation = "horizontal",
  icons = false,
}: {
  variant: TabsVariant
  orientation?: Orientation
  icons?: boolean
}): React.ReactElement {
  return (
    <Tabs className="w-full max-w-md" defaultValue="overview" orientation={orientation}>
      <TabsList variant={variant}>
        <TabsTab value="overview">
          {icons ? <HouseIcon aria-hidden="true" /> : null}
          Overview
        </TabsTab>
        <TabsTab value="account">
          {icons ? <UserIcon aria-hidden="true" /> : null}
          Account
        </TabsTab>
        <TabsTab value="settings">
          {icons ? <GearIcon aria-hidden="true" /> : null}
          Settings
        </TabsTab>
      </TabsList>
      <TabsPanel className="text-sm" value="overview">
        Project activity from the last seven days.
      </TabsPanel>
      <TabsPanel className="text-sm" value="account">
        Name, email, and connected sign-in methods.
      </TabsPanel>
      <TabsPanel className="text-sm" value="settings">
        Theme, density, and notification preferences.
      </TabsPanel>
    </Tabs>
  )
}

function TabsGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Default" layout="stack">
        <SampleTabs variant="default" />
      </GalleryGroup>
      <GalleryGroup label="Underline" layout="stack">
        <SampleTabs variant="underline" />
      </GalleryGroup>
      <GalleryGroup label="Icons" layout="stack">
        <SampleTabs icons variant="default" />
      </GalleryGroup>
      <GalleryGroup label="Vertical" layout="stack">
        <SampleTabs orientation="vertical" variant="underline" />
      </GalleryGroup>
    </Gallery>
  )
}

export function TabsPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [variant, setVariant] = React.useState<TabsVariant>("default")
  const [orientation, setOrientation] = React.useState<Orientation>("horizontal")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="tabs-variant"
            label="Variant"
            onChange={setVariant}
            options={variants}
            value={variant}
          />
          <ChoiceField
            id="tabs-orientation"
            label="Orientation"
            onChange={setOrientation}
            options={orientations}
            value={orientation}
          />
          <Separator />
          <PropsList props={tabsProps} />
          <CompositionNote>
            <span className="font-mono text-foreground">variant</span> lives on the list.
            Each tab and panel share a <span className="font-mono text-foreground">value</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Default, underline, icons, and vertical." title="Tabs">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <TabsGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleTabs orientation={orientation} variant={variant} />
        </div>
      )}
    </PlaygroundShell>
  )
}
