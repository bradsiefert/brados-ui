export type AutomationStatus = "draft" | "running" | "paused"

export type AutomationCategory = "welcome" | "engagement" | "nurture"

export type ActionKind =
  | "trigger"
  | "send-email"
  | "update-subscription"
  | "send-webhook"
  | "wait-until"
  | "time-delay"
  | "branch"

export type WorkflowNode = {
  id: string
  kind: ActionKind
  x: number
  y: number
  title: string
  description: string
}

export type WorkflowEdge = {
  id: string
  source: string
  target: string
  port: "out" | "true" | "false"
}

export type Automation = {
  id: string
  name: string
  description: string
  status: AutomationStatus
  category: AutomationCategory
  enrolled: number
  completed: number
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

export const ACTION_LABEL: Record<ActionKind, string> = {
  trigger: "Trigger Action",
  "send-email": "Send Email",
  "update-subscription": "Update Subscription",
  "send-webhook": "Send Webhook",
  "wait-until": "Wait Until",
  "time-delay": "Time Delay",
  branch: "True/False Branch",
}

const BUZZING_NODES: WorkflowNode[] = [
  {
    id: "trigger",
    kind: "trigger",
    x: 280,
    y: 24,
    title: "Signed Up",
    description: "Triggered when a new subscriber signs up for your newsletter.",
  },
  {
    id: "wait",
    kind: "wait-until",
    x: 280,
    y: 200,
    title: "Monday at 9:00 AM",
    description: "Ensures the welcome email is sent at an optimal time.",
  },
  {
    id: "branch",
    kind: "branch",
    x: 280,
    y: 376,
    title: "Opened the welcome?",
    description: "Split readers who opened the first email from everyone else.",
  },
  {
    id: "welcome",
    kind: "send-email",
    x: 40,
    y: 580,
    title: "Welcome to the hive",
    description: "Sends the welcome email with a link to your latest issue.",
  },
  {
    id: "delay",
    kind: "time-delay",
    x: 520,
    y: 580,
    title: "Wait 2 days",
    description: "Pauses the workflow before the reminder goes out.",
  },
  {
    id: "webhook",
    kind: "send-webhook",
    x: 520,
    y: 756,
    title: "POST to CRM",
    description: "Sends the subscriber's details to an external URL.",
  },
]

const BUZZING_EDGES: WorkflowEdge[] = [
  { id: "e1", source: "trigger", target: "wait", port: "out" },
  { id: "e2", source: "wait", target: "branch", port: "out" },
  { id: "e3", source: "branch", target: "welcome", port: "true" },
  { id: "e4", source: "branch", target: "delay", port: "false" },
  { id: "e5", source: "delay", target: "webhook", port: "out" },
]

export const AUTOMATIONS: Automation[] = [
  {
    id: "buzzing",
    name: "🐝 Buzzing Your Inbox",
    description: "Sends a welcome sequence to new subscribers.",
    status: "draft",
    category: "welcome",
    enrolled: 0,
    completed: 0,
    nodes: BUZZING_NODES,
    edges: BUZZING_EDGES,
  },
  {
    id: "hello",
    name: "First Hello Flow",
    description: "A short email sequence to greet and guide new users.",
    status: "running",
    category: "welcome",
    enrolled: 76,
    completed: 65,
    nodes: [
      {
        id: "hello-trigger",
        kind: "trigger",
        x: 280,
        y: 24,
        title: "Joined the list",
        description: "Starts when someone confirms their email.",
      },
      {
        id: "hello-mail",
        kind: "send-email",
        x: 280,
        y: 200,
        title: "Say hello",
        description: "A short note with the latest issue and a reply prompt.",
      },
    ],
    edges: [{ id: "hello-1", source: "hello-trigger", target: "hello-mail", port: "out" }],
  },
  {
    id: "journey",
    name: "Welcome Journey 🚀",
    description: "Full onboarding experience with delayed education emails.",
    status: "running",
    category: "nurture",
    enrolled: 12,
    completed: 16,
    nodes: [],
    edges: [],
  },
  {
    id: "youre-in",
    name: "You’re In! 🎉",
    description: "Instant welcome and next steps for newsletter readers.",
    status: "draft",
    category: "welcome",
    enrolled: 0,
    completed: 0,
    nodes: [],
    edges: [],
  },
  {
    id: "started",
    name: "Let’s Get Started 👋",
    description: "Kicks off engagement with next-step guidance.",
    status: "draft",
    category: "engagement",
    enrolled: 0,
    completed: 0,
    nodes: [],
    edges: [],
  },
  {
    id: "still",
    name: "Still With Us? 👀",
    description: "Re-engagement flow for inactive new subscribers.",
    status: "paused",
    category: "engagement",
    enrolled: 42,
    completed: 73,
    nodes: [],
    edges: [],
  },
  {
    id: "tips",
    name: "Next Steps & Tips 💡",
    description: "Sends helpful tips and links after the initial welcome.",
    status: "running",
    category: "nurture",
    enrolled: 89,
    completed: 112,
    nodes: [],
    edges: [],
  },
]

export function statusLabel(status: AutomationStatus): string {
  switch (status) {
    case "draft":
      return "Draft"
    case "running":
      return "Running"
    case "paused":
      return "Paused"
    default: {
      const exhaustive: never = status
      return exhaustive
    }
  }
}

export function categoryLabel(category: AutomationCategory): string {
  switch (category) {
    case "welcome":
      return "Welcome"
    case "engagement":
      return "Engagement"
    case "nurture":
      return "Nurture"
    default: {
      const exhaustive: never = category
      return exhaustive
    }
  }
}

export function starterGraph(name: string): { nodes: WorkflowNode[]; edges: WorkflowEdge[] } {
  return {
    nodes: [
      {
        id: `trigger-${name.length}`,
        kind: "trigger",
        x: 280,
        y: 24,
        title: name,
        description: "Triggered when a subscriber matches this automation.",
      },
    ],
    edges: [],
  }
}
