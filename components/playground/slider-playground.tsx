"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Slider, SliderValue } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

const sliderProps = [
  { name: "value", type: "number | number[]", defaultValue: "—" },
  { name: "min", type: "number", defaultValue: "0" },
  { name: "max", type: "number", defaultValue: "100" },
  { name: "orientation", type: "string", defaultValue: "horizontal" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function SampleSlider({
  value,
  onValueChange,
  disabled = false,
  vertical = false,
}: {
  value: number | number[]
  onValueChange?: (value: number | readonly number[]) => void
  disabled?: boolean
  vertical?: boolean
}): React.ReactElement {
  return (
    <div className={vertical ? "flex h-44 items-center gap-3" : "flex w-64 flex-col gap-2"}>
      <Slider
        aria-label="Volume"
        disabled={disabled}
        max={100}
        min={0}
        onValueChange={onValueChange}
        orientation={vertical ? "vertical" : "horizontal"}
        value={value}
      >
        {vertical ? null : <SliderValue />}
      </Slider>
    </div>
  )
}

function SliderGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Value" layout="stack">
        <SampleSlider value={40} />
      </GalleryGroup>
      <GalleryGroup label="Range" layout="stack">
        <SampleSlider value={[20, 80]} />
      </GalleryGroup>
      <GalleryGroup label="Disabled" layout="stack">
        <SampleSlider disabled value={60} />
      </GalleryGroup>
      <GalleryGroup label="Vertical">
        <SampleSlider value={30} vertical />
      </GalleryGroup>
    </Gallery>
  )
}

export function SliderPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [value, setValue] = React.useState<number | number[]>(40)
  const [range, setRange] = React.useState(false)
  const [vertical, setVertical] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)

  function setRangeMode(next: boolean) {
    setRange(next)
    setValue(next ? [20, 80] : 40)
  }

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={range}
            id="slider-range"
            label="Range"
            onCheckedChange={setRangeMode}
          />
          <SwitchField
            checked={vertical}
            id="slider-vertical"
            label="Vertical"
            onCheckedChange={setVertical}
          />
          <SwitchField
            checked={disabled}
            id="slider-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={sliderProps} />
          <CompositionNote>
            One thumb uses a number. A range uses a pair.{" "}
            <span className="font-mono text-foreground">SliderValue</span> reads the current
            value.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A value, a range, disabled, and vertical." title="Slider">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <SliderGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleSlider
            disabled={disabled}
            onValueChange={(next) => {
              if (typeof next === "number") {
                setValue(next)
                return
              }
              const values = [...next]
              setValue(values.length === 1 ? (values[0] ?? 0) : values)
            }}
            value={value}
            vertical={vertical}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
