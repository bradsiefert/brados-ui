"use client"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type AvatarSize = "size-6" | "size-8" | "size-10" | "size-12" | "size-16"
type AvatarRadius = "full" | "medium" | "small"
type AvatarStatus = "none" | "online" | "offline"

const sizes: Choice<AvatarSize>[] = [
  { label: "24", value: "size-6" },
  { label: "32", value: "size-8" },
  { label: "40", value: "size-10" },
  { label: "48", value: "size-12" },
  { label: "64", value: "size-16" },
]

const radii: Choice<AvatarRadius>[] = [
  { label: "Full", value: "full" },
  { label: "Medium", value: "medium" },
  { label: "Small", value: "small" },
]

const statuses: Choice<AvatarStatus>[] = [
  { label: "None", value: "none" },
  { label: "Online", value: "online" },
  { label: "Offline", value: "offline" },
]

const radiusClass: Record<AvatarRadius, string> = {
  full: "rounded-full",
  medium: "rounded-lg",
  small: "rounded-md",
}

const avatarProps = [
  { name: "className", type: "string", defaultValue: "size-8 rounded-full" },
  { name: "src", type: "string", defaultValue: "—" },
  { name: "alt", type: "string", defaultValue: "—" },
]

const people = [
  { initials: "AL", fill: "#3b6ea5", name: "Avery Lane" },
  { initials: "BK", fill: "#2f6f4e", name: "Blair Kim" },
  { initials: "CM", fill: "#8a4b2f", name: "Casey Moss" },
  { initials: "DR", fill: "#5c4d7a", name: "Drew Ross" },
]

const brokenSrc = "data:image/png;base64,aaaa"

function portrait(fill: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="${fill}"/><circle cx="32" cy="26" r="10" fill="#f7f4ef"/><ellipse cx="32" cy="54" rx="16" ry="12" fill="#f7f4ef"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function PersonAvatar({
  name,
  initials,
  fill,
  size = "size-8",
  radius = "full",
  image = true,
  broken = false,
  status = "none",
  className,
}: {
  name: string
  initials: string
  fill?: string
  size?: AvatarSize
  radius?: AvatarRadius
  image?: boolean
  broken?: boolean
  status?: AvatarStatus
  className?: string
}): React.ReactElement {
  const shape = radiusClass[radius]

  return (
    <span className="relative inline-flex">
      <Avatar className={cn(size, shape, className)} key={image ? "image" : "fallback"}>
        {image ? (
          <AvatarImage alt={name} src={broken || !fill ? brokenSrc : portrait(fill)} />
        ) : null}
        <AvatarFallback className={shape}>{initials}</AvatarFallback>
      </Avatar>
      {status === "none" ? null : (
        <span
          className={cn(
            "absolute end-0 bottom-0 size-2.5 rounded-full ring-2 ring-background",
            status === "online" ? "bg-emerald-500" : "bg-muted-foreground/60",
          )}
        />
      )}
    </span>
  )
}

function AvatarGallery(): React.ReactElement {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <GalleryGroup label="Sizes">
        {sizes.map((size) => (
          <PersonAvatar
            fill={people[0]?.fill}
            image={false}
            initials="AL"
            key={size.value}
            name="Avery Lane"
            size={size.value}
          />
        ))}
      </GalleryGroup>
      <GalleryGroup label="Image and fallback">
        <PersonAvatar
          fill={people[0]?.fill}
          initials="AL"
          name="Avery Lane"
          size="size-10"
        />
        <PersonAvatar broken initials="NA" name="Missing portrait" size="size-10" />
      </GalleryGroup>
      <GalleryGroup label="Radius">
        {radii.map((radius) => (
          <PersonAvatar
            fill={people[1]?.fill}
            initials="BK"
            key={radius.value}
            name="Blair Kim"
            radius={radius.value}
            size="size-10"
          />
        ))}
      </GalleryGroup>
      <GalleryGroup label="Status and count">
        <PersonAvatar
          fill={people[2]?.fill}
          initials="CM"
          name="Casey Moss"
          size="size-10"
          status="online"
        />
        <PersonAvatar
          fill={people[3]?.fill}
          initials="DR"
          name="Drew Ross"
          size="size-10"
          status="offline"
        />
        <span className="relative inline-flex">
          <PersonAvatar
            fill={people[0]?.fill}
            initials="AL"
            name="Avery Lane"
            size="size-10"
          />
          <Badge className="absolute -end-1 -top-1" size="sm">
            3
          </Badge>
        </span>
      </GalleryGroup>
      <GalleryGroup label="Group">
        <div className="flex -space-x-2">
          {people.map((person) => (
            <PersonAvatar
              className="ring-2 ring-background"
              fill={person.fill}
              initials={person.initials}
              key={person.initials}
              name={person.name}
            />
          ))}
        </div>
      </GalleryGroup>
    </div>
  )
}

export function AvatarPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [size, setSize] = React.useState<AvatarSize>("size-10")
  const [radius, setRadius] = React.useState<AvatarRadius>("full")
  const [image, setImage] = React.useState(true)
  const [status, setStatus] = React.useState<AvatarStatus>("online")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="avatar-size"
            label="Size"
            onChange={setSize}
            options={sizes}
            value={size}
          />
          <ChoiceField
            id="avatar-radius"
            label="Radius"
            onChange={setRadius}
            options={radii}
            value={radius}
          />
          <SwitchField
            checked={image}
            id="avatar-image"
            label="Image"
            onCheckedChange={setImage}
          />
          <ChoiceField
            id="avatar-status"
            label="Status"
            onChange={setStatus}
            options={statuses}
            value={status}
          />
          <Separator />
          <PropsList props={avatarProps} />
          <CompositionNote>
            Size and radius are classes on <span className="font-mono text-foreground">Avatar</span>.
            Keep <span className="font-mono text-foreground">AvatarFallback</span> for a missing
            image. Status dots and counts sit beside the avatar; they are not props.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Sizes, radius, image fallback, status, and overlapping groups."
        title="Avatar"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <AvatarGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <PersonAvatar
            fill={people[0]?.fill}
            image={image}
            initials="AL"
            name="Avery Lane"
            radius={radius}
            size={size}
            status={status}
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
