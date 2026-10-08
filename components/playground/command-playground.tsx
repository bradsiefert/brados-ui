"use client"

import * as React from "react"

import {
  CanvasModeToggle,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type CommandItemValue = { label: string; value: string; shortcut?: string }
type CommandGroupValue = { value: string; items: CommandItemValue[] }

const commands: CommandItemValue[] = [
  { label: "New file", shortcut: "⌘N", value: "new-file" },
  { label: "Open settings", shortcut: "⌘,", value: "settings" },
  { label: "Toggle theme", shortcut: "⌘D", value: "theme" },
]

const grouped: CommandGroupValue[] = [
  { value: "File", items: commands.slice(0, 2) },
  { value: "View", items: commands.slice(2) },
]

const commandProps = [
  { name: "items", type: "array", defaultValue: "—" },
  { name: "placeholder", type: "string", defaultValue: "Search…" },
]

function Palette({
  trigger,
  placeholder,
  groupedItems,
}: {
  trigger: string
  placeholder: string
  groupedItems: boolean
}): React.ReactElement {
  return (
    <CommandDialog>
      <CommandDialogTrigger render={<Button type="button" variant="outline" />}>
        {trigger}
      </CommandDialogTrigger>
      <CommandDialogPopup>
        {groupedItems ? (
          <Command items={grouped}>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>No commands.</CommandEmpty>
            <CommandList>
              {(group: CommandGroupValue) => (
                <CommandGroup items={group.items} key={group.value}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item: CommandItemValue) => (
                      <CommandItem key={item.value} value={item}>
                        {item.label}
                        {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              )}
            </CommandList>
            <CommandFooter>↑↓ to move · Enter to run</CommandFooter>
          </Command>
        ) : (
          <Command items={commands}>
            <CommandInput placeholder={placeholder} />
            <CommandEmpty>No commands.</CommandEmpty>
            <CommandList>
              {(item: CommandItemValue) => (
                <CommandItem key={item.value} value={item}>
                  {item.label}
                  {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                </CommandItem>
              )}
            </CommandList>
          </Command>
        )}
      </CommandDialogPopup>
    </CommandDialog>
  )
}

function CommandGallery(): React.ReactElement {
  return (
    <Gallery>
      <GalleryGroup label="Palette">
        <Palette groupedItems={false} placeholder="Search commands…" trigger="Search" />
        <Palette groupedItems placeholder="Search commands…" trigger="Grouped" />
      </GalleryGroup>
    </Gallery>
  )
}

export function CommandPlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [placeholder, setPlaceholder] = React.useState("Search commands…")
  const [groupedItems, setGroupedItems] = React.useState(false)

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <div className="flex flex-col gap-2">
            <Label htmlFor="command-placeholder">Placeholder</Label>
            <Input
              id="command-placeholder"
              onChange={(event) => setPlaceholder(event.target.value)}
              value={placeholder}
            />
          </div>
          <SwitchField
            checked={groupedItems}
            id="command-grouped"
            label="Grouped"
            onCheckedChange={setGroupedItems}
          />
          <Separator />
          <PropsList props={commandProps} />
          <CompositionNote>
            Open the trigger to search. Include{" "}
            <span className="font-mono text-foreground">CommandEmpty</span>, and put shortcuts in{" "}
            <span className="font-mono text-foreground">CommandShortcut</span>.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A searchable palette, flat or grouped." title="Command">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <CommandGallery />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <Palette
            groupedItems={groupedItems}
            placeholder={placeholder}
            trigger="Open palette"
          />
        </div>
      )}
    </PlaygroundShell>
  )
}
