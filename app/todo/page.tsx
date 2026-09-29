"use client"

import { ThemeSelector } from "@/components/theme-selector"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import {
  ListChecksIcon,
  PencilSimpleIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import { useState, type FormEvent, type ReactElement } from "react"

type Task = {
  id: string
  title: string
  done: boolean
}

type TaskFilter = "all" | "active" | "done"

const seedTasks: Task[] = [
  { id: "seed-review", title: "Review the primary button", done: true },
  { id: "seed-add", title: "Add a task from the form", done: false },
  { id: "seed-edit", title: "Edit a task in the dialog", done: false },
]

function isTaskFilter(value: unknown): value is TaskFilter {
  return value === "all" || value === "active" || value === "done"
}

function matchesFilter(task: Task, filter: TaskFilter): boolean {
  switch (filter) {
    case "all":
      return true
    case "active":
      return !task.done
    case "done":
      return task.done
    default: {
      const exhaustive: never = filter
      return exhaustive
    }
  }
}

function emptyCopy(filter: TaskFilter): { title: string; description: string } {
  switch (filter) {
    case "all":
      return {
        title: "No tasks yet",
        description: "Add a title above to create the first task.",
      }
    case "active":
      return {
        title: "Nothing left to do",
        description: "Active tasks show up here until you check them off.",
      }
    case "done":
      return {
        title: "No completed tasks",
        description: "Check a task to move it into this list.",
      }
    default: {
      const exhaustive: never = filter
      return exhaustive
    }
  }
}

export default function TodoPage(): ReactElement {
  const [tasks, setTasks] = useState<Task[]>(seedTasks)
  const [draft, setDraft] = useState("")
  const [addError, setAddError] = useState<string | null>(null)
  const [filter, setFilter] = useState<TaskFilter>("all")
  const [editing, setEditing] = useState<Task | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editError, setEditError] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<Task | null>(null)

  const doneCount = tasks.filter((task) => task.done).length
  const activeCount = tasks.length - doneCount
  const completion =
    tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100)

  function addTask(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const title = draft.trim()
    if (!title) {
      setAddError("Enter a title.")
      return
    }

    setTasks((current) => [
      ...current,
      { id: crypto.randomUUID(), title, done: false },
    ])
    setDraft("")
    setAddError(null)
    setFilter("all")
  }

  function openEditor(task: Task): void {
    setEditing(task)
    setEditTitle(task.title)
    setEditError(null)
  }

  function saveEdit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (!editing) {
      return
    }

    const title = editTitle.trim()
    if (!title) {
      setEditError("Enter a title.")
      return
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === editing.id ? { ...task, title } : task
      )
    )
    setEditing(null)
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col gap-6 px-6 py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Tasks
          </h1>
          <p className="text-sm text-muted-foreground">
            Add a task, edit it in a dialog, or delete it after you confirm.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button variant="outline" render={<Link href="/" />}>
            Library
          </Button>
          <ThemeSelector />
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Today</CardTitle>
          <CardDescription>
            {activeCount} open, {doneCount} done
          </CardDescription>
        </CardHeader>
        <CardPanel className="flex flex-col gap-4">
          <form className="flex items-start gap-2" onSubmit={addTask}>
            <Field className="min-w-0 flex-1" invalid={addError !== null}>
              <FieldLabel className="sr-only">New task</FieldLabel>
              <Input
                type="text"
                value={draft}
                placeholder="Add a task"
                aria-invalid={addError !== null || undefined}
                onChange={(event) => {
                  setDraft(event.target.value)
                  if (addError) {
                    setAddError(null)
                  }
                }}
              />
              <FieldError match={addError !== null}>{addError}</FieldError>
            </Field>
            <Button type="submit">
              <PlusIcon aria-hidden="true" />
              Add
            </Button>
          </form>

          <Tabs
            value={filter}
            onValueChange={(value) => {
              if (isTaskFilter(value)) {
                setFilter(value)
              }
            }}
          >
            <TabsList>
              <TabsTab value="all">
                All
                <Badge variant="secondary">{tasks.length}</Badge>
              </TabsTab>
              <TabsTab value="active">
                Active
                <Badge variant="info">{activeCount}</Badge>
              </TabsTab>
              <TabsTab value="done">
                Done
                <Badge variant="success">{doneCount}</Badge>
              </TabsTab>
            </TabsList>
            {(["all", "active", "done"] as const).map((panel) => {
              const panelTasks = tasks.filter((task) =>
                matchesFilter(task, panel)
              )
              const panelEmpty = emptyCopy(panel)

              return (
                <TabsPanel key={panel} value={panel} className="pt-2">
                  {panelTasks.length === 0 ? (
                    <Empty className="py-8">
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <ListChecksIcon aria-hidden="true" />
                        </EmptyMedia>
                        <EmptyTitle>{panelEmpty.title}</EmptyTitle>
                        <EmptyDescription>
                          {panelEmpty.description}
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  ) : (
                    <ul className="flex flex-col">
                      {panelTasks.map((task) => (
                        <li
                          key={task.id}
                          className="flex items-center gap-2 border-b py-2 last:border-b-0"
                        >
                          <Checkbox
                            id={`task-${panel}-${task.id}`}
                            checked={task.done}
                            onCheckedChange={(checked) => {
                              setTasks((current) =>
                                current.map((item) =>
                                  item.id === task.id
                                    ? { ...item, done: checked }
                                    : item
                                )
                              )
                            }}
                          />
                          <label
                            htmlFor={`task-${panel}-${task.id}`}
                            className={cn(
                              "min-w-0 flex-1 cursor-pointer truncate text-sm",
                              task.done && "text-muted-foreground line-through"
                            )}
                          >
                            {task.title}
                          </label>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Edit ${task.title}`}
                            onClick={() => {
                              openEditor(task)
                            }}
                          >
                            <PencilSimpleIcon aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Delete ${task.title}`}
                            onClick={() => {
                              setPendingDelete(task)
                            }}
                          >
                            <TrashIcon aria-hidden="true" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </TabsPanel>
              )
            })}
          </Tabs>
        </CardPanel>
        <CardFooter>
          <Progress className="w-full" value={completion}>
            <div className="flex items-center justify-between gap-3">
              <ProgressLabel>Completed</ProgressLabel>
              <ProgressValue>
                {() => `${doneCount} of ${tasks.length}`}
              </ProgressValue>
            </div>
            <ProgressTrack>
              <ProgressIndicator />
            </ProgressTrack>
          </Progress>
        </CardFooter>
      </Card>

      <Dialog
        open={editing !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditing(null)
          }
        }}
      >
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Edit task</DialogTitle>
            <DialogDescription>
              Update the title, then save it back to the list.
            </DialogDescription>
          </DialogHeader>
          <form className="contents" onSubmit={saveEdit}>
            <DialogPanel>
              <Field invalid={editError !== null}>
                <FieldLabel>Title</FieldLabel>
                <Input
                  type="text"
                  value={editTitle}
                  autoFocus
                  aria-invalid={editError !== null || undefined}
                  onChange={(event) => {
                    setEditTitle(event.target.value)
                    if (editError) {
                      setEditError(null)
                    }
                  }}
                />
                <FieldError match={editError !== null}>{editError}</FieldError>
              </Field>
            </DialogPanel>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogPopup>
      </Dialog>

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingDelete(null)
          }
        }}
      >
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete
                ? `"${pendingDelete.title}" will be removed from the list.`
                : "This task will be removed from the list."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" />}>
              Cancel
            </AlertDialogClose>
            <AlertDialogClose
              render={<Button variant="destructive" />}
              onClick={() => {
                if (!pendingDelete) {
                  return
                }
                const id = pendingDelete.id
                setTasks((current) => current.filter((task) => task.id !== id))
              }}
            >
              Delete
            </AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </main>
  )
}
