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
import { CalendarPlayground } from "@/components/playground/calendar-playground"
import { CardPlayground } from "@/components/playground/card-playground"
import { CheckboxGroupPlayground } from "@/components/playground/checkbox-group-playground"
import { CheckboxPlayground } from "@/components/playground/checkbox-playground"
import { CollapsiblePlayground } from "@/components/playground/collapsible-playground"
import { ComboboxPlayground } from "@/components/playground/combobox-playground"
import { CommandPlayground } from "@/components/playground/command-playground"
import { DialogPlayground } from "@/components/playground/dialog-playground"
import { InputGroupPlayground } from "@/components/playground/input-group-playground"
import { NumberFieldPlayground } from "@/components/playground/number-field-playground"
import { RadioPlayground } from "@/components/playground/radio-playground"
import { SelectPlayground } from "@/components/playground/select-playground"
import { SliderPlayground } from "@/components/playground/slider-playground"
import { SwitchPlayground } from "@/components/playground/switch-playground"
import { TabsPlayground } from "@/components/playground/tabs-playground"
import { TextInputPlayground } from "@/components/playground/text-input-playground"
import { TextareaPlayground } from "@/components/playground/textarea-playground"
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
  calendar: CalendarPlayground,
  card: CardPlayground,
  checkbox: CheckboxPlayground,
  "checkbox-group": CheckboxGroupPlayground,
  collapsible: CollapsiblePlayground,
  combobox: ComboboxPlayground,
  command: CommandPlayground,
  dialog: DialogPlayground,
  "input-groups": InputGroupPlayground,
  "number-field": NumberFieldPlayground,
  radio: RadioPlayground,
  select: SelectPlayground,
  slider: SliderPlayground,
  switch: SwitchPlayground,
  tabs: TabsPlayground,
  "text-inputs": TextInputPlayground,
  textarea: TextareaPlayground,
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
