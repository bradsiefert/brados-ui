"use client"

import {
  BookOpenIcon,
  ChartBarIcon,
  CopyIcon,
  EnvelopeSimpleIcon,
  GearIcon,
  GitBranchIcon,
  LightningIcon,
  MegaphoneIcon,
  PlayIcon,
  PlusIcon,
  QuestionIcon,
  ShareNetworkIcon,
  SquaresFourIcon,
  StopIcon,
  TimerIcon,
  UsersIcon,
  WebhooksLogoIcon,
} from "@phosphor-icons/react"
import Link from "next/link"
import * as React from "react"

import { ThemeSelector } from "@/components/theme-selector"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  MenuTrigger,
} from "@/components/ui/menu"
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
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toastManager } from "@/components/ui/toast"
import {
  ACTION_LABEL,
  AUTOMATIONS,
  categoryLabel,
  starterGraph,
  statusLabel,
  type ActionKind,
  type Automation,
  type AutomationStatus,
  type WorkflowEdge,
  type WorkflowNode,
} from "@/lib/workflow"

type Screen = "dashboard" | "automations" | "editor" | "campaigns" | "analytics" | "docs"
type EditorTab = "overview" | "workflow" | "settings" | "export"
type Option = { label: string; value: string }

const NODE_WIDTH = 280
const NODE_HEIGHT = 108

const KIND_ICON: Record<ActionKind, React.ComponentType> = {
  trigger: LightningIcon,
  "send-email": EnvelopeSimpleIcon,
  "update-subscription": UsersIcon,
  "send-webhook": WebhooksLogoIcon,
  "wait-until": TimerIcon,
  "time-delay": TimerIcon,
  branch: GitBranchIcon,
}

const STATUS_VARIANT = {
  draft: "secondary",
  running: "success",
  paused: "warning",
} as const satisfies Record<AutomationStatus, "secondary" | "success" | "warning">

const ADDABLE: ActionKind[] = [
  "send-email",
  "wait-until",
  "time-delay",
  "branch",
  "send-webhook",
  "update-subscription",
]

export function WorkflowEditor(): React.ReactElement {
  const [automations, setAutomations] = React.useState<Automation[]>(AUTOMATIONS)
  const [screen, setScreen] = React.useState<Screen>("editor")
  const [automationId, setAutomationId] = React.useState("buzzing")
  const [tab, setTab] = React.useState<EditorTab>("workflow")
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [runningId, setRunningId] = React.useState<string | null>(null)
  const [createOpen, setCreateOpen] = React.useState(false)
  const timer = React.useRef<number | null>(null)
  const idCount = React.useRef(0)

  const automation = automations.find((item) => item.id === automationId) ?? automations[0]

  function patchAutomation(id: string, update: (item: Automation) => Automation) {
    setAutomations((current) => current.map((item) => (item.id === id ? update(item) : item)))
  }

  function openAutomation(id: string, nextTab: EditorTab = "workflow") {
    setAutomationId(id)
    setScreen("editor")
    setTab(nextTab)
    const next = automations.find((item) => item.id === id)
    setSelectedId(null)
  }

  function stopRun() {
    if (timer.current !== null) window.clearInterval(timer.current)
    timer.current = null
    setRunningId(null)
  }

  function runWorkflow() {
    if (!automation) return
    stopRun()
    const order = walk(automation.nodes, automation.edges)
    if (order.length === 0) return
    let index = 0
    setRunningId(order[0] ?? null)
    timer.current = window.setInterval(() => {
      index += 1
      const next = order[index]
      if (!next) {
        stopRun()
        toastManager.add({
          title: "Run Finished",
          description: automation.name,
          type: "success",
        })
        return
      }
      setRunningId(next)
    }, 700)
  }

  React.useEffect(() => () => stopRun(), [])

  function addStep(kind: ActionKind) {
    if (!automation) return
    idCount.current += 1
    const id = `${kind}-${idCount.current}`
    const last = automation.nodes[automation.nodes.length - 1]
    const node: WorkflowNode = {
      id,
      kind,
      x: last ? last.x : 280,
      y: last ? last.y + 176 : 24,
      title: ACTION_LABEL[kind],
      description: "New step. Open it to edit the title and description.",
    }
    const edge: WorkflowEdge | null = last
      ? { id: `e-${id}`, source: last.id, target: id, port: "out" }
      : null
    patchAutomation(automation.id, (item) => ({
      ...item,
      nodes: [...item.nodes, node],
      edges: edge ? [...item.edges, edge] : item.edges,
    }))
    setSelectedId(id)
    setTab("workflow")
  }

  return (
    <SidebarProvider className="h-dvh min-h-0 overflow-hidden">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary font-semibold text-sidebar-primary-foreground text-sm">
              B
            </div>
            <span className="truncate font-semibold text-sm group-data-[collapsible=icon]:hidden">
              Buzzing
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setCreateOpen(true)} tooltip="New Automation">
                    <PlusIcon />
                    <span>New Automation</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <NavItem
                  active={screen === "dashboard"}
                  icon={SquaresFourIcon}
                  label="Dashboard"
                  onClick={() => setScreen("dashboard")}
                />
                <NavItem
                  active={screen === "automations" || screen === "editor"}
                  icon={LightningIcon}
                  label="Automations"
                  onClick={() => setScreen("automations")}
                />
                <NavItem
                  active={screen === "campaigns"}
                  icon={MegaphoneIcon}
                  label="Campaigns"
                  onClick={() => setScreen("campaigns")}
                />
                <NavItem
                  active={screen === "analytics"}
                  icon={ChartBarIcon}
                  label="Analytics"
                  onClick={() => setScreen("analytics")}
                />
                <NavItem
                  active={screen === "docs"}
                  icon={BookOpenIcon}
                  label="Docs"
                  onClick={() => setScreen("docs")}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => automation && openAutomation(automation.id, "settings")}
                tooltip="Settings"
              >
                <GearIcon />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/" />} tooltip="Design System">
                <span>Design System</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="min-h-0 overflow-hidden bg-muted/40">
        <div className="m-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border bg-background shadow-xs/5">
          <header className="flex shrink-0 flex-wrap items-center gap-2 border-b bg-header px-4 py-3">
            <SidebarTrigger />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate font-heading text-lg font-semibold">
                  {screen === "editor"
                    ? automation?.name
                    : screen === "dashboard"
                      ? "Dashboard"
                      : screen === "automations"
                        ? "Automations"
                        : screen === "campaigns"
                          ? "Campaigns"
                          : screen === "analytics"
                            ? "Analytics"
                            : "Docs"}
                </h1>
                {screen === "editor" && automation ? (
                  <Badge variant={STATUS_VARIANT[automation.status]}>
                    {statusLabel(automation.status)}
                  </Badge>
                ) : null}
              </div>
              {screen === "editor" && automation ? (
                <p className="truncate text-muted-foreground text-xs">{automation.description}</p>
              ) : null}
            </div>
            <div className="ms-auto flex flex-wrap items-center gap-2">
              {screen === "editor" ? (
                <>
                  <Menu>
                    <MenuTrigger render={<Button size="sm" variant="outline" />}>
                      <PlusIcon />
                      Add Step
                    </MenuTrigger>
                    <MenuPopup>
                      {ADDABLE.map((kind) => (
                        <MenuItem key={kind} onClick={() => addStep(kind)}>
                          {ACTION_LABEL[kind]}
                        </MenuItem>
                      ))}
                    </MenuPopup>
                  </Menu>
                  <Button
                    onClick={() => (runningId ? stopRun() : runWorkflow())}
                    size="sm"
                    variant={runningId ? "outline" : "default"}
                  >
                    {runningId ? <StopIcon /> : <PlayIcon />}
                    {runningId ? "Stop" : "Run"}
                  </Button>
                </>
              ) : null}
              <Button
                onClick={() =>
                  toastManager.add({
                    title: "Need a Hand?",
                    description: "The team replies in about 5 minutes on weekdays.",
                    type: "info",
                  })
                }
                size="sm"
                variant="outline"
              >
                <QuestionIcon />
                Help
              </Button>
              <Button
                onClick={() => {
                  void navigator.clipboard.writeText("https://buzzing.email/r/marcelkargul")
                  toastManager.add({ title: "Referral Link Copied", type: "success" })
                }}
                size="sm"
                variant="outline"
              >
                <ShareNetworkIcon />
                Share & Earn
              </Button>
              <Avatar className="size-8">
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <ThemeSelector />
            </div>
          </header>

          {screen === "editor" && automation ? (
            <Tabs
              className="flex min-h-0 flex-1 flex-col"
              onValueChange={(next) => setTab(next as EditorTab)}
              value={tab}
            >
              <TabsList className="px-4" variant="underline">
                <TabsTab value="overview">Overview</TabsTab>
                <TabsTab value="workflow">Workflow</TabsTab>
                <TabsTab value="settings">Settings</TabsTab>
                <TabsTab value="export">Export</TabsTab>
              </TabsList>
              <TabsPanel className="flex min-h-0 flex-1 flex-col" value="overview">
                <AutomationOverview automation={automation} />
              </TabsPanel>
              <TabsPanel className="min-h-0 flex-1" value="workflow">
                <Canvas
                  edges={automation.edges}
                  nodes={automation.nodes}
                  onSelect={setSelectedId}
                  runningId={runningId}
                  selectedId={selectedId}
                />
              </TabsPanel>
              <TabsPanel className="min-h-0 flex-1 overflow-auto" value="settings">
                <Settings
                  automation={automation}
                  onChange={(patch) =>
                    patchAutomation(automation.id, (item) => ({ ...item, ...patch }))
                  }
                />
              </TabsPanel>
              <TabsPanel className="min-h-0 flex-1 overflow-auto p-4" value="export">
                <ExportView automation={automation} />
              </TabsPanel>
            </Tabs>
          ) : null}

          {screen === "automations" ? (
            <AutomationsList
              automations={automations}
              onCreate={() => setCreateOpen(true)}
              onOpen={openAutomation}
            />
          ) : null}

          {screen === "dashboard" ? <Dashboard automations={automations} /> : null}

          {screen === "campaigns" || screen === "analytics" || screen === "docs" ? (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <LightningIcon />
                </EmptyMedia>
                <EmptyTitle>
                  {screen === "campaigns"
                    ? "Campaigns"
                    : screen === "analytics"
                      ? "Analytics"
                      : "Docs"}
                </EmptyTitle>
                <EmptyDescription>
                  This section is in the editor navigation. Automations and the workflow
                  canvas are the working views.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : null}
        </div>
      </SidebarInset>

      <NodeInspector
        node={automation?.nodes.find((node) => node.id === selectedId)}
        onChange={(patch) => {
          if (!automation || !selectedId) return
          patchAutomation(automation.id, (item) => ({
            ...item,
            nodes: item.nodes.map((node) =>
              node.id === selectedId ? { ...node, ...patch } : node,
            ),
          }))
        }}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null)
        }}
        open={screen === "editor" && tab === "workflow" && selectedId !== null}
      />
      <NewAutomationDialog
        onCreate={(name) => {
          idCount.current += 1
          const graph = starterGraph(name)
          const created: Automation = {
            id: `auto-${idCount.current}`,
            name,
            description: "A new automation.",
            status: "draft",
            category: "welcome",
            enrolled: 0,
            completed: 0,
            ...graph,
          }
          setAutomations((current) => [created, ...current])
          setAutomationId(created.id)
          setSelectedId(graph.nodes[0]?.id ?? null)
          setScreen("editor")
          setTab("workflow")
          toastManager.add({ title: "Automation Created", description: name, type: "success" })
        }}
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

function Canvas({
  nodes,
  edges,
  selectedId,
  runningId,
  onSelect,
}: {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedId: string | null
  runningId: string | null
  onSelect: (id: string) => void
}): React.ReactElement {
  const width = Math.max(960, ...nodes.map((node) => node.x + NODE_WIDTH + 80))
  const height = Math.max(640, ...nodes.map((node) => node.y + NODE_HEIGHT + 80))

  return (
    <div className="min-h-0 flex-1 overflow-auto bg-[radial-gradient(circle,var(--color-border)_1px,transparent_1px)] [background-size:20px_20px]">
      <div className="relative" style={{ blockSize: height, inlineSize: width }}>
        <svg aria-hidden className="absolute inset-0 size-full text-border" role="presentation">
          {edges.map((edge) => {
            const source = nodes.find((node) => node.id === edge.source)
            const target = nodes.find((node) => node.id === edge.target)
            if (!source || !target) return null
            const x1 = source.x + NODE_WIDTH / 2
            const y1 = source.y + NODE_HEIGHT
            const x2 = target.x + NODE_WIDTH / 2
            const y2 = target.y
            const mid = (y1 + y2) / 2
            return (
              <path
                d={`M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`}
                fill="none"
                key={edge.id}
                stroke="currentColor"
                strokeWidth="1.5"
              />
            )
          })}
        </svg>
        {nodes.map((node) => {
          const Icon = KIND_ICON[node.kind]
          const selected = node.id === selectedId
          const running = node.id === runningId
          return (
            <button
              className="absolute flex w-[280px] flex-col gap-1 rounded-xl border bg-card p-3 text-start shadow-xs/5 focus-visible:ring-2 focus-visible:ring-ring data-[running=true]:ring-2 data-[running=true]:ring-primary data-[selected=true]:border-primary"
              data-running={running}
              data-selected={selected}
              key={node.id}
              onClick={() => onSelect(node.id)}
              style={{ insetBlockStart: node.y, insetInlineStart: node.x }}
              type="button"
            >
              <span className="flex items-center gap-2 text-primary text-sm">
                <Icon />
                {ACTION_LABEL[node.kind]}
              </span>
              <span className="font-medium text-sm">{node.title}</span>
              <span className="line-clamp-2 text-muted-foreground text-xs">{node.description}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function walk(nodes: WorkflowNode[], edges: WorkflowEdge[]): string[] {
  const start = nodes.find((node) => node.kind === "trigger") ?? nodes[0]
  if (!start) return []
  const order: string[] = []
  const queue = [start.id]
  const seen = new Set<string>()
  while (queue.length > 0) {
    const current = queue.shift()
    if (!current || seen.has(current)) continue
    seen.add(current)
    order.push(current)
    for (const edge of edges) {
      if (edge.source === current) queue.push(edge.target)
    }
  }
  return order
}

function AutomationOverview({ automation }: { automation: Automation }): React.ReactElement {
  const stats = [
    { label: "Enrolled", value: String(automation.enrolled) },
    { label: "Completed", value: String(automation.completed) },
    { label: "Steps", value: String(automation.nodes.length) },
    { label: "Category", value: categoryLabel(automation.category) },
  ]
  return (
    <div className="grid gap-3 overflow-auto p-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="font-heading text-3xl">{stat.value}</CardTitle>
          </CardHeader>
        </Card>
      ))}
      <Card className="sm:col-span-2 xl:col-span-4">
        <CardHeader>
          <CardTitle>About This Automation</CardTitle>
          <CardDescription>{automation.description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

function Settings({
  automation,
  onChange,
}: {
  automation: Automation
  onChange: (patch: Partial<Pick<Automation, "name" | "description" | "status">>) => void
}): React.ReactElement {
  const statuses: Option[] = [
    { label: "Draft", value: "draft" },
    { label: "Running", value: "running" },
    { label: "Paused", value: "paused" },
  ]
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 p-4">
      <Field name="name">
        <FieldLabel>Name</FieldLabel>
        <Input
          onChange={(event) => onChange({ name: event.target.value })}
          value={automation.name}
        />
      </Field>
      <Field name="description">
        <FieldLabel>Description</FieldLabel>
        <Textarea
          onChange={(event) => onChange({ description: event.target.value })}
          value={automation.description}
        />
      </Field>
      <Field name="status">
        <FieldLabel>Status</FieldLabel>
        <FilterSelect
          className="w-full"
          items={statuses}
          label="Status"
          onValueChange={(status) => onChange({ status: status as AutomationStatus })}
          showLabel={false}
          value={automation.status}
        />
      </Field>
    </div>
  )
}

function ExportView({ automation }: { automation: Automation }): React.ReactElement {
  const json = JSON.stringify(
    { name: automation.name, nodes: automation.nodes, edges: automation.edges },
    null,
    2,
  )
  return (
    <Card>
      <CardHeader>
        <CardTitle>Export</CardTitle>
        <CardDescription>The workflow graph as JSON.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <pre className="max-h-96 overflow-auto rounded-xl bg-muted p-3 text-xs">{json}</pre>
        <Button
          className="self-start"
          onClick={() => {
            void navigator.clipboard.writeText(json)
            toastManager.add({ title: "JSON Copied", type: "success" })
          }}
          size="sm"
          variant="outline"
        >
          <CopyIcon />
          Copy JSON
        </Button>
      </CardContent>
    </Card>
  )
}

function AutomationsList({
  automations,
  onOpen,
  onCreate,
}: {
  automations: Automation[]
  onOpen: (id: string) => void
  onCreate: () => void
}): React.ReactElement {
  return (
    <div className="min-h-0 flex-1 overflow-auto p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-muted-foreground text-sm">
          Craft automated journeys for newsletter subscribers.
        </p>
        <Button onClick={onCreate} size="sm">
          <PlusIcon />
          New Automation
        </Button>
      </div>
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-end">Enrolled</TableHead>
            <TableHead className="text-end">Completed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {automations.map((item) => (
            <TableRow
              className="cursor-pointer"
              key={item.id}
              onClick={() => onOpen(item.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onOpen(item.id)
              }}
              tabIndex={0}
            >
              <TableCell>
                <span className="font-medium">{item.name}</span>
                <span className="block text-muted-foreground text-xs">{item.description}</span>
              </TableCell>
              <TableCell>{categoryLabel(item.category)}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[item.status]}>{statusLabel(item.status)}</Badge>
              </TableCell>
              <TableCell className="text-end tabular-nums">{item.enrolled}</TableCell>
              <TableCell className="text-end tabular-nums">{item.completed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Dashboard({ automations }: { automations: Automation[] }): React.ReactElement {
  const enrolled = automations.reduce((sum, item) => sum + item.enrolled, 0)
  const completed = automations.reduce((sum, item) => sum + item.completed, 0)
  const running = automations.filter((item) => item.status === "running").length
  return (
    <div className="grid gap-3 overflow-auto p-4 sm:grid-cols-3">
      {[
        { label: "Automations", value: String(automations.length) },
        { label: "Running", value: String(running) },
        { label: "Enrolled", value: String(enrolled) },
        { label: "Completed", value: String(completed) },
      ].map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="font-heading text-3xl tabular-nums">{stat.value}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

function NodeInspector({
  node,
  open,
  onOpenChange,
  onChange,
}: {
  node: WorkflowNode | undefined
  open: boolean
  onOpenChange: (open: boolean) => void
  onChange: (patch: Partial<Pick<WorkflowNode, "title" | "description">>) => void
}): React.ReactElement {
  return (
    <Sheet onOpenChange={onOpenChange} open={open && node !== undefined}>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>{node ? ACTION_LABEL[node.kind] : "Step"}</SheetTitle>
          <SheetDescription>Edit this step. The canvas updates as you type.</SheetDescription>
        </SheetHeader>
        {node ? (
          <SheetPanel className="flex flex-col gap-4">
            <Field name="title">
              <FieldLabel>Title</FieldLabel>
              <Input
                onChange={(event) => onChange({ title: event.target.value })}
                value={node.title}
              />
            </Field>
            <Field name="description">
              <FieldLabel>Description</FieldLabel>
              <Textarea
                onChange={(event) => onChange({ description: event.target.value })}
                value={node.description}
              />
            </Field>
          </SheetPanel>
        ) : null}
      </SheetPopup>
    </Sheet>
  )
}

function NewAutomationDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (name: string) => void
}): React.ReactElement {
  const [name, setName] = React.useState("")
  const [error, setError] = React.useState(false)
  return (
    <Dialog
      onOpenChange={(next) => {
        if (!next) {
          setName("")
          setError(false)
        }
        onOpenChange(next)
      }}
      open={open}
    >
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>New Automation</DialogTitle>
          <DialogDescription>Start with a trigger. Add steps from the workflow canvas.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (!name.trim()) {
              setError(true)
              return
            }
            onCreate(name.trim())
            setName("")
            onOpenChange(false)
          }}
        >
          <DialogPanel>
            <Field name="name">
              <FieldLabel>Name</FieldLabel>
              <Input
                aria-invalid={error || undefined}
                onChange={(event) => {
                  setName(event.target.value)
                  setError(false)
                }}
                value={name}
              />
              {error ? <FieldError>Enter a name.</FieldError> : null}
            </Field>
          </DialogPanel>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}

function FilterSelect({
  items,
  value,
  onValueChange,
  showLabel = true,
  label,
  className,
}: {
  items: readonly Option[]
  value: string
  onValueChange: (value: string) => void
  showLabel?: boolean
  label: string
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
