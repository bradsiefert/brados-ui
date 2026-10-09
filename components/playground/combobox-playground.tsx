"use client"

import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@/components/ui/combobox"
import { Separator } from "@/components/ui/separator"

type Produce = { label: string; value: string }
type ProduceGroup = { value: string; items: Produce[] }
type FieldSize = "sm" | "default" | "lg"

const produce: Produce[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
]

const groups: ProduceGroup[] = [
  { value: "Fruits", items: produce },
  {
    value: "Vegetables",
    items: [
      { label: "Carrot", value: "carrot" },
      { label: "Kale", value: "kale" },
    ],
  },
]

const sizes: Choice<FieldSize>[] = [
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const comboboxProps = [
  { name: "items", type: "array", defaultValue: "—" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
  { name: "size", type: "string", defaultValue: "default" },
  { name: "showClear", type: "boolean", defaultValue: "false" },
  { name: "showTrigger", type: "boolean", defaultValue: "true" },
]

function ProduceItem({ item }: { item: Produce }): React.ReactElement {
  return <ComboboxItem value={item}>{item.label}</ComboboxItem>
}

function ProduceCombobox({
  size = "default",
  showClear = false,
  showTrigger = true,
  startAddon = false,
  disabled = false,
  grouped = false,
  defaultValue,
}: {
  size?: FieldSize
  showClear?: boolean
  showTrigger?: boolean
  startAddon?: boolean
  disabled?: boolean
  grouped?: boolean
  defaultValue?: Produce
}): React.ReactElement {
  const input = (
    <ComboboxInput
      aria-label="Produce"
      disabled={disabled}
      placeholder="Select produce…"
      showClear={showClear}
      showTrigger={showTrigger}
      size={size}
      startAddon={startAddon ? <MagnifyingGlassIcon aria-hidden="true" /> : undefined}
    />
  )

  if (grouped) {
    return (
      <div className="w-56">
        <Combobox disabled={disabled} items={groups}>
          {input}
          <ComboboxPopup>
            <ComboboxEmpty>No matches.</ComboboxEmpty>
            <ComboboxList>
              {(group: ProduceGroup) => (
                <ComboboxGroup items={group.items} key={group.value}>
                  <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(item: Produce) => <ProduceItem item={item} key={item.value} />}
                  </ComboboxCollection>
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
      </div>
    )
  }

  return (
    <div className="w-56">
      <Combobox defaultValue={defaultValue} disabled={disabled} items={produce}>
        {input}
        <ComboboxPopup>
          <ComboboxEmpty>No matches.</ComboboxEmpty>
          <ComboboxList>
            {(item: Produce) => <ProduceItem item={item} key={item.value} />}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  )
}

function MultipleProduce(): React.ReactElement {
  return (
    <div className="w-64">
      <Combobox defaultValue={[produce[0], produce[1]]} items={produce} multiple>
        <ComboboxChips>
          <ComboboxValue>
            {(value: Produce[] | undefined) => {
              const selected = value ?? []

              return (
                <>
                  {selected.map((item) => (
                    <ComboboxChip aria-label={item.label} key={item.value}>
                      {item.label}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    aria-label="Produce"
                    placeholder={selected.length > 0 ? undefined : "Select produce…"}
                  />
                </>
              )
            }}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxPopup>
          <ComboboxEmpty>No matches.</ComboboxEmpty>
          <ComboboxList>
            {(item: Produce) => <ProduceItem item={item} key={item.value} />}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  )
}

function ComboboxGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Sizes">
        <ProduceCombobox size="sm" />
        <ProduceCombobox />
        <ProduceCombobox size="lg" />
      </GalleryGroup>
      <GalleryGroup label="Clear">
        <ProduceCombobox defaultValue={produce[0]} showClear />
      </GalleryGroup>
      <GalleryGroup label="Disabled">
        <ProduceCombobox disabled />
      </GalleryGroup>
      <GalleryGroup label="Grouped">
        <ProduceCombobox grouped />
      </GalleryGroup>
      <GalleryGroup label="Multiple">
        <MultipleProduce />
      </GalleryGroup>
    </Gallery>
  )
}

export function ComboboxPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [size, setSize] = React.useState<FieldSize>("default")
  const [showClear, setShowClear] = React.useState(false)
  const [showTrigger, setShowTrigger] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)
  const [grouped, setGrouped] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="combobox-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <SwitchField
            checked={showClear}
            id="combobox-clear"
            label="Clear"
            onCheckedChange={setShowClear}
          />
          <SwitchField
            checked={showTrigger}
            id="combobox-trigger"
            label="Trigger"
            onCheckedChange={setShowTrigger}
          />
          <SwitchField
            checked={disabled}
            id="combobox-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <SwitchField
            checked={grouped}
            id="combobox-grouped"
            label="Grouped"
            onCheckedChange={setGrouped}
          />
          <Separator />
          <PropsList props={comboboxProps} />
          <CompositionNote>
            Include <span className="font-mono text-foreground">ComboboxEmpty</span>. Grouped
            lists pass each group into <span className="font-mono text-foreground">ComboboxGroup</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Sizes, a clear button, grouped items, and multiple selection."
        title="Combobox"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <ComboboxGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <ProduceCombobox
            disabled={disabled}
            grouped={grouped}
            showClear={showClear}
            showTrigger={showTrigger}
            size={size}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
