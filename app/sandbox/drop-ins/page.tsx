"use client"

import { useState } from "react"

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/kibo-ui/dropzone"
import {
  CanvasIntro,
  PlaygroundShell,
} from "@/components/playground/playground-shell"
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee"

const marqueeLabels = [
  "Source Sans 3",
  "Blue primary",
  "32px default",
  "6px radius",
  "Phosphor icons",
  "Neutral page",
]

export default function DropInsPage() {
  const [files, setFiles] = useState<File[] | undefined>()
  const [dropError, setDropError] = useState<string | null>(null)
  const [marqueeClicks, setMarqueeClicks] = useState(0)

  return (
    <PlaygroundShell>
      <CanvasIntro
        description="Magic UI Marquee and Kibo UI Dropzone, adapted onto COSS and the local theme."
        title="Drop-ins"
      />
      <div className="flex flex-col gap-10 p-4 md:p-6">
        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg font-semibold">Marquee</h3>
            <p className="max-w-2xl text-muted-foreground text-sm">
              Testing Magic UI motion with the custom theme: Source Sans 3,
              blue primary, card surface, and light or dark. Hover pauses a
              row. The button checks that a click still lands.
            </p>
          </div>
          <div className="flex flex-col gap-2 overflow-hidden rounded-2xl border bg-background py-2">
            <Marquee className="[--duration:28s]" pauseOnHover>
              <Button
                onPointerDown={(event) => {
                  if (event.button !== 0) {
                    return
                  }
                  setMarqueeClicks((count) => count + 1)
                }}
                size="sm"
                variant="primary-outline"
              >
                Clicks: {marqueeClicks}
              </Button>
              {marqueeLabels.map((label) => (
                <div
                  key={label}
                  className="flex h-16 w-44 items-center justify-center rounded-xl border bg-card px-4 font-medium text-card-foreground text-sm shadow-xs/5"
                >
                  {label}
                </div>
              ))}
            </Marquee>
            <Marquee className="[--duration:36s]" pauseOnHover reverse>
              {marqueeLabels.map((label) => (
                <div
                  key={label}
                  className="flex h-16 w-44 items-center justify-center rounded-xl border bg-muted px-4 text-foreground text-sm"
                >
                  {label}
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        <section className="flex max-w-xl flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-lg font-semibold">Dropzone</h3>
            <p className="text-muted-foreground text-sm">
              Testing Kibo UI Dropzone on the existing COSS button. The icon
              is Phosphor. Click the target or drop up to 4 files, each under
              5 MB.
            </p>
          </div>
          <Dropzone
            maxFiles={4}
            maxSize={5 * 1024 * 1024}
            onDrop={(accepted) => {
              setFiles(accepted)
              setDropError(null)
            }}
            onError={(error) => {
              setDropError(error.message)
            }}
            src={files}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
          {dropError ? (
            <p className="text-destructive text-sm" role="alert">
              {dropError}
            </p>
          ) : null}
          {files && files.length > 0 ? (
            <div className="flex flex-col gap-2">
              <ul className="flex flex-col gap-1 text-sm">
                {files.map((file) => (
                  <li key={`${file.name}-${file.size}-${file.lastModified}`}>
                    <span className="font-medium">{file.name}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      · {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </li>
                ))}
              </ul>
              <div>
                <Button
                  onClick={() => {
                    setFiles(undefined)
                    setDropError(null)
                  }}
                  size="sm"
                  variant="ghost"
                >
                  Clear files
                </Button>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </PlaygroundShell>
  )
}
