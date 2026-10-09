"use client"

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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

const rows = [
  { name: "Ada", role: "Design" },
  { name: "Grace", role: "Engineering" },
  { name: "Katherine", role: "Research" },
]

const tableProps = [{ name: "children", type: "ReactNode", defaultValue: "—" }]

function PeopleTable(): React.ReactElement {
  return (
    <Table className="w-full max-w-md">
      <TableCaption>Studio members</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function TablePlayground(): React.ReactElement {
  const [mode, setMode] = React.useState<CanvasMode>("specimen")

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <Separator />
          <PropsList props={tableProps} />
          <CompositionNote>
            Use a header row for column names. A caption names the table for assistive tech.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro description="A simple table with a caption." title="Table">
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <Gallery>
          <GalleryGroup label="Caption" layout="stack">
            <PeopleTable />
          </GalleryGroup>
        </Gallery>
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <PeopleTable />
        </div>
      )}
    </PlaygroundShell>
  )
}
