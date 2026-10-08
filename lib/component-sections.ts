export type PlaygroundStatus = "ready" | "placeholder"

export type PlaygroundEntry = {
  slug: string
  title: string
  description: string
  href: string
  status: PlaygroundStatus
}

export const foundationEntries: PlaygroundEntry[] = [
  {
    slug: "colors",
    title: "Colors",
    description:
      "Palette and semantic tokens in use. Press p to switch preset and d for light or dark.",
    href: "/foundations/colors",
    status: "ready",
  },
  {
    slug: "inline-heights",
    title: "Inline heights",
    description:
      "Default-size controls that can sit on the same row. Measured height is shown under each sample.",
    href: "/foundations/inline-heights",
    status: "ready",
  },
  {
    slug: "border-radii",
    title: "Border Radii",
    description:
      "Columns are radius steps. Each control sits in the column it uses. Empty cells stay empty.",
    href: "/foundations/border-radii",
    status: "ready",
  },
  {
    slug: "sizes",
    title: "Sizes",
    description:
      "Compare inline controls by desktop height. Token names are captions under each sample.",
    href: "/foundations/sizes",
    status: "ready",
  },
]

export const componentEntries: PlaygroundEntry[] = [
  {
    slug: "accordion",
    title: "Accordion",
    description: "Expandable sections for FAQs and nested content.",
    href: "/components/accordion",
    status: "placeholder",
  },
  {
    slug: "alert",
    title: "Alert",
    description: "Inline status messages with semantic variants.",
    href: "/components/alert",
    status: "placeholder",
  },
  {
    slug: "alert-dialog",
    title: "Alert dialog",
    description: "Confirmation modal for destructive actions.",
    href: "/components/alert-dialog",
    status: "placeholder",
  },
  {
    slug: "autocomplete",
    title: "Autocomplete",
    description: "Searchable combobox with filtered suggestions.",
    href: "/components/autocomplete",
    status: "placeholder",
  },
  {
    slug: "avatar",
    title: "Avatar",
    description: "Image with fallback initials, sizes, and stacked groups.",
    href: "/components/avatar",
    status: "placeholder",
  },
  {
    slug: "badges",
    title: "Badges",
    description: "Variants, sizes, icons, and composition patterns.",
    href: "/components/badges",
    status: "placeholder",
  },
  {
    slug: "breadcrumb",
    title: "Breadcrumb",
    description: "Hierarchy trails with ellipsis, icons, and custom separators.",
    href: "/components/breadcrumb",
    status: "placeholder",
  },
  {
    slug: "button",
    title: "Button",
    description: "Variants, sizes, icons, loading, and composition patterns.",
    href: "/components/button",
    status: "ready",
  },
  {
    slug: "calendar",
    title: "Calendar",
    description: "Date picker grid built on react-day-picker.",
    href: "/components/calendar",
    status: "placeholder",
  },
  {
    slug: "card",
    title: "Card",
    description: "Structured surface with header, panel, footer, and action slots.",
    href: "/components/card",
    status: "placeholder",
  },
  {
    slug: "checkbox",
    title: "Checkbox",
    description: "Single boolean controls with linked labels and disabled state.",
    href: "/components/checkbox",
    status: "placeholder",
  },
  {
    slug: "checkbox-group",
    title: "Checkbox group",
    description: "Multi-select options grouped inside a fieldset.",
    href: "/components/checkbox-group",
    status: "placeholder",
  },
  {
    slug: "collapsible",
    title: "Collapsible",
    description: "Progressive disclosure for optional content.",
    href: "/components/collapsible",
    status: "placeholder",
  },
  {
    slug: "combobox",
    title: "Combobox",
    description: "Searchable selection with filtered suggestions.",
    href: "/components/combobox",
    status: "placeholder",
  },
  {
    slug: "command",
    title: "Command",
    description: "Keyboard-navigable command palette in a dialog overlay.",
    href: "/components/command",
    status: "placeholder",
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "Modal with a heading and optional footer actions.",
    href: "/components/dialog",
    status: "placeholder",
  },
  {
    slug: "input-groups",
    title: "Input groups",
    description: "Inputs with inline addons for icons, prefixes, and suffixes.",
    href: "/components/input-groups",
    status: "placeholder",
  },
  {
    slug: "number-field",
    title: "Number field",
    description: "Stepped numeric input with increment controls and sizes.",
    href: "/components/number-field",
    status: "placeholder",
  },
  {
    slug: "radio",
    title: "Radio",
    description: "Single-choice groups with linked labels and disabled options.",
    href: "/components/radio",
    status: "placeholder",
  },
  {
    slug: "select",
    title: "Select",
    description: "Popup selection with sizes, disabled items, and a disabled trigger.",
    href: "/components/select",
    status: "placeholder",
  },
  {
    slug: "slider",
    title: "Slider",
    description: "Continuous values with a value readout and disabled state.",
    href: "/components/slider",
    status: "placeholder",
  },
  {
    slug: "switch",
    title: "Switch",
    description: "Immediate on/off preferences with default and disabled states.",
    href: "/components/switch",
    status: "placeholder",
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "Segmented panels for switching between related views.",
    href: "/components/tabs",
    status: "placeholder",
  },
  {
    slug: "text-inputs",
    title: "Text inputs",
    description: "Default, sized, disabled, and invalid states with labels and helper text.",
    href: "/components/text-inputs",
    status: "placeholder",
  },
  {
    slug: "textarea",
    title: "Textarea",
    description: "Multi-line text entry with helper text and invalid state.",
    href: "/components/textarea",
    status: "placeholder",
  },
]

export function findFoundation(slug: string): PlaygroundEntry | undefined {
  return foundationEntries.find((entry) => entry.slug === slug)
}

export function findComponent(slug: string): PlaygroundEntry | undefined {
  return componentEntries.find((entry) => entry.slug === slug)
}
