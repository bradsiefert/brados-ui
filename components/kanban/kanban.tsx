"use client"

import {
  ArrowLeftIcon,
  BellIcon,
  CheckCircleIcon,
  CopyIcon,
  CubeIcon,
  DotsThreeIcon,
  FileIcon,
  GithubLogoIcon,
  GridFourIcon,
  TrayIcon,
  LinkIcon,
  ListIcon,
  PlusIcon,
  QuestionIcon,
  SquaresFourIcon,
  StarIcon,
  StackIcon,
  UserPlusIcon,
  XIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import * as React from "react"

import { ThemeSelector } from "@/components/theme-selector"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
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
  Menu,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu"
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toastManager } from "@/components/ui/toast"
import {
  ACTIVITY,
  COLUMNS,
  CURRENT_USER_ID,
  PRIORITIES,
  TASKS,
  assigneeLabel,
  formatDay,
  memberName,
  priorityLabel,
  type Activity,
  type Column,
  type ColumnKind,
  type Priority,
  type Task,
} from "@/lib/kanban"

type View = "inbox" | "my-issues" | "projects" | "views" | "more" | "board"
type BoardTab = "overview" | "updates" | "issues"
type Option = { label: string; value: string }

const COLUMN_ICON: Record<ColumnKind, React.ComponentType> = {
  todo: ListIcon,
  "in-progress": StackIcon,
  done: CheckCircleIcon,
  backlog: SquaresFourIcon,
  canceled: XIcon,
  duplicated: CopyIcon,
}

const PRIORITY_VARIANT = {
  urgent: "warning",
  normal: "info",
  low: "success",
} as const satisfies Record<Priority, "warning" | "info" | "success">

export function Kanban(): React.ReactElement {
  const [title, setTitle] = React.useState("Task Progress & Workflow Dashboard")
  const [favorite, setFavorite] = React.useState(false)
  const [github, setGithub] = React.useState(false)
  const [columns, setColumns] = React.useState<Column[]>(COLUMNS)
  const [tasks, setTasks] = React.useState<Task[]>(TASKS)
  const [activity, setActivity] = React.useState<Activity[]>(ACTIVITY)
  const [view, setView] = React.useState<View>("board")
  const [tab, setTab] = React.useState<BoardTab>("issues")
  const [query, setQuery] = React.useState("")
  const [priority, setPriority] = React.useState("any")
  const [mineOnly, setMineOnly] = React.useState(false)
  const [hiddenOpen, setHiddenOpen] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [renaming, setRenaming] = React.useState(false)
  const [draftTitle, setDraftTitle] = React.useState(title)

  const selected = tasks.find((task) => task.id === selectedId)

  const visibleTasks = tasks.filter((task) => {
    if (mineOnly && !task.assigneeIds.includes(CURRENT_USER_ID)) return false
    if (priority !== "any" && task.priority !== priority) return false
    if (query && !task.title.toLowerCase().includes(query.toLowerCase())) return false
    if (view === "inbox" || view === "my-issues") {
      return task.assigneeIds.includes(CURRENT_USER_ID)
    }
    return true
  })

  function log(text: string) {
    setActivity((current) => [{ id: `a-${Date.now()}`, text, at: "Just now" }, ...current])
  }

  function moveTask(id: string, columnId: string) {
    const task = tasks.find((item) => item.id === id)
    const column = columns.find((item) => item.id === columnId)
    if (!task || !column || task.columnId === columnId) return
    setTasks((current) =>
      current.map((item) => (item.id === id ? { ...item, columnId } : item)),
    )
    log(`Moved “${task.title}” to ${column.name}`)
  }

  function addTask(task: Task) {
    setTasks((current) => [task, ...current])
    log(`Created “${task.title}”`)
    toastManager.add({
      title: "Issue Created",
      description: task.title,
      type: "success",
    })
  }

  function resetDemo() {
    setTitle("Task Progress & Workflow Dashboard")
    setFavorite(false)
    setColumns(COLUMNS)
    setTasks(TASKS)
    setActivity(ACTIVITY)
    setQuery("")
    setPriority("any")
    toastManager.add({ title: "Demo Restored", type: "info" })
  }

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return
      }
      if (event.key === "n" || event.key === "N") {
        event.preventDefault()
        setCreateOpen(true)
      }
      if (event.key === "/") {
        event.preventDefault()
        document.getElementById("board-search")?.focus()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const boardViews = view === "board" || view === "inbox" || view === "my-issues"

  return (
    <SidebarProvider className="h-dvh min-h-0 overflow-hidden">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary font-semibold text-sidebar-primary-foreground text-sm">
              K
            </div>
            <span className="truncate font-semibold text-sm group-data-[collapsible=icon]:hidden">
              Kanbaaan
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavItem
                  active={view === "inbox"}
                  icon={TrayIcon}
                  label="Inbox"
                  onClick={() => {
                    setView("inbox")
                    setMineOnly(true)
                    setTab("issues")
                  }}
                />
                <NavItem
                  active={view === "my-issues"}
                  icon={GridFourIcon}
                  label="My Issues"
                  onClick={() => {
                    setView("my-issues")
                    setMineOnly(true)
                    setTab("issues")
                  }}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavItem
                  active={view === "projects"}
                  icon={CubeIcon}
                  label="Projects"
                  onClick={() => setView("projects")}
                />
                <NavItem
                  active={view === "views"}
                  icon={SquaresFourIcon}
                  label="Views"
                  onClick={() => setView("views")}
                />
                <NavItem
                  active={view === "more"}
                  icon={DotsThreeIcon}
                  label="More"
                  onClick={() => setView("more")}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Your Teams</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <NavItem
                  active={view === "board" && !mineOnly}
                  icon={StackIcon}
                  label="3 Musketeers"
                  onClick={() => {
                    setView("board")
                    setMineOnly(false)
                  }}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => {
                      setGithub((current) => !current)
                      toastManager.add({
                        title: github ? "GitHub Disconnected" : "GitHub Connected",
                        type: "info",
                      })
                    }}
                    tooltip={github ? "GitHub Connected" : "Connect GitHub"}
                  >
                    <GithubLogoIcon />
                    <span>{github ? "GitHub Connected" : "Connect GitHub"}</span>
                    {github ? (
                      <span className="ms-auto size-1.5 rounded-full bg-success" />
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() =>
                      toastManager.add({
                        title: "Invites Aren't Part of This Demo",
                        type: "info",
                      })
                    }
                    tooltip="Invite People"
                  >
                    <UserPlusIcon />
                    <span>Invite People</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/" />} tooltip="Design System">
                <ArrowLeftIcon />
                <span>Design System</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() =>
                  toastManager.add({
                    title: "Press N for a new issue. Press / to search.",
                    type: "info",
                  })
                }
                tooltip="Help"
              >
                <QuestionIcon />
                <span>Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="min-h-0 overflow-hidden">
        <header className="flex shrink-0 flex-wrap items-center gap-2 border-b px-4 py-3">
          <SidebarTrigger />
          <Breadcrumb className="min-w-0 flex-1">
            <BreadcrumbList>
              <BreadcrumbItem className="hidden sm:inline-flex">
                <BreadcrumbLink render={<span />}>Taskio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden sm:inline-flex" />
              <BreadcrumbItem>
                <FileIcon className="size-3.5" />
                {renaming ? (
                  <Input
                    aria-label="Dashboard title"
                    autoFocus
                    className="h-8 max-w-80"
                    onBlur={() => {
                      const next = draftTitle.trim()
                      if (next && next !== title) {
                        setTitle(next)
                        toastManager.add({ title: "Dashboard Renamed", type: "success" })
                      }
                      setRenaming(false)
                    }}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.currentTarget.blur()
                      if (event.key === "Escape") setRenaming(false)
                    }}
                    value={draftTitle}
                  />
                ) : (
                  <BreadcrumbPage className="max-w-[40vw] truncate font-medium text-foreground">
                    {title}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={favorite}
            onClick={() => setFavorite((current) => !current)}
            size="icon"
            variant="outline"
          >
            <StarIcon weight={favorite ? "fill" : "regular"} />
          </Button>
          <Menu>
            <MenuTrigger
              aria-label="Dashboard options"
              render={<Button size="icon" variant="outline" />}
            >
              <DotsThreeIcon />
            </MenuTrigger>
            <MenuPopup align="end">
              <MenuItem
                onClick={() => {
                  setDraftTitle(title)
                  setRenaming(true)
                }}
              >
                Rename Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  void navigator.clipboard.writeText(window.location.href)
                  toastManager.add({ title: "Link Copied", type: "success" })
                }}
              >
                Copy Link
              </MenuItem>
              <MenuItem onClick={() => setFavorite((current) => !current)}>
                {favorite ? "Remove from Favorites" : "Add to Favorites"}
              </MenuItem>
              <MenuSeparator />
              <MenuItem onClick={resetDemo}>Reset Demo Data</MenuItem>
            </MenuPopup>
          </Menu>
          <Button
            aria-label="Copy link"
            className="hidden sm:inline-flex"
            onClick={() => {
              void navigator.clipboard.writeText(window.location.href)
              toastManager.add({ title: "Link Copied", type: "success" })
            }}
            size="icon"
            variant="outline"
          >
            <LinkIcon />
          </Button>
          <Notifications items={activity} />
          <ThemeSelector />
        </header>

        {boardViews ? (
          <>
            <div className="flex shrink-0 flex-wrap items-center gap-2 border-b px-4 py-3">
              <Tabs onValueChange={(next) => setTab(next as BoardTab)} value={tab}>
                <TabsList>
                  <TabsTab value="overview">Overview</TabsTab>
                  <TabsTab value="updates">Updates</TabsTab>
                  <TabsTab value="issues">Issues</TabsTab>
                </TabsList>
              </Tabs>
              <Button
                aria-label="New issue"
                onClick={() => setCreateOpen(true)}
                size="icon"
                title="New Issue (N)"
                variant="outline"
              >
                <PlusIcon />
              </Button>
              {tab === "issues" ? (
                <div className="ms-auto flex flex-wrap items-center gap-2">
                  <Input
                    className="w-48"
                    id="board-search"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search issues"
                    value={query}
                  />
                  <FilterSelect
                    items={[{ label: "Any", value: "any" }, ...PRIORITIES]}
                    label="Priority"
                    onValueChange={setPriority}
                    value={priority}
                  />
                  <Button
                    aria-pressed={hiddenOpen}
                    onClick={() => setHiddenOpen(true)}
                    size="sm"
                    variant="outline"
                  >
                    Hidden Columns
                  </Button>
                </div>
              ) : null}
            </div>

            {tab === "issues" ? (
              <Board
                columns={columns.filter((column) => !column.hidden)}
                onMove={moveTask}
                onOpen={setSelectedId}
                tasks={visibleTasks}
              />
            ) : null}
            {tab === "overview" ? (
              <Overview columns={columns} tasks={visibleTasks} />
            ) : null}
            {tab === "updates" ? <Updates items={activity} /> : null}
          </>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SquaresFourIcon />
              </EmptyMedia>
              <EmptyTitle>
                {view === "projects" ? "Projects" : view === "views" ? "Views" : "More"}
              </EmptyTitle>
              <EmptyDescription>
                This section is in the Kanban navigation. Issues, Overview, and Updates
                are the working views.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </SidebarInset>

      <HiddenColumns
        columns={columns}
        onOpenChange={setHiddenOpen}
        onToggle={(id) =>
          setColumns((current) =>
            current.map((column) =>
              column.id === id ? { ...column, hidden: !column.hidden } : column,
            ),
          )
        }
        open={hiddenOpen}
      />
      <TaskDetail
        columns={columns}
        onMove={moveTask}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
        onPriority={(id, next) =>
          setTasks((current) =>
            current.map((task) => (task.id === id ? { ...task, priority: next } : task)),
          )
        }
        open={selected !== undefined}
        task={selected}
      />
      <NewIssueDialog
        columns={columns.filter((column) => !column.hidden)}
        onCreate={addTask}
        onOpenChange={setCreateOpen}
        open={createOpen}
      />
    </SidebarProvider>
  )
}

function NavItem({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string
  icon: React.ComponentType
  active?: boolean
  onClick: () => void
}): React.ReactElement {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={active} onClick={onClick} tooltip={label}>
        <Icon />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function Board({
  columns,
  tasks,
  onOpen,
  onMove,
}: {
  columns: Column[]
  tasks: Task[]
  onOpen: (id: string) => void
  onMove: (id: string, columnId: string) => void
}): React.ReactElement {
  return (
    <div className="flex min-h-0 flex-1 gap-3 overflow-x-auto p-4">
      {columns.map((column) => {
        const cards = tasks.filter((task) => task.columnId === column.id)
        const Icon = COLUMN_ICON[column.kind]
        return (
          <section
            className="flex w-80 shrink-0 flex-col gap-2 rounded-2xl bg-muted/50 p-2"
            key={column.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              const id = event.dataTransfer.getData("text/plain")
              if (id) onMove(id, column.id)
            }}
          >
            <header className="flex items-center gap-2 px-2 py-1">
              <Icon />
              <h2 className="font-medium text-sm">{column.name}</h2>
              <Badge variant="outline">{cards.length}</Badge>
            </header>
            <div className="flex min-h-24 flex-col gap-2">
              {cards.map((task) => (
                <article
                  className="cursor-grab rounded-2xl border bg-card p-3 text-start shadow-xs/5 active:cursor-grabbing"
                  draggable
                  key={task.id}
                  onClick={() => onOpen(task.id)}
                  onDragStart={(event) => {
                    event.dataTransfer.setData("text/plain", task.id)
                    event.dataTransfer.effectAllowed = "move"
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") onOpen(task.id)
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="mt-2 text-muted-foreground text-xs">
                    Created {formatDay(task.createdAt)}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3">
                    <Badge size="sm" variant={PRIORITY_VARIANT[task.priority]}>
                      {priorityLabel(task.priority)}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {assigneeLabel(task)}
                    </span>
                    {task.dueDate ? (
                      <span className="ms-auto text-muted-foreground text-xs tabular-nums">
                        {formatDay(task.dueDate)}
                      </span>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

function Overview({
  columns,
  tasks,
}: {
  columns: Column[]
  tasks: Task[]
}): React.ReactElement {
  return (
    <div className="grid gap-3 overflow-auto p-4 sm:grid-cols-2 xl:grid-cols-3">
      {columns.map((column) => {
        const count = tasks.filter((task) => task.columnId === column.id).length
        return (
          <Card key={column.id}>
            <CardHeader>
              <CardDescription>{column.name}</CardDescription>
              <CardTitle className="font-heading text-3xl tabular-nums">{count}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={column.hidden ? "outline" : "secondary"}>
                {column.hidden ? "Hidden" : "On Board"}
              </Badge>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function Updates({ items }: { items: Activity[] }): React.ReactElement {
  return (
    <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-4">
      {items.map((item) => (
        <li className="rounded-xl border px-4 py-3" key={item.id}>
          <p className="text-sm">{item.text}</p>
          <p className="text-muted-foreground text-xs">{item.at}</p>
        </li>
      ))}
    </ul>
  )
}

function Notifications({ items }: { items: Activity[] }): React.ReactElement {
  return (
    <Popover>
      <PopoverTrigger
        aria-label="Notifications"
        render={<Button size="icon" variant="outline" />}
      >
        <BellIcon />
      </PopoverTrigger>
      <PopoverPopup align="end" className="w-80">
        <p className="border-b px-3 py-2 font-medium text-sm">Updates</p>
        <ul className="max-h-80 overflow-auto">
          {items.map((item) => (
            <li className="px-3 py-2 text-sm" key={item.id}>
              <p>{item.text}</p>
              <p className="text-muted-foreground text-xs">{item.at}</p>
            </li>
          ))}
        </ul>
      </PopoverPopup>
    </Popover>
  )
}

function HiddenColumns({
  open,
  columns,
  onOpenChange,
  onToggle,
}: {
  open: boolean
  columns: Column[]
  onOpenChange: (open: boolean) => void
  onToggle: (id: string) => void
}): React.ReactElement {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Hidden Columns</SheetTitle>
          <SheetDescription>Show or hide columns on the board.</SheetDescription>
        </SheetHeader>
        <SheetPanel className="flex flex-col gap-3">
          {columns.map((column) => (
            <label className="flex items-center justify-between gap-3 text-sm" key={column.id}>
              <span>{column.name}</span>
              <Switch
                checked={!column.hidden}
                onCheckedChange={() => onToggle(column.id)}
              />
            </label>
          ))}
        </SheetPanel>
      </SheetPopup>
    </Sheet>
  )
}

function TaskDetail({
  task,
  columns,
  open,
  onOpenChange,
  onMove,
  onPriority,
}: {
  task: Task | undefined
  columns: Column[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onMove: (id: string, columnId: string) => void
  onPriority: (id: string, priority: Priority) => void
}): React.ReactElement {
  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetPopup className="max-w-xl">
        <SheetHeader>
          <SheetTitle>{task?.title ?? "Issue"}</SheetTitle>
          <SheetDescription>{task ? assigneeLabel(task) : "Issue details"}</SheetDescription>
        </SheetHeader>
        {task ? (
          <SheetPanel className="flex flex-col gap-4">
            <p className="text-sm">{task.description}</p>
            <div className="flex flex-wrap gap-1">
              {task.assigneeIds.map((id) => (
                <Badge key={id} variant="outline">
                  <Avatar className="size-4">
                    <AvatarFallback>{memberName(id).slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  {memberName(id)}
                </Badge>
              ))}
            </div>
            <Field name="column">
              <FieldLabel>Column</FieldLabel>
              <FilterSelect
                className="w-full"
                items={columns.map((column) => ({ label: column.name, value: column.id }))}
                label="Column"
                onValueChange={(columnId) => onMove(task.id, columnId)}
                showLabel={false}
                value={task.columnId}
              />
            </Field>
            <Field name="priority">
              <FieldLabel>Priority</FieldLabel>
              <FilterSelect
                className="w-full"
                items={PRIORITIES}
                label="Priority"
                onValueChange={(next) => onPriority(task.id, next as Priority)}
                showLabel={false}
                value={task.priority}
              />
            </Field>
          </SheetPanel>
        ) : null}
        <SheetFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}

function NewIssueDialog({
  open,
  columns,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  columns: Column[]
  onOpenChange: (open: boolean) => void
  onCreate: (task: Task) => void
}): React.ReactElement {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [columnId, setColumnId] = React.useState(columns[0]?.id ?? "todo")
  const [priority, setPriority] = React.useState<Priority>("normal")
  const [error, setError] = React.useState(false)

  function reset() {
    setTitle("")
    setDescription("")
    setColumnId(columns[0]?.id ?? "todo")
    setPriority("normal")
    setError(false)
  }

  return (
    <Dialog
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
      open={open}
    >
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>New Issue</DialogTitle>
          <DialogDescription>Add an issue to the board. Press N from the board.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!title.trim()) {
              setError(true)
              return
            }
            onCreate({
              id: `t-${Date.now()}`,
              title: title.trim(),
              description: description.trim() || "No description yet.",
              columnId,
              priority,
              assigneeIds: [CURRENT_USER_ID],
              createdAt: "2026-10-17",
              dueDate: null,
            })
            reset()
            onOpenChange(false)
          }}
        >
          <DialogPanel className="flex flex-col gap-4">
            <Field name="title">
              <FieldLabel>Title</FieldLabel>
              <Input
                aria-invalid={error || undefined}
                onChange={(event) => {
                  setTitle(event.target.value)
                  setError(false)
                }}
                value={title}
              />
              {error ? <FieldError>Enter an issue title.</FieldError> : null}
            </Field>
            <Field name="description">
              <FieldLabel>Description</FieldLabel>
              <Textarea
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="column">
                <FieldLabel>Column</FieldLabel>
                <FilterSelect
                  className="w-full"
                  items={columns.map((column) => ({ label: column.name, value: column.id }))}
                  label="Column"
                  onValueChange={setColumnId}
                  showLabel={false}
                  value={columnId}
                />
              </Field>
              <Field name="priority">
                <FieldLabel>Priority</FieldLabel>
                <FilterSelect
                  className="w-full"
                  items={PRIORITIES}
                  label="Priority"
                  onValueChange={(next) => setPriority(next as Priority)}
                  showLabel={false}
                  value={priority}
                />
              </Field>
            </div>
          </DialogPanel>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create Issue</Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}

function FilterSelect({
  label,
  items,
  value,
  onValueChange,
  showLabel = true,
  className,
}: {
  label: string
  items: readonly Option[]
  value: string
  onValueChange: (value: string) => void
  showLabel?: boolean
  className?: string
}): React.ReactElement {
  const selected = items.find((item) => item.value === value) ?? items[0]
  return (
    <Select
      items={[...items]}
      onValueChange={(next: Option | null) => {
        if (next) onValueChange(next.value)
      }}
      value={selected}
    >
      <SelectTrigger className={className ?? "w-auto min-w-0"} size="sm">
        {showLabel ? <span className="text-muted-foreground">{label}</span> : null}
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {items.map((item) => (
          <SelectItem key={item.value} value={item}>
            {item.label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  )
}
