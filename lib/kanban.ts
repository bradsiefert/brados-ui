export type Priority = "urgent" | "normal" | "low"

export type ColumnKind =
  | "todo"
  | "in-progress"
  | "done"
  | "backlog"
  | "canceled"
  | "duplicated"

export type Member = { id: string; name: string }

export type Column = {
  id: string
  name: string
  kind: ColumnKind
  hidden: boolean
}

export type Task = {
  id: string
  title: string
  description: string
  columnId: string
  priority: Priority
  assigneeIds: string[]
  createdAt: string
  dueDate: string | null
}

export type Activity = { id: string; text: string; at: string }

export const CURRENT_USER_ID = "mark"

export const PRIORITIES: { value: Priority; label: string }[] = [
  { value: "urgent", label: "Urgent" },
  { value: "normal", label: "Normal" },
  { value: "low", label: "Low" },
]

export const MEMBERS: Member[] = [
  { id: "mark", name: "Mark" },
  { id: "andrew", name: "Andrew" },
  { id: "jimmy", name: "Jimmy" },
]

export const COLUMNS: Column[] = [
  { id: "todo", name: "To Do", kind: "todo", hidden: false },
  { id: "in-progress", name: "In Progress", kind: "in-progress", hidden: false },
  { id: "done", name: "Done", kind: "done", hidden: false },
  { id: "backlog", name: "Backlog", kind: "backlog", hidden: true },
  { id: "canceled", name: "Canceled", kind: "canceled", hidden: true },
  { id: "duplicated", name: "Duplicated", kind: "duplicated", hidden: true },
]

export const TASKS: Task[] = [
  {
    id: "t1",
    title: "Prepare Q2 product roadmap",
    description:
      "Collect input from design, engineering, and sales before the planning offsite.",
    columnId: "todo",
    priority: "urgent",
    assigneeIds: ["mark", "andrew"],
    createdAt: "2026-09-08",
    dueDate: "2026-11-05",
  },
  {
    id: "t2",
    title: "Update design system components",
    description: "Bring button, input, and badge sizes in line with the new scale.",
    columnId: "todo",
    priority: "normal",
    assigneeIds: ["andrew"],
    createdAt: "2026-09-07",
    dueDate: "2026-10-25",
  },
  {
    id: "t3",
    title: "Create alignment summary document",
    description: "One page the leads can skim before Monday's review.",
    columnId: "in-progress",
    priority: "urgent",
    assigneeIds: ["andrew", "mark", "jimmy"],
    createdAt: "2026-09-08",
    dueDate: "2026-10-14",
  },
  {
    id: "t4",
    title: "Review homepage copy for launch",
    description: "Check the hero, pricing, and footer against the launch brief.",
    columnId: "in-progress",
    priority: "low",
    assigneeIds: ["andrew", "mark", "jimmy"],
    createdAt: "2026-09-08",
    dueDate: "2026-10-16",
  },
  {
    id: "t5",
    title: "Validate accessibility improvements",
    description: "Keyboard the board, dialogs, and filters. Note anything that fails.",
    columnId: "in-progress",
    priority: "normal",
    assigneeIds: ["jimmy", "andrew", "mark"],
    createdAt: "2026-08-26",
    dueDate: "2026-10-23",
  },
  {
    id: "t6",
    title: "Configure analytics dashboard",
    description: "Wire the launch events and confirm they show up in the overview.",
    columnId: "in-progress",
    priority: "normal",
    assigneeIds: ["mark", "andrew", "jimmy"],
    createdAt: "2026-08-19",
    dueDate: "2026-10-25",
  },
  {
    id: "t7",
    title: "Define success metrics (KPIs)",
    description: "Agree the three numbers we will review every Friday.",
    columnId: "in-progress",
    priority: "urgent",
    assigneeIds: ["andrew", "mark", "jimmy"],
    createdAt: "2026-08-21",
    dueDate: "2026-10-15",
  },
  {
    id: "t8",
    title: "Ship onboarding email sequence",
    description: "Three emails over the first week after signup.",
    columnId: "done",
    priority: "normal",
    assigneeIds: ["andrew"],
    createdAt: "2026-09-08",
    dueDate: "2026-10-17",
  },
  {
    id: "t9",
    title: "Migrate auth to the new SDK",
    description: "Session, sign-in, and the invite link all go through the new client.",
    columnId: "done",
    priority: "normal",
    assigneeIds: ["mark", "andrew", "jimmy"],
    createdAt: "2026-09-08",
    dueDate: "2026-10-13",
  },
  {
    id: "t10",
    title: "Write release notes for v2.4",
    description: "Short notes for the changelog and the in-app banner.",
    columnId: "done",
    priority: "normal",
    assigneeIds: ["andrew", "jimmy", "mark"],
    createdAt: "2026-09-08",
    dueDate: "2026-10-17",
  },
  {
    id: "t11",
    title: "Explore AI-assisted issue triage",
    description: "A sketch of how new issues could land in the right column.",
    columnId: "backlog",
    priority: "low",
    assigneeIds: ["jimmy"],
    createdAt: "2026-10-07",
    dueDate: null,
  },
  {
    id: "t12",
    title: "Refresh pricing page illustrations",
    description: "Replace the three diagrams with the new set.",
    columnId: "backlog",
    priority: "low",
    assigneeIds: [],
    createdAt: "2026-10-12",
    dueDate: null,
  },
  {
    id: "t13",
    title: "Build Slack notifications v1",
    description: "Paused until the launch metrics are in place.",
    columnId: "canceled",
    priority: "normal",
    assigneeIds: ["mark"],
    createdAt: "2026-09-17",
    dueDate: null,
  },
]

export const ACTIVITY: Activity[] = [
  {
    id: "a1",
    text: "Andrew moved “Ship onboarding email sequence” to Done",
    at: "Yesterday",
  },
  {
    id: "a2",
    text: "Mark created “Prepare Q2 product roadmap”",
    at: "2d ago",
  },
  {
    id: "a3",
    text: "Jimmy set “Review homepage copy for launch” to Low priority",
    at: "3d ago",
  },
]

export function memberName(id: string): string {
  return MEMBERS.find((member) => member.id === id)?.name ?? "Unassigned"
}

export function assigneeLabel(task: Task): string {
  const names = task.assigneeIds.map(memberName)
  if (names.length === 0) return "Unassigned"
  if (names.length === 1) return names[0]
  return `${names[0]} +${names.length - 1}`
}

export function formatDay(iso: string): string {
  const [, month, day] = iso.split("-").map(Number)
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  return `${names[(month ?? 1) - 1]} ${day}`
}

export function priorityLabel(priority: Priority): string {
  switch (priority) {
    case "urgent":
      return "Urgent"
    case "normal":
      return "Normal"
    case "low":
      return "Low"
    default: {
      const exhaustive: never = priority
      return exhaustive
    }
  }
}
