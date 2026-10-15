"use client"

import * as React from "react"

export type PaletteSource = "gds" | "tailwind"

const PALETTE_STORAGE_KEY = "colors-palette-source"

function isPaletteSource(value: string | null): value is PaletteSource {
  return value === "gds" || value === "tailwind"
}

function readStoredPalette(): PaletteSource {
  try {
    const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY)
    return isPaletteSource(stored) ? stored : "tailwind"
  } catch {
    return "tailwind"
  }
}

let currentPalette: PaletteSource = "tailwind"
let paletteLoaded = false
const paletteListeners = new Set<() => void>()

function subscribePalette(listener: () => void) {
  paletteListeners.add(listener)
  return () => {
    paletteListeners.delete(listener)
  }
}

function getPaletteSnapshot(): PaletteSource {
  if (!paletteLoaded) {
    paletteLoaded = true
    currentPalette = readStoredPalette()
    applyPalette(currentPalette)
  }

  return currentPalette
}

function applyPalette(next: PaletteSource) {
  if (next === "gds") {
    document.documentElement.dataset.palette = "gds"
    return
  }

  delete document.documentElement.dataset.palette
}

export function writePalette(next: PaletteSource) {
  currentPalette = next
  paletteLoaded = true
  applyPalette(next)

  try {
    window.localStorage.setItem(PALETTE_STORAGE_KEY, next)
  } catch {
    // The choice still applies for this page load.
  }

  for (const listener of paletteListeners) {
    listener()
  }
}

export function usePaletteSource(): PaletteSource {
  return React.useSyncExternalStore(
    subscribePalette,
    getPaletteSnapshot,
    () => "tailwind",
  )
}
