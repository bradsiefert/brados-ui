"use client"

import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/autocomplete"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type Produce = { label: string; value: string }
type ProduceGroup = { value: string; items: Produce[] }
type AutocompleteSize = "sm" | "default" | "lg"

const produce: Produce[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
]

const groups: ProduceGroup[] = [
  {
    value: "Fruits",
    items: produce,
  },
  {
    value: "Vegetables",
    items: [
      { label: "Carrot", value: "carrot" },
      { label: "Kale", value: "kale" },
      { label: "Leek", value: "leek" },
    ],
  },
]

const sizes: Choice<AutocompleteSize>[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const autocompleteProps = [
  { name: "items", type: "array", defaultValue: "—" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
  { name: "size", type: "string", defaultValue: "default" },
  { name: "showClear", type: "boolean", defaultValue: "false" },
  { name: "showTrigger", type: "boolean", defaultValue: "false" },
]

function ProduceInput({
  size,
  showClear,
  showTrigger,
  startAddon,
  disabled,
  placeholder,
}: {
  size: AutocompleteSize
  showClear: boolean
  showTrigger: boolean
  startAddon: boolean
  disabled: boolean
  placeholder: string
}): React.ReactElement {
  return (
    <AutocompleteInput
      aria-label="Search produce"
      disabled={disabled}
      placeholder={placeholder}
      showClear={showClear}
      showTrigger={showTrigger}
      size={size}
      startAddon={startAddon ? <MagnifyingGlassIcon aria-hidden="true" /> : undefined}
    />
  )
}

function ProduceItem({ item }: { item: Produce }): React.ReactElement {
  return <AutocompleteItem value={item}>{item.label}</AutocompleteItem>
}

function ProduceField({
  size = "default",
  showClear = false,
  showTrigger = false,
  startAddon = false,
  disabled = false,
  grouped = false,
  placeholder = "Search produce…",
}: {
  size?: AutocompleteSize
  showClear?: boolean
  showTrigger?: boolean
  startAddon?: boolean
  disabled?: boolean
  grouped?: boolean
  placeholder?: string
}): React.ReactElement {
  const input = (
    <ProduceInput
      disabled={disabled}
      placeholder={placeholder}
      showClear={showClear}
      showTrigger={showTrigger}
      size={size}
      startAddon={startAddon}
    />
  )

  if (grouped) {
    return (
      <div className="w-56">
        <Autocomplete
          defaultValue={showClear ? "Apple" : undefined}
          disabled={disabled}
          items={groups}
          key={showClear ? "grouped-clear" : "grouped"}
        >
          {input}
          <AutocompletePopup>
            <AutocompleteEmpty>No matches.</AutocompleteEmpty>
            <AutocompleteList>
              {(group: ProduceGroup) => (
                <AutocompleteGroup items={group.items} key={group.value}>
                  <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                  <AutocompleteCollection>
                    {(item: Produce) => <ProduceItem item={item} key={item.value} />}
                  </AutocompleteCollection>
                </AutocompleteGroup>
              )}
            </AutocompleteList>
          </AutocompletePopup>
        </Autocomplete>
      </div>
    )
  }

  return (
    <div className="w-56">
      <Autocomplete
        defaultValue={showClear ? "Apple" : undefined}
        disabled={disabled}
        items={produce}
        key={showClear ? "flat-clear" : "flat"}
      >
        {input}
        <AutocompletePopup>
          <AutocompleteEmpty>No matches.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: Produce) => <ProduceItem item={item} key={item.value} />}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  )
}

function AutocompleteGallery(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <GalleryGroup label="Sizes">
        <ProduceField size="sm" />
        <ProduceField />
        <ProduceField size="lg" />
      </GalleryGroup>
      <GalleryGroup label="Affordances">
        <ProduceField />
        <ProduceField showClear />
        <ProduceField showTrigger />
        <ProduceField startAddon />
      </GalleryGroup>
      <GalleryGroup label="Disabled">
        <ProduceField disabled />
      </GalleryGroup>
      <GalleryGroup label="Grouped">
        <ProduceField grouped showTrigger />
      </GalleryGroup>
    </div>
  )
}

export function AutocompletePlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [size, setSize] = React.useState<AutocompleteSize>("default")
  const [showClear, setShowClear] = React.useState(false)
  const [showTrigger, setShowTrigger] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)
  const [grouped, setGrouped] = React.useState(false)
  const [placeholder, setPlaceholder] = React.useState("Search produce…")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="autocomplete-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="autocomplete-placeholder">Placeholder</Label>
            <Input
              id="autocomplete-placeholder"
              onChange={(event) => setPlaceholder(event.target.value)}
              value={placeholder}
            />
          </div>
          <SwitchField
            checked={showClear}
            id="autocomplete-clear"
            label="Clear"
            onCheckedChange={setShowClear}
          />
          <SwitchField
            checked={showTrigger}
            id="autocomplete-trigger"
            label="Trigger"
            onCheckedChange={setShowTrigger}
          />
          <SwitchField
            checked={disabled}
            id="autocomplete-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <SwitchField
            checked={grouped}
            id="autocomplete-grouped"
            label="Grouped"
            onCheckedChange={setGrouped}
          />
          <Separator />
          <PropsList props={autocompleteProps} />
          <CompositionNote>
            Always include <span className="font-mono text-foreground">AutocompleteEmpty</span>.
            Grouped lists pass each group&apos;s items into{" "}
            <span className="font-mono text-foreground">AutocompleteGroup</span> and render them
            with <span className="font-mono text-foreground">AutocompleteCollection</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Sizes, clear and trigger buttons, and grouped suggestions."
        title="Autocomplete"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <AutocompleteGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <ProduceField
            disabled={disabled}
            grouped={grouped}
            placeholder={placeholder}
            showClear={showClear}
            showTrigger={showTrigger}
            size={size}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
