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
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type FooterVariant = "default" | "bare"

const footers: Choice<FooterVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Bare", value: "bare" },
]

const dialogProps = [
  { name: "variant", type: '"default" | "bare"', defaultValue: "default" },
  { name: "open", type: "boolean", defaultValue: "—" },
]

function SampleDialog({
  trigger,
  title,
  description,
  footer,
}: {
  trigger: string
  title: string
  description: string
  footer: FooterVariant
}): React.ReactElement {
  return (
    <Dialog>
      <DialogTrigger render={<Button type="button" variant="outline" />}>
        {trigger}
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogPanel className="text-sm">
          The draft stays private until you publish it.
        </DialogPanel>
        <DialogFooter variant={footer}>
          <DialogClose render={<Button type="button" variant="ghost" />}>
            Cancel
          </DialogClose>
          <DialogClose render={<Button type="button" />}>Save</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  )
}

function DialogGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Footer">
        <SampleDialog
          description="Changes are stored with this project."
          footer="default"
          title="Save draft"
          trigger="Default footer"
        />
        <SampleDialog
          description="Changes are stored with this project."
          footer="bare"
          title="Save draft"
          trigger="Bare footer"
        />
      </GalleryGroup>
    </Gallery>
  )
}

export function DialogPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [footer, setFooter] = React.useState<FooterVariant>("default")
  const [title, setTitle] = React.useState("Save draft")
  const [description, setDescription] = React.useState(
    "Changes are stored with this project.",
  )

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="dialog-footer"
            label="Footer"
            onChange={setFooter}
            options={footers}
            value={footer}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-title">Title</Label>
            <Input id="dialog-title" onChange={(event) => setTitle(event.target.value)} value={title} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-description">Description</Label>
            <Input
              id="dialog-description"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </div>
          <Separator />
          <PropsList props={dialogProps} />
          <CompositionNote>
            Open the trigger to see the popup. Keep the header, panel, and footer as direct
            sections. <span className="font-mono text-foreground">bare</span> drops the footer
            border.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A modal with a framed or bare footer." title="Dialog">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <DialogGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleDialog
            description={description}
            footer={footer}
            title={title}
            trigger="Open dialog"
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
