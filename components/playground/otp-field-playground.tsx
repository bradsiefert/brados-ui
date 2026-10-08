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
import { OTPField, OTPFieldInput, OTPFieldSeparator } from "@/components/ui/otp-field"
import { Separator } from "@/components/ui/separator"

type FieldSize = "default" | "lg"

const sizes: Choice<FieldSize>[] = [
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
]

const otpProps = [
  { name: "length", type: "number", defaultValue: "—" },
  { name: "size", type: "string", defaultValue: "default" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
]

function Code({
  size = "default",
  disabled = false,
  separated = true,
}: {
  size?: FieldSize
  disabled?: boolean
  separated?: boolean
}): React.ReactElement {
  return (
    <OTPField aria-label="Verification code" disabled={disabled} length={separated ? 6 : 4} size={size}>
      <OTPFieldInput aria-label="Digit 1" />
      <OTPFieldInput aria-label="Digit 2" />
      <OTPFieldInput aria-label="Digit 3" />
      {separated ? <OTPFieldSeparator /> : <OTPFieldInput aria-label="Digit 4" />}
      {separated ? (
        <>
          <OTPFieldInput aria-label="Digit 4" />
          <OTPFieldInput aria-label="Digit 5" />
          <OTPFieldInput aria-label="Digit 6" />
        </>
      ) : null}
    </OTPField>
  )
}

export function OtpFieldPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [size, setSize] = React.useState<FieldSize>("default")
  const [separated, setSeparated] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField id="otp-size" label="Size" onChange={setSize} options={sizes} value={size} />
          <SwitchField
            checked={separated}
            id="otp-separator"
            label="Separator"
            onCheckedChange={setSeparated}
          />
          <SwitchField
            checked={disabled}
            id="otp-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <Separator />
          <PropsList props={otpProps} />
          <CompositionNote>
            Set <span className="font-mono text-foreground">length</span> to the number of slots.
            A separator splits the code visually.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A six-digit code, a short code, and sizes." title="OTP field">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Separated">
            <Code />
          </GalleryGroup>
          <GalleryGroup label="Four digits">
            <Code separated={false} />
          </GalleryGroup>
          <GalleryGroup label="Large">
            <Code size="lg" />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Code disabled={disabled} separated={separated} size={size} />
        </div>
      )}
    </PlaygroundShell>
  )
}
