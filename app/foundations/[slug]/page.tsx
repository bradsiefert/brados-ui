import { notFound } from "next/navigation"
import type * as React from "react"

import { ColorScale } from "@/components/color-scale"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { BorderRadii } from "@/components/showcase/border-radii"
import { InlineHeights } from "@/components/showcase/inline-heights"
import { InlineSizes } from "@/components/showcase/inline-sizes"
import { Typography } from "@/components/showcase/typography"
import { findFoundation, foundationEntries } from "@/lib/component-sections"

export function generateStaticParams(): { slug: string }[] {
  return foundationEntries.map((entry) => ({ slug: entry.slug }))
}

function FoundationBoard({ slug }: { slug: string }): React.ReactElement | null {
  if (slug === "colors") {
    return <ColorScale />
  }

  if (slug === "typography") {
    return <Typography />
  }

  if (slug === "inline-heights") {
    return <InlineHeights />
  }

  if (slug === "border-radii") {
    return <BorderRadii />
  }

  if (slug === "sizes") {
    return <InlineSizes />
  }

  return null
}

export default async function FoundationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<React.ReactElement> {
  const { slug } = await params
  const entry = findFoundation(slug)

  if (!entry) {
    notFound()
  }

  return (
    <PlaygroundShell>
      <CanvasIntro description={entry.description} title={entry.title} />
      <div className="p-4 md:p-6">
        <FoundationBoard slug={entry.slug} />
      </div>
    </PlaygroundShell>
  )
}
