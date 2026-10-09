"use client"

import {
  ArrowsVerticalIcon,
  CornersOutIcon,
  PaletteIcon,
  TableIcon,
  TextTIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type * as React from "react"

import {
  componentEntries,
  foundationEntries,
} from "@/lib/component-sections"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

const foundationIcons = {
  colors: PaletteIcon,
  typography: TextTIcon,
  "inline-heights": ArrowsVerticalIcon,
  "border-radii": CornersOutIcon,
  sizes: TableIcon,
} as const

export function LibrarySidebar(): React.ReactElement {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  function handleNavigate() {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={handleNavigate}
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary font-semibold text-sidebar-primary-foreground text-sm">
            b
          </div>
          <div className="flex flex-col">
            <span className="truncate font-semibold text-sm">brados-ui</span>
            <span className="truncate text-muted-foreground text-xs">
              Design system
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Foundations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {foundationEntries.map((item) => {
                const Icon = foundationIcons[item.slug as keyof typeof foundationIcons]
                return (
                  <SidebarMenuItem key={item.slug}>
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      render={<Link href={item.href} onClick={handleNavigate} />}
                    >
                      {Icon ? <Icon /> : null}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {componentEntries.map((item) => (
                <SidebarMenuItem key={item.slug}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    render={<Link href={item.href} onClick={handleNavigate} />}
                  >
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
