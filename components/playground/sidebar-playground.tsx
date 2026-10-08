"use client"

import { HouseIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
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
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const sidebarProps = [{ name: "collapsible", type: "string", defaultValue: "offcanvas" }]

function DemoSidebar(): React.ReactElement {
  return (
    <SidebarProvider className="min-h-72 w-full max-w-xl overflow-hidden rounded-xl border">
      <Sidebar collapsible="none">
        <SidebarHeader className="font-medium text-sm">Workspace</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Library</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <HouseIcon />
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <MagnifyingGlassIcon />
                    Search
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="p-4 text-sm">The page sits beside the sidebar.</SidebarInset>
    </SidebarProvider>
  )
}

export function SidebarPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={sidebarProps} />
          <CompositionNote>
            Wrap the sidebar and the page inset in one provider. This demo uses{" "}
            <span className="font-mono text-foreground">collapsible=&quot;none&quot;</span> so it
            stays inside the canvas.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A navigation rail beside page content." title="Sidebar">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Inset" layout="stack">
            <DemoSidebar />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <DemoSidebar />
        </div>
      )}
    </PlaygroundShell>
  )
}
