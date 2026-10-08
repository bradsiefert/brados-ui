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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"

const pageProps = [{ name: "isActive", type: "boolean", defaultValue: "false" }]

function Pages({ compact }: { compact: boolean }): React.ReactElement {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious render={<button type="button" />} />
        </PaginationItem>
        {compact ? null : (
          <>
            <PaginationItem>
              <PaginationLink isActive render={<button type="button" />}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink render={<button type="button" />}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink render={<button type="button" />}>8</PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext render={<button type="button" />} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function PaginationPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={pageProps} />
          <CompositionNote>
            Mark the current page with <span className="font-mono text-foreground">isActive</span>.
            Collapse a long list with an ellipsis.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Page links, or previous and next only." title="Pagination">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Pages" layout="stack">
            <Pages compact={false} />
          </GalleryGroup>
          <GalleryGroup label="Previous and next" layout="stack">
            <Pages compact />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Pages compact={false} />
        </div>
      )}
    </PlaygroundShell>
  )
}
