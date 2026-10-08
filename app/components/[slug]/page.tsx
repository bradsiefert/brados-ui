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
import { ContextMenuPlayground } from "@/components/playground/context-menu-playground"
import { DatePickerPlayground } from "@/components/playground/date-picker-playground"
import { DialogPlayground } from "@/components/playground/dialog-playground"
import { DrawerPlayground } from "@/components/playground/drawer-playground"
import { EmptyPlayground } from "@/components/playground/empty-playground"
import { FieldPlayground } from "@/components/playground/field-playground"
import { FieldsetPlayground } from "@/components/playground/fieldset-playground"
import { FormPlayground } from "@/components/playground/form-playground"
import { FramePlayground } from "@/components/playground/frame-playground"
import { GroupPlayground } from "@/components/playground/group-playground"
import { InputGroupPlayground } from "@/components/playground/input-group-playground"
import { KbdPlayground } from "@/components/playground/kbd-playground"
import { LabelPlayground } from "@/components/playground/label-playground"
import { MenuPlayground } from "@/components/playground/menu-playground"
import { MeterPlayground } from "@/components/playground/meter-playground"
import { NumberFieldPlayground } from "@/components/playground/number-field-playground"
import { OtpFieldPlayground } from "@/components/playground/otp-field-playground"
import { PaginationPlayground } from "@/components/playground/pagination-playground"
import { PopoverPlayground } from "@/components/playground/popover-playground"
import { PreviewCardPlayground } from "@/components/playground/preview-card-playground"
import { ProgressPlayground } from "@/components/playground/progress-playground"
import { RadioPlayground } from "@/components/playground/radio-playground"
import { ScrollAreaPlayground } from "@/components/playground/scroll-area-playground"
import { SelectPlayground } from "@/components/playground/select-playground"
import { SeparatorPlayground } from "@/components/playground/separator-playground"
import { SheetPlayground } from "@/components/playground/sheet-playground"
import { SidebarPlayground } from "@/components/playground/sidebar-playground"
import { SkeletonPlayground } from "@/components/playground/skeleton-playground"
import { SliderPlayground } from "@/components/playground/slider-playground"
import { SpinnerPlayground } from "@/components/playground/spinner-playground"
import { SwitchPlayground } from "@/components/playground/switch-playground"
import { TablePlayground } from "@/components/playground/table-playground"
import { TabsPlayground } from "@/components/playground/tabs-playground"
import { TextInputPlayground } from "@/components/playground/text-input-playground"
import { TextareaPlayground } from "@/components/playground/textarea-playground"
import { ToastPlayground } from "@/components/playground/toast-playground"
import { ToggleGroupPlayground } from "@/components/playground/toggle-group-playground"
import { TogglePlayground } from "@/components/playground/toggle-playground"
import { ToolbarPlayground } from "@/components/playground/toolbar-playground"
import { TooltipPlayground } from "@/components/playground/tooltip-playground"
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
  "context-menu": ContextMenuPlayground,
  "date-picker": DatePickerPlayground,
  dialog: DialogPlayground,
  drawer: DrawerPlayground,
  empty: EmptyPlayground,
  field: FieldPlayground,
  fieldset: FieldsetPlayground,
  form: FormPlayground,
  frame: FramePlayground,
  group: GroupPlayground,
  "input-groups": InputGroupPlayground,
  kbd: KbdPlayground,
  label: LabelPlayground,
  menu: MenuPlayground,
  meter: MeterPlayground,
  "number-field": NumberFieldPlayground,
  "otp-field": OtpFieldPlayground,
  pagination: PaginationPlayground,
  popover: PopoverPlayground,
  "preview-card": PreviewCardPlayground,
  progress: ProgressPlayground,
  radio: RadioPlayground,
  "scroll-area": ScrollAreaPlayground,
  select: SelectPlayground,
  separator: SeparatorPlayground,
  sheet: SheetPlayground,
  sidebar: SidebarPlayground,
  skeleton: SkeletonPlayground,
  slider: SliderPlayground,
  spinner: SpinnerPlayground,
  switch: SwitchPlayground,
  table: TablePlayground,
  tabs: TabsPlayground,
  "text-inputs": TextInputPlayground,
  textarea: TextareaPlayground,
  toast: ToastPlayground,
  toggle: TogglePlayground,
  "toggle-group": ToggleGroupPlayground,
  toolbar: ToolbarPlayground,
  tooltip: TooltipPlayground,
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
