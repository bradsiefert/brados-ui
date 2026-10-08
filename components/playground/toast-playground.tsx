"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button } from "@/components/ui/button"
import { toastManager } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"

type ToastType = "success" | "info" | "warning" | "error"

const types: Choice<ToastType>[] = [
  { label: "Success", value: "success" },
  { label: "Info", value: "info" },
  { label: "Warning", value: "warning" },
  { label: "Error", value: "error" },
]

const toastProps = [
  { name: "title", type: "string", defaultValue: "—" },
  { name: "description", type: "string", defaultValue: "—" },
  { name: "type", type: "string", defaultValue: "—" },
]

function showToast(type: ToastType): void {
  toastManager.add({
    description: "The draft is stored with this project.",
    title: type === "error" ? "Could not save" : "Saved",
    type,
  })
}

export function ToastPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [type, setType] = React.useState<ToastType>("success")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField id="toast-type" label="Type" onChange={setType} options={types} value={type} />
          <Separator />
          <PropsList props={toastProps} />
          <CompositionNote>
            Call <span className="font-mono text-foreground">toastManager.add</span>. The app
            provider renders the stack.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="Success, info, warning, and error." title="Toast">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Types">
            {types.map((option) => (
              <Button key={option.value} onClick={() => showToast(option.value)} type="button" variant="outline">
                {option.label}
              </Button>
            ))}
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Button onClick={() => showToast(type)} type="button">
            Show toast
          </Button>
        </div>
      )}
    </PlaygroundShell>
  )
}
