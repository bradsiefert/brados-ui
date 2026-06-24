"use client"

import * as React from "react"

export type UiPreset = "custom" | "coss-default"

const STORAGE_KEY = "coss-ui-preset"

type UiPresetContextValue = {
  preset: UiPreset
  setPreset: (preset: UiPreset) => void
}

const UiPresetContext = React.createContext<UiPresetContextValue | null>(null)

function isUiPreset(value: string | null | undefined): value is UiPreset {
  return value === "custom" || value === "coss-default"
}

function readStoredPreset(): UiPreset {
  if (typeof window === "undefined") {
    return "custom"
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isUiPreset(stored) ? stored : "custom"
}

function applyPresetToDocument(preset: UiPreset) {
  if (preset === "coss-default") {
    document.documentElement.dataset.uiPreset = "coss-default"
    return
  }

  delete document.documentElement.dataset.uiPreset
}

function isTypingTarget(target: EventTarget | null) {
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

function UiPresetProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPresetState] = React.useState<UiPreset>("custom")

  React.useEffect(() => {
    const initial = readStoredPreset()
    setPresetState(initial)
    applyPresetToDocument(initial)
  }, [])

  const setPreset = React.useCallback((next: UiPreset) => {
    setPresetState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    applyPresetToDocument(next)
  }, [])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "p") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setPresetState((current) => {
        const next: UiPreset = current === "custom" ? "coss-default" : "custom"
        window.localStorage.setItem(STORAGE_KEY, next)
        applyPresetToDocument(next)
        return next
      })
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  const value = React.useMemo(
    () => ({
      preset,
      setPreset,
    }),
    [preset, setPreset],
  )

  return (
    <UiPresetContext.Provider value={value}>{children}</UiPresetContext.Provider>
  )
}

function useUiPreset() {
  const context = React.useContext(UiPresetContext)

  if (!context) {
    throw new Error("useUiPreset must be used within a UiPresetProvider")
  }

  return context
}

export { UiPresetProvider, useUiPreset }
