"use client"

import { KeyboardIcon } from "@phosphor-icons/react"
import { usePathname, useRouter } from "next/navigation"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import {
  Popover,
  PopoverPopup,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { componentEntries } from "@/lib/component-sections"

const shortcuts = [
  { id: "theme", label: "Light or dark", keys: ["D"] },
  { id: "preset", label: "Custom or COSS", keys: ["P"] },
  { id: "sidebar", label: "Sidebar", keys: ["⌘/Ctrl", "B"] },
  { id: "next", label: "Next component", keys: ["]"] },
] as const

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function nextComponentHref(pathname: string): string | null {
  const first = componentEntries[0]
  if (!first) {
    return null
  }

  if (pathname.startsWith("/foundations")) {
    return first.href
  }

  const match = /^\/components\/([^/]+)/.exec(pathname)
  if (!match) {
    return null
  }

  const slug = match[1]
  const index = componentEntries.findIndex((entry) => entry.slug === slug)
  if (index === -1) {
    return first.href
  }

  const next = componentEntries[(index + 1) % componentEntries.length]
  return next?.href ?? first.href
}

export function AppHotkeys(): React.ReactElement {
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key !== "]") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      const href = nextComponentHref(pathname)
      if (!href) {
        return
      }

      event.preventDefault()
      router.push(href)
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [pathname, router])

  return (
    <Popover>
      <PopoverTrigger render={<Button type="button" variant="outline" />}>
        <KeyboardIcon aria-hidden="true" />
        Shortcuts
      </PopoverTrigger>
      <PopoverPopup align="end" className="w-72">
        <PopoverTitle className="text-sm">Shortcuts</PopoverTitle>
        <ul className="mt-3 flex flex-col gap-2">
          {shortcuts.map((shortcut) => (
            <li
              className="flex items-center justify-between gap-3 text-sm"
              key={shortcut.id}
            >
              <span>{shortcut.label}</span>
              <span className="flex items-center gap-1">
                {shortcut.keys.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </PopoverPopup>
    </Popover>
  )
}
