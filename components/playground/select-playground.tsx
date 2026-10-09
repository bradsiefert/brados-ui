"use client"

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
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type FieldSize = "sm" | "default" | "lg"
type Item = { label: string; value: string }

const fruits: Item[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
]

const groups: { value: string; items: Item[] }[] = [
  { value: "Fruits", items: fruits },
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

const selectProps = [
  { name: "items", type: "array", defaultValue: "—" },
  { name: "size", type: "string", defaultValue: "default" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function FruitSelect({
  size = "default",
  disabled = false,
  grouped = false,
  label,
}: {
  size?: FieldSize
  disabled?: boolean
  grouped?: boolean
  label?: string
}): React.ReactElement {
  const id = React.useId()

  if (grouped) {
    return (
      <Select defaultValue={fruits[0]} items={groups}>
        <SelectTrigger className="w-56" disabled={disabled} size={size}>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {groups.map((group) => (
            <SelectGroup key={group.value}>
              <SelectGroupLabel>{group.value}</SelectGroupLabel>
              {group.items.map((item) => (
                <SelectItem key={item.value} value={item}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectPopup>
      </Select>
    )
  }

  return (
    <div className="grid w-56 gap-2">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Select defaultValue={fruits[0]} items={fruits}>
        <SelectTrigger className="w-full" disabled={disabled} id={id} size={size}>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {fruits.map((item) => (
            <SelectItem key={item.value} value={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  )
}

function SelectGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Sizes">
        <FruitSelect size="sm" />
        <FruitSelect />
        <FruitSelect size="lg" />
      </GalleryGroup>
      <GalleryGroup label="Label">
        <FruitSelect label="Fruit" />
      </GalleryGroup>
      <GalleryGroup label="Disabled">
        <FruitSelect disabled />
      </GalleryGroup>
      <GalleryGroup label="Grouped">
        <FruitSelect grouped />
      </GalleryGroup>
    </Gallery>
  )
}

export function SelectPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [size, setSize] = React.useState<FieldSize>("default")
  const [disabled, setDisabled] = React.useState(false)
  const [grouped, setGrouped] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="select-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <SwitchField
            checked={disabled}
            id="select-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <SwitchField
            checked={grouped}
            id="select-grouped"
            label="Grouped"
            onCheckedChange={setGrouped}
          />
          <Separator />
          <PropsList props={selectProps} />
          <CompositionNote>
            Pass the same objects to <span className="font-mono text-foreground">items</span> and
            each <span className="font-mono text-foreground">SelectItem</span>. Groups use{" "}
            <span className="font-mono text-foreground">SelectGroup</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Sizes, a label, a disabled trigger, and groups."
        title="Select"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <SelectGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <FruitSelect disabled={disabled} grouped={grouped} size={size} />
        </div>
      )}
    </PlaygroundShell>
  )
}
