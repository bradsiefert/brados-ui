"use client"

import { PaletteIcon } from "@phosphor-icons/react"
import * as React from "react"

import { componentSections } from "@/lib/component-sections"
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

const foundations = [{ id: "colors", title: "Colors", icon: PaletteIcon }]

function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0] ?? "")

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )

        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: "-88px 0px -60% 0px", threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ids])

  return active
}

export function LibrarySidebar() {
  const { isMobile, setOpenMobile } = useSidebar()

  const ids = React.useMemo(
    () => [...foundations.map((f) => f.id), ...componentSections.map((s) => s.id)],
    [],
  )
  const active = useActiveSection(ids)

  function handleNavigate() {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary font-semibold text-sidebar-primary-foreground text-sm">
            b
          </div>
          <div className="flex flex-col">
            <span className="truncate font-semibold text-sm">brados-ui</span>
            <span className="truncate text-muted-foreground text-xs">
              Design system
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Foundations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {foundations.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={active === item.id}
                    render={<a href={`#${item.id}`} onClick={handleNavigate} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {componentSections.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={active === item.id}
                    render={<a href={`#${item.id}`} onClick={handleNavigate} />}
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
