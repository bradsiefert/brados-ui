import { cookies } from "next/headers"
import type { ReactNode } from "react"

import {
  CanvasModeProvider,
  type CanvasMode,
} from "@/components/playground/canvas-parts"
import { LibraryFrame } from "@/components/playground/playground-shell"

function canvasModeFromCookie(value: string | undefined): CanvasMode {
  return value === "gallery" ? "gallery" : "specimen"
}

export default async function ComponentsLayout({
  children,
}: {
  children: ReactNode
}): Promise<ReactNode> {
  const stored = (await cookies()).get("canvas-mode")?.value

  return (
    <CanvasModeProvider initialMode={canvasModeFromCookie(stored)}>
      <LibraryFrame>{children}</LibraryFrame>
    </CanvasModeProvider>
  )
}
