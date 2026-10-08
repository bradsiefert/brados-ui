"use client"

import { DotIcon, FileIcon, FolderIcon, HouseIcon } from "@phosphor-icons/react"
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
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

type SeparatorKind = "chevron" | "slash" | "dot"

const separators: Choice<SeparatorKind>[] = [
  { label: "Chevron", value: "chevron" },
  { label: "Slash", value: "slash" },
  { label: "Dot", value: "dot" },
]

const breadcrumbProps = [
  { name: "children", type: "ReactNode", defaultValue: "—" },
  { name: "render", type: "ReactElement", defaultValue: "—" },
]

function CrumbSeparator({ kind }: { kind: SeparatorKind }): React.ReactElement {
  if (kind === "slash") {
    return <BreadcrumbSeparator>/</BreadcrumbSeparator>
  }
  if (kind === "dot") {
    return (
      <BreadcrumbSeparator>
        <DotIcon aria-hidden="true" />
      </BreadcrumbSeparator>
    )
  }
  return <BreadcrumbSeparator />
}

function CrumbLink({
  label,
  icon,
}: {
  label: string
  icon?: React.ReactNode
}): React.ReactElement {
  return (
    <BreadcrumbLink render={<button type="button" />}>
      {icon}
      {label}
    </BreadcrumbLink>
  )
}

function Trail({
  separator = "chevron",
  homeIcon = false,
  collapse = false,
  itemIcons = false,
}: {
  separator?: SeparatorKind
  homeIcon?: boolean
  collapse?: boolean
  itemIcons?: boolean
}): React.ReactElement {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {homeIcon ? (
            <BreadcrumbLink aria-label="Home" render={<button type="button" />}>
              <HouseIcon aria-hidden="true" className="size-4" />
            </BreadcrumbLink>
          ) : (
            <CrumbLink
              icon={itemIcons ? <HouseIcon aria-hidden="true" className="size-4" /> : null}
              label="Home"
            />
          )}
        </BreadcrumbItem>
        <CrumbSeparator kind={separator} />
        {collapse ? (
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <CrumbLink
              icon={
                itemIcons ? <FolderIcon aria-hidden="true" className="size-4" /> : null
              }
              label="Components"
            />
          </BreadcrumbItem>
        )}
        <CrumbSeparator kind={separator} />
        <BreadcrumbItem>
          <BreadcrumbPage className="inline-flex items-center gap-1.5">
            {itemIcons ? <FileIcon aria-hidden="true" className="size-4" /> : null}
            Breadcrumb
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function BreadcrumbGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Default" layout="stack">
        <Trail />
      </GalleryGroup>
      <GalleryGroup label="Slash" layout="stack">
        <Trail separator="slash" />
      </GalleryGroup>
      <GalleryGroup label="Dot" layout="stack">
        <Trail separator="dot" />
      </GalleryGroup>
      <GalleryGroup label="Home icon" layout="stack">
        <Trail homeIcon />
      </GalleryGroup>
      <GalleryGroup label="Collapsed" layout="stack">
        <Trail collapse />
      </GalleryGroup>
      <GalleryGroup label="Icons" layout="stack">
        <Trail itemIcons />
      </GalleryGroup>
    </Gallery>
  )
}

export function BreadcrumbPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [separator, setSeparator] = React.useState<SeparatorKind>("chevron")
  const [homeIcon, setHomeIcon] = React.useState(false)
  const [collapse, setCollapse] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="breadcrumb-separator"
            label="Separator"
            onChange={setSeparator}
            options={separators}
            value={separator}
          />
          <SwitchField
            checked={homeIcon}
            id="breadcrumb-home"
            label="Home icon"
            onCheckedChange={setHomeIcon}
          />
          <SwitchField
            checked={collapse}
            id="breadcrumb-collapse"
            label="Collapse middle"
            onCheckedChange={setCollapse}
          />
          <Separator />
          <PropsList props={breadcrumbProps} />
          <CompositionNote>
            The current page is <span className="font-mono text-foreground">BreadcrumbPage</span>.
            An icon-only home link needs an accessible name. Put a custom glyph inside{" "}
            <span className="font-mono text-foreground">BreadcrumbSeparator</span>, and collapse
            the middle with <span className="font-mono text-foreground">BreadcrumbEllipsis</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description="Separators, a home icon, a collapsed middle, and item icons."
        title="Breadcrumb"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <BreadcrumbGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Trail collapse={collapse} homeIcon={homeIcon} separator={separator} />
        </div>
      )}
    </PlaygroundShell>
  )
}
