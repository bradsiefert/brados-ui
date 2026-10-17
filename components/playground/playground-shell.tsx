"use client"

import { createContext, useContext, type ReactNode } from "react"

import { AppHotkeys } from "@/components/app-hotkeys"
import { LibrarySidebar } from "@/components/library-sidebar"
import { ThemeSelector } from "@/components/theme-selector"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const PersistentShellContext = createContext(false)

function ShellHeader(): ReactNode {
  return (
    <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-4 border-b bg-header px-4 py-3 md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div>
          <h1 className="font-heading text-xl font-semibold tracking-tight">
            brados-ui
          </h1>
          <p className="text-muted-foreground text-sm">
            Personal design system — components &amp; color
          </p>
        </div>
      </div>
      <div className="flex flex-nowrap items-center justify-end gap-2">
        <AppHotkeys />
        <ThemeSelector />
      </div>
    </header>
  )
}

function ShellBody({
  children,
  inspector,
}: {
  children: ReactNode
  inspector?: ReactNode
}): ReactNode {
  return (
    <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
      <div className="flex min-w-0 flex-1 flex-col lg:overflow-y-auto">
        <div className="flex min-h-full flex-1 flex-col">{children}</div>
      </div>
      {inspector ? (
        <aside
          aria-label="Inspector"
          className="border-t bg-sidebar lg:w-80 lg:shrink-0 lg:overflow-y-auto lg:border-s lg:border-t-0"
        >
          {inspector}
        </aside>
      ) : null}
    </div>
  )
}

export function LibraryFrame({ children }: { children: ReactNode }): ReactNode {
  return (
    <PersistentShellContext.Provider value={true}>
      <SidebarProvider>
        <LibrarySidebar />
        <SidebarInset className="lg:h-svh lg:overflow-hidden">
          <ShellHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </PersistentShellContext.Provider>
  )
}

export function PlaygroundShell({
  children,
  inspector,
}: {
  children: ReactNode
  inspector?: ReactNode
}): ReactNode {
  const persistent = useContext(PersistentShellContext)

  if (persistent) {
    return <ShellBody inspector={inspector}>{children}</ShellBody>
  }

  return (
    <SidebarProvider>
      <LibrarySidebar />
      <SidebarInset className="lg:h-svh lg:overflow-hidden">
        <ShellHeader />
        <ShellBody inspector={inspector}>{children}</ShellBody>
      </SidebarInset>
    </SidebarProvider>
  )
}

export function CanvasIntro({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: React.ReactNode
}): React.ReactElement {
  return (
    <div className="flex flex-col gap-4 border-b bg-sidebar px-4 py-4 md:px-6">
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="max-w-2xl text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </div>
  )
}
