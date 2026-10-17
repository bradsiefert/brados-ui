"use client"

import * as React from "react"

export type NeutralTint = "current" | "half" | "light"

const NEUTRAL_TINT_STORAGE_KEY = "colors-neutral-tint"

function isNeutralTint(value: string | null): value is NeutralTint {
  return value === "current" || value === "half" || value === "light"
}

function readStoredNeutralTint(): NeutralTint {
  try {
    const stored = window.localStorage.getItem(NEUTRAL_TINT_STORAGE_KEY)
    return isNeutralTint(stored) ? stored : "current"
  } catch {
    return "current"
  }
}

let currentTint: NeutralTint = "current"
let tintLoaded = false
const tintListeners = new Set<() => void>()

function subscribeNeutralTint(listener: () => void) {
  tintListeners.add(listener)
  return () => {
    tintListeners.delete(listener)
  }
}

function getNeutralTintSnapshot(): NeutralTint {
  if (!tintLoaded) {
    tintLoaded = true
    currentTint = readStoredNeutralTint()
    applyNeutralTint(currentTint)
  }

  return currentTint
}

function applyNeutralTint(next: NeutralTint) {
  if (next === "current") {
    delete document.documentElement.dataset.neutral
    return
  }

  document.documentElement.dataset.neutral = next
}

export function writeNeutralTint(next: NeutralTint) {
  currentTint = next
  tintLoaded = true
  applyNeutralTint(next)

  try {
    window.localStorage.setItem(NEUTRAL_TINT_STORAGE_KEY, next)
  } catch {
    // The choice still applies for this page load.
  }

  for (const listener of tintListeners) {
    listener()
  }
}

export function useNeutralTint(): NeutralTint {
  return React.useSyncExternalStore(
    subscribeNeutralTint,
    getNeutralTintSnapshot,
    () => "current",
  )
}
