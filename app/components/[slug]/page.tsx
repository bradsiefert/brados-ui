import { notFound } from "next/navigation"
import type { ReactElement } from "react"

import { ButtonPlayground } from "@/components/playground/button-playground"
import { PlaceholderCanvas } from "@/components/playground/placeholder-canvas"
import { PlaygroundShell } from "@/components/playground/playground-shell"
import { componentEntries, findComponent } from "@/lib/component-sections"

export function generateStaticParams(): { slug: string }[] {
  return componentEntries.map((entry) => ({ slug: entry.slug }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<ReactElement> {
  const { slug } = await params
  const entry = findComponent(slug)

  if (!entry) {
    notFound()
  }

  if (entry.slug === "button") {
    return <ButtonPlayground />
  }

  return (
    <PlaygroundShell>
      <PlaceholderCanvas description={entry.description} title={entry.title} />
    </PlaygroundShell>
  )
}
