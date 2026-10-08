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
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

const skeletonProps = [{ name: "className", type: "string", defaultValue: "—" }]

function ProfileSkeleton(): React.ReactElement {
  return (
    <div className="flex w-64 items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="grid flex-1 gap-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  )
}

function CardSkeleton(): React.ReactElement {
  return (
    <div className="grid w-64 gap-3">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-3 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  )
}

export function SkeletonPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={skeletonProps} />
          <CompositionNote>
            Size the placeholder with classes so it matches the content that will replace it.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A profile row and a card." title="Skeleton">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Profile" layout="stack">
            <ProfileSkeleton />
          </GalleryGroup>
          <GalleryGroup label="Card" layout="stack">
            <CardSkeleton />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <ProfileSkeleton />
        </div>
      )}
    </PlaygroundShell>
  )
}
