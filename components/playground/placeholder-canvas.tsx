import type * as React from "react"

import { CanvasIntro } from "@/components/playground/playground-shell"

export function PlaceholderCanvas({
  title,
  description,
}: {
  title: string
  description: string
}): React.ReactElement {
  return (
    <>
      <CanvasIntro description={description} title={title} />
      <p className="p-4 text-muted-foreground text-sm md:p-6">Not built yet.</p>
    </>
  )
}
