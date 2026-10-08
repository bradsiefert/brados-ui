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
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type FooterVariant = "default" | "bare"
type DialogTone = "destructive" | "neutral"

const footers: Choice<FooterVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Bare", value: "bare" },
]

const tones: Choice<DialogTone>[] = [
  { label: "Destructive", value: "destructive" },
  { label: "Neutral", value: "neutral" },
]

const dialogProps = [
  { name: "variant", type: '"default" | "bare"', defaultValue: "default" },
  { name: "bottomStickOnMobile", type: "boolean", defaultValue: "true" },
]

function ConfirmDialog({
  trigger,
  title,
  description,
  footer,
  tone,
}: {
  trigger: string
  title: string
  description: string
  footer: FooterVariant
  tone: DialogTone
}): React.ReactElement {
  const triggerVariant = tone === "destructive" ? "destructive-outline" : "outline"
  const confirmVariant = tone === "destructive" ? "destructive" : "outline"
  const confirmLabel = tone === "destructive" ? "Delete" : "Confirm"

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button type="button" variant={triggerVariant} />}>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter variant={footer}>
          <AlertDialogClose render={<Button type="button" variant="ghost" />}>
            Cancel
          </AlertDialogClose>
          <AlertDialogClose render={<Button type="button" variant={confirmVariant} />}>
            {confirmLabel}
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  )
}

function AlertDialogGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Footer and tone">
        <ConfirmDialog
          description="This permanently removes the account and its invoices."
          footer="default"
          title="Delete this account?"
          tone="destructive"
          trigger="Delete account"
        />
        <ConfirmDialog
          description="The draft will be removed. This cannot be undone."
          footer="bare"
          title="Discard unsaved changes?"
          tone="destructive"
          trigger="Discard draft"
        />
        <ConfirmDialog
          description="The page will be visible to everyone with the link."
          footer="default"
          title="Publish this page?"
          tone="neutral"
          trigger="Publish"
        />
      </GalleryGroup>
    </Gallery>
  )
}

export function AlertDialogPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [footer, setFooter] = React.useState<FooterVariant>("default")
  const [tone, setTone] = React.useState<DialogTone>("destructive")
  const [title, setTitle] = React.useState("Delete this account?")
  const [description, setDescription] = React.useState(
    "This permanently removes the account and its invoices.",
  )

  const trigger = tone === "destructive" ? "Delete account" : "Continue"

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="alert-dialog-footer"
            label="Footer"
            onChange={setFooter}
            options={footers}
            value={footer}
          />
          <ChoiceField
            id="alert-dialog-tone"
            label="Tone"
            onChange={setTone}
            options={tones}
            value={tone}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="alert-dialog-title">Title</Label>
            <Input
              id="alert-dialog-title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="alert-dialog-description">Description</Label>
            <Input
              id="alert-dialog-description"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </div>
          <Separator />
          <PropsList props={dialogProps} />
          <CompositionNote>
            Open the trigger to see the popup. Compose cancel and confirm with{" "}
            <span className="font-mono text-foreground">AlertDialogClose render</span> so they
            keep button styling. <span className="font-mono text-foreground">bare</span> removes
            the footer border and background.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Confirmation popups with a framed or bare footer."
        title="Alert dialog"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <AlertDialogGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <ConfirmDialog
            description={description}
            footer={footer}
            title={title}
            tone={tone}
            trigger={trigger}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
