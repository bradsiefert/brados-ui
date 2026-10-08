"use client"

import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react"
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
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type AlertVariant = "default" | "info" | "success" | "warning" | "error"

const variants: Choice<AlertVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Info", value: "info" },
  { label: "Success", value: "success" },
  { label: "Warning", value: "warning" },
  { label: "Error", value: "error" },
]

const variantCopy: Record<AlertVariant, { title: string; description: string }> = {
  default: {
    title: "Heads up",
    description: "You can add components using the CLI.",
  },
  info: {
    title: "New release",
    description: "Version 2 is available to install.",
  },
  success: {
    title: "Saved",
    description: "Your changes are live.",
  },
  warning: {
    title: "Unsaved changes",
    description: "Leave this page and they will be lost.",
  },
  error: {
    title: "Payment failed",
    description: "Check the card and try again.",
  },
}

const alertProps = [
  { name: "variant", type: "string", defaultValue: "default" },
  { name: "children", type: "ReactNode", defaultValue: "—" },
]

function StatusIcon({ variant }: { variant: AlertVariant }): React.ReactElement {
  switch (variant) {
    case "default":
    case "info":
      return <InfoIcon />
    case "success":
      return <CheckCircleIcon />
    case "warning":
      return <WarningCircleIcon />
    case "error":
      return <XCircleIcon />
    default: {
      const exhaustive: never = variant
      return exhaustive
    }
  }
}

function StatusAlert({
  variant,
  title,
  description,
  icon = false,
  action = false,
}: {
  variant: AlertVariant
  title: string
  description: string
  icon?: boolean
  action?: boolean
}): React.ReactElement {
  return (
    <Alert variant={variant}>
      {icon ? <StatusIcon variant={variant} /> : null}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {action ? (
        <AlertAction>
          <Button size="xs" type="button" variant="ghost">
            Dismiss
          </Button>
          <Button size="xs" type="button">
            Review
          </Button>
        </AlertAction>
      ) : null}
    </Alert>
  )
}

function AlertGallery(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <GalleryGroup label="Variants" layout="stack">
        {variants.map((variant) => (
          <StatusAlert
            description={variantCopy[variant.value].description}
            key={variant.value}
            title={variantCopy[variant.value].title}
            variant={variant.value}
          />
        ))}
      </GalleryGroup>
      <GalleryGroup label="With icon" layout="stack">
        <StatusAlert
          description={variantCopy.info.description}
          icon
          title={variantCopy.info.title}
          variant="info"
        />
      </GalleryGroup>
      <GalleryGroup label="With actions" layout="stack">
        <StatusAlert
          action
          description="A billing address is missing from this invoice."
          icon
          title="Action needed"
          variant="warning"
        />
      </GalleryGroup>
    </div>
  )
}

export function AlertPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [variant, setVariant] = React.useState<AlertVariant>("info")
  const [icon, setIcon] = React.useState(true)
  const [action, setAction] = React.useState(false)
  const [title, setTitle] = React.useState("New release")
  const [description, setDescription] = React.useState("Version 2 is available to install.")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="alert-variant"
            label="Variant"
            onChange={setVariant}
            options={variants}
            value={variant}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="alert-title">Title</Label>
            <Input
              id="alert-title"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="alert-description">Description</Label>
            <Input
              id="alert-description"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
          </div>
          <SwitchField
            checked={icon}
            id="alert-icon"
            label="Icon"
            onCheckedChange={setIcon}
          />
          <SwitchField
            checked={action}
            id="alert-action"
            label="Actions"
            onCheckedChange={setAction}
          />
          <Separator />
          <PropsList props={alertProps} />
          <CompositionNote>
            Put the status icon first, then <span className="font-mono text-foreground">AlertTitle</span>{" "}
            and <span className="font-mono text-foreground">AlertDescription</span>. Actions
            belong in <span className="font-mono text-foreground">AlertAction</span>. Leave the
            status icon visible to assistive tech.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Semantic variants, a status icon, and inline actions."
        title="Alert"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <AlertGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <div className="w-full max-w-lg">
            <StatusAlert
              action={action}
              description={description}
              icon={icon}
              title={title}
              variant={variant}
            />
          </div>
        </div>
      )}
    </PlaygroundShell>
  )
}
