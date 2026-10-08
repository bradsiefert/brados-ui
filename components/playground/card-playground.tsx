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
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardFrame,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const cardProps = [
  { name: "children", type: "ReactNode", defaultValue: "—" },
  { name: "render", type: "ReactElement", defaultValue: "—" },
]

function SampleCard({
  header,
  description,
  footer,
  frame,
}: {
  header: boolean
  description: boolean
  footer: boolean
  frame: boolean
}): React.ReactElement {
  const card = (
    <Card className="w-full max-w-sm">
      {header ? (
        <CardHeader>
          <CardTitle>Studio plan</CardTitle>
          {description ? <CardDescription>Billed monthly.</CardDescription> : null}
        </CardHeader>
      ) : null}
      <CardPanel className="text-sm">
        Three seats, shared projects, and priority support.
      </CardPanel>
      {footer ? (
        <CardFooter className="justify-end gap-2">
          <Button type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="button">Upgrade</Button>
        </CardFooter>
      ) : null}
    </Card>
  )

  if (!frame) {
    return card
  }

  return (
    <CardFrame className="w-full max-w-sm">
      <CardFrameHeader>
        <CardFrameTitle>Billing</CardFrameTitle>
      </CardFrameHeader>
      {card}
    </CardFrame>
  )
}

function CardGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Header, panel, and footer" layout="stack">
        <SampleCard description footer header frame={false} />
      </GalleryGroup>
      <GalleryGroup label="Header and panel" layout="stack">
        <SampleCard description={false} footer={false} header frame={false} />
      </GalleryGroup>
      <GalleryGroup label="Frame" layout="stack">
        <SampleCard description footer header frame />
      </GalleryGroup>
    </Gallery>
  )
}

export function CardPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [header, setHeader] = React.useState(true)
  const [description, setDescription] = React.useState(true)
  const [footer, setFooter] = React.useState(true)
  const [frame, setFrame] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <SwitchField
            checked={header}
            id="card-header"
            label="Header"
            onCheckedChange={setHeader}
          />
          <SwitchField
            checked={description}
            id="card-description"
            label="Description"
            onCheckedChange={setDescription}
          />
          <SwitchField
            checked={footer}
            id="card-footer"
            label="Footer"
            onCheckedChange={setFooter}
          />
          <SwitchField checked={frame} id="card-frame" label="Frame" onCheckedChange={setFrame} />
          <Separator />
          <PropsList props={cardProps} />
          <CompositionNote>
            Keep <span className="font-mono text-foreground">CardHeader</span>,{" "}
            <span className="font-mono text-foreground">CardPanel</span>, and{" "}
            <span className="font-mono text-foreground">CardFooter</span> as direct children.
            A frame wraps the card with its own header.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Header, panel, footer, and a framed surface."
        title="Card"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <CardGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleCard
            description={description}
            footer={footer}
            frame={frame}
            header={header}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
