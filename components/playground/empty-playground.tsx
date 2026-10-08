"use client"

import { FolderOpenIcon } from "@phosphor-icons/react"
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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"

const emptyProps = [
  { name: "variant", type: "string", defaultValue: "default" },
]

function EmptyState({ actions }: { actions: boolean }): React.ReactElement {
  return (
    <Empty className="w-full max-w-sm border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon />
        </EmptyMedia>
        <EmptyTitle>No projects</EmptyTitle>
        <EmptyDescription>Create a project to see it listed here.</EmptyDescription>
      </EmptyHeader>
      {actions ? (
        <EmptyContent>
          <Button type="button">New project</Button>
        </EmptyContent>
      ) : null}
    </Empty>
  )
}

export function EmptyPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [actions, setActions] = React.useState(true)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={actions}
            id="empty-actions"
            label="Action"
            onCheckedChange={setActions}
          />
          <Separator />
          <PropsList props={emptyProps} />
          <CompositionNote>
            Use an icon media, a title, and a description. Put recovery actions in{" "}
            <span className="font-mono text-foreground">EmptyContent</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="An empty list with an optional action." title="Empty">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="With action" layout="stack">
            <EmptyState actions />
          </GalleryGroup>
          <GalleryGroup label="Message only" layout="stack">
            <EmptyState actions={false} />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <EmptyState actions={actions} />
        </div>
      )}
    </PlaygroundShell>
  )
}
