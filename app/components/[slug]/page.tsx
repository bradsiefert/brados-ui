import { notFound } from "next/navigation"
import type { ReactElement } from "react"

import { AccordionPlayground } from "@/components/playground/accordion-playground"
import { AlertDialogPlayground } from "@/components/playground/alert-dialog-playground"
import { AlertPlayground } from "@/components/playground/alert-playground"
import { AutocompletePlayground } from "@/components/playground/autocomplete-playground"
import { AvatarPlayground } from "@/components/playground/avatar-playground"
import { BadgePlayground } from "@/components/playground/badge-playground"
import { BreadcrumbPlayground } from "@/components/playground/breadcrumb-playground"
import { ButtonPlayground } from "@/components/playground/button-playground"
import { PlaceholderCanvas } from "@/components/playground/placeholder-canvas"
import { PlaygroundShell } from "@/components/playground/playground-shell"
import { componentEntries, findComponent } from "@/lib/component-sections"

const playgrounds: Record<string, () => ReactElement> = {
  accordion: AccordionPlayground,
  alert: AlertPlayground,
  "alert-dialog": AlertDialogPlayground,
  autocomplete: AutocompletePlayground,
  avatar: AvatarPlayground,
  badges: BadgePlayground,
  breadcrumb: BreadcrumbPlayground,
  button: ButtonPlayground,
}

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

  const Playground = playgrounds[entry.slug]
  if (Playground) {
    return <Playground />
  }

  return (
    <PlaygroundShell>
      <PlaceholderCanvas description={entry.description} title={entry.title} />
    </PlaygroundShell>
  )
}
