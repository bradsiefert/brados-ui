"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  type CanvasMode,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const formProps = [
  { name: "onSubmit", type: "function", defaultValue: "—" },
]

function SampleForm(): React.ReactElement {
  const [message, setMessage] = React.useState("Submit to validate the email.")

  return (
    <Form
      className="grid w-full max-w-sm gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const email = String(data.get("email") ?? "")
        setMessage(email.includes("@") ? `Saved ${email}` : "Enter a valid email.")
      }}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input name="email" placeholder="ada@example.com" required type="email" />
        <FieldDescription>Used for account updates.</FieldDescription>
        <FieldError match="typeMismatch">Enter a valid email.</FieldError>
        <FieldError match="valueMissing">Email is required.</FieldError>
      </Field>
      <Button type="submit">Save</Button>
      <p className="text-muted-foreground text-xs">{message}</p>
    </Form>
  )
}

export function FormPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={formProps} />
          <CompositionNote>
            <span className="font-mono text-foreground">Form</span> is the form element.{" "}
            <span className="font-mono text-foreground">FieldError</span> matches native validity.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A form with a required email." title="Form">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Email" layout="stack">
            <SampleForm />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <SampleForm />
        </div>
      )}
    </PlaygroundShell>
  )
}
