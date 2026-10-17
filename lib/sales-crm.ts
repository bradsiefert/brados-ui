export const SEGMENTS = ["Enterprise", "Mid-Market", "SMB", "Strategic"] as const

export const STAGES = [
  "New Logo",
  "Upsell",
  "Expansion",
  "Renewal",
  "Pilot",
  "Co-Sell",
  "Land & Expand",
] as const

export type Segment = (typeof SEGMENTS)[number]
export type Stage = (typeof STAGES)[number]
export type Tag = Segment | Stage

export type Owner = {
  name: string
  email: string
  phone: string
  role: string
}

const OWNER_NAMES = [
  "Sarah Nguyen",
  "James Taylor",
  "Maria Keller",
  "Nia Jameson",
  "Alex Santos",
  "Mark Darnalds",
  "Drew Nash",
  "Lina Wong",
  "Jamie Fox",
  "Kate Chen",
  "Ricky Brown",
  "Hannah Mills",
  "Emma Green",
  "Oliver Chan",
  "Ava Brooks",
  "Noah Lee",
  "Grace Miller",
  "Chloe Park",
] as const

export const OWNERS: Owner[] = OWNER_NAMES.map((name, index) => ({
  name,
  email: `${name.toLowerCase().replace(" ", ".")}@crm.com`,
  phone: `+1 (202) ${String(199 + index).padStart(3, "0")}-${String(5520 + index * 37).slice(-4)}`,
  role: index % 3 === 0 ? "Senior Account Executive" : "Account Executive",
}))

export const CURRENT_USER: Owner = {
  name: "Jensen Ackles",
  email: "jensen.ackles@crm.com",
  phone: "+1 (202) 184-5501",
  role: "Head of Sales",
}

export function ownerByName(name: string): Owner {
  if (name === CURRENT_USER.name) return CURRENT_USER
  return OWNERS.find((owner) => owner.name === name) ?? OWNERS[0]
}

export type Company = {
  id: string
  name: string
  tags: Tag[]
  owner: string
  openDeals: number
  pipelineValue: number
  winProbability: number
  trend: number[]
  lastInteraction: { date: string; label: string }
  activityDays: number
}

export const DEFAULT_TREND = [4, 4, 5, 5, 2, 7, 11, 7, 5, 7, 5, 3, 7, 14]

const TREND_A = [4, 4, 10, 3, 2, 4, 7, 4, 11, 4, 11, 7, 4, 14]
const TREND_B = [4, 4, 5, 5, 2, 7, 11, 7, 5, 7, 5, 3, 7, 14]
const TREND_C = [4, 4, 10, 5, 2, 7, 11, 7, 11, 7, 11, 7, 7, 14]
const TREND_D = [4, 4, 5, 12, 5, 7, 11, 3, 11, 3, 11, 3, 7, 14]

export const COMPANIES: Company[] = [
  {
    id: "lvmh",
    name: "LVMH",
    tags: ["Enterprise", "Upsell", "Expansion", "Renewal"],
    owner: "Sarah Nguyen",
    openDeals: 7,
    pipelineValue: 420000,
    winProbability: 70,
    trend: TREND_A,
    lastInteraction: { date: "2026-02-21", label: "QBR Call" },
    activityDays: 88,
  },
  {
    id: "disney",
    name: "Disney",
    tags: ["Enterprise", "New Logo"],
    owner: "James Taylor",
    openDeals: 4,
    pipelineValue: 311242,
    winProbability: 51,
    trend: TREND_B,
    lastInteraction: { date: "2026-02-22", label: "Demo" },
    activityDays: 87,
  },
  {
    id: "paypal",
    name: "Paypal",
    tags: ["Enterprise"],
    owner: "Maria Keller",
    openDeals: 5,
    pipelineValue: 124232,
    winProbability: 22,
    trend: TREND_C,
    lastInteraction: { date: "2026-03-12", label: "Security" },
    activityDays: 84,
  },
  {
    id: "united-airlines",
    name: "United Airlines",
    tags: ["Renewal"],
    owner: "Nia Jameson",
    openDeals: 2,
    pipelineValue: 221231,
    winProbability: 77,
    trend: TREND_D,
    lastInteraction: { date: "2026-03-17", label: "Legal" },
    activityDays: 81,
  },
  {
    id: "apple",
    name: "Apple",
    tags: ["Pilot"],
    owner: "Alex Santos",
    openDeals: 6,
    pipelineValue: 530111,
    winProbability: 82,
    trend: TREND_C,
    lastInteraction: { date: "2026-03-12", label: "Exec" },
    activityDays: 83,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    tags: ["Strategic", "Expansion"],
    owner: "Mark Darnalds",
    openDeals: 8,
    pipelineValue: 320222,
    winProbability: 86,
    trend: TREND_C,
    lastInteraction: { date: "2026-03-15", label: "Pilot" },
    activityDays: 79,
  },
  {
    id: "airbnb",
    name: "Airbnb",
    tags: ["Upsell", "Expansion", "SMB", "Pilot"],
    owner: "Drew Nash",
    openDeals: 3,
    pipelineValue: 122230,
    winProbability: 51,
    trend: TREND_B,
    lastInteraction: { date: "2026-03-18", label: "Pricing" },
    activityDays: 78,
  },
  {
    id: "intercom",
    name: "Intercom",
    tags: ["Enterprise", "Mid-Market"],
    owner: "Lina Wong",
    openDeals: 5,
    pipelineValue: 230112,
    winProbability: 61,
    trend: TREND_C,
    lastInteraction: { date: "2026-03-28", label: "Product" },
    activityDays: 74,
  },
  {
    id: "attio",
    name: "Attio",
    tags: ["Mid-Market", "Upsell", "Renewal", "Co-Sell"],
    owner: "Jamie Fox",
    openDeals: 2,
    pipelineValue: 420222,
    winProbability: 38,
    trend: TREND_C,
    lastInteraction: { date: "2026-06-14", label: "Pricing" },
    activityDays: 58,
  },
  {
    id: "google",
    name: "Google",
    tags: ["SMB", "Enterprise", "Expansion", "Pilot"],
    owner: "Kate Chen",
    openDeals: 8,
    pipelineValue: 112277,
    winProbability: 24,
    trend: TREND_B,
    lastInteraction: { date: "2026-06-07", label: "Renewal" },
    activityDays: 62,
  },
  {
    id: "netflix",
    name: "Netflix",
    tags: ["Mid-Market"],
    owner: "Ricky Brown",
    openDeals: 3,
    pipelineValue: 221221,
    winProbability: 72,
    trend: TREND_C,
    lastInteraction: { date: "2026-06-18", label: "Pilot" },
    activityDays: 55,
  },
  {
    id: "spotify",
    name: "Spotify",
    tags: ["Land & Expand", "Expansion", "Strategic"],
    owner: "Hannah Mills",
    openDeals: 5,
    pipelineValue: 170991,
    winProbability: 55,
    trend: TREND_C,
    lastInteraction: { date: "2026-07-01", label: "Expansion" },
    activityDays: 48,
  },
  {
    id: "shopify",
    name: "Shopify",
    tags: ["Co-Sell", "Expansion"],
    owner: "Emma Green",
    openDeals: 9,
    pipelineValue: 139007,
    winProbability: 45,
    trend: TREND_C,
    lastInteraction: { date: "2026-07-18", label: "Renewal" },
    activityDays: 40,
  },
  {
    id: "zoom",
    name: "Zoom",
    tags: ["Expansion", "Land & Expand", "Renewal"],
    owner: "Oliver Chan",
    openDeals: 8,
    pipelineValue: 289921,
    winProbability: 38,
    trend: TREND_D,
    lastInteraction: { date: "2026-08-08", label: "Partner" },
    activityDays: 27,
  },
  {
    id: "slack",
    name: "Slack",
    tags: ["Mid-Market", "Co-Sell"],
    owner: "Ava Brooks",
    openDeals: 4,
    pipelineValue: 333221,
    winProbability: 23,
    trend: TREND_C,
    lastInteraction: { date: "2026-08-12", label: "Discovery" },
    activityDays: 24,
  },
  {
    id: "stripe",
    name: "Stripe",
    tags: ["Expansion", "SMB", "Upsell", "Pilot"],
    owner: "Noah Lee",
    openDeals: 3,
    pipelineValue: 442231,
    winProbability: 44,
    trend: TREND_C,
    lastInteraction: { date: "2026-09-09", label: "Demo" },
    activityDays: 8,
  },
  {
    id: "snowflake",
    name: "Snowflake",
    tags: ["Enterprise", "Mid-Market"],
    owner: "Grace Miller",
    openDeals: 6,
    pipelineValue: 520000,
    winProbability: 24,
    trend: TREND_C,
    lastInteraction: { date: "2026-09-11", label: "Pricing" },
    activityDays: 6,
  },
  {
    id: "hubspot",
    name: "Hubspot",
    tags: ["Expansion", "Co-Sell", "Renewal", "Pilot"],
    owner: "Chloe Park",
    openDeals: 2,
    pipelineValue: 210123,
    winProbability: 52,
    trend: TREND_C,
    lastInteraction: { date: "2026-09-18", label: "QBR Call" },
    activityDays: 2,
  },
]

export const SORT_OPTIONS = [
  { value: "pipelineValue", label: "Pipeline Value" },
  { value: "winProbability", label: "Win Probability" },
  { value: "openDeals", label: "Open Deals" },
  { value: "lastInteraction", label: "Last Interaction" },
  { value: "name", label: "Company Name" },
] as const

export type SortKey = (typeof SORT_OPTIONS)[number]["value"]

export const ACTIVITY_WINDOWS = [7, 30, 60, 90] as const

export type ActivityWindow = (typeof ACTIVITY_WINDOWS)[number]

export const TREND_WINDOWS = ["Last 7 Days", "Last 30 Days", "Last 90 Days"] as const

export type TrendWindow = (typeof TREND_WINDOWS)[number]

export const ALL_OWNERS = "all"
export const ANY_STAGE = "any"
export const TODAY = "2026-09-14"

export type CompanyFilters = {
  sortBy: SortKey
  owner: string
  stage: string
  activityWindow: ActivityWindow
}

export const DEFAULT_FILTERS: CompanyFilters = {
  sortBy: "pipelineValue",
  owner: ALL_OWNERS,
  stage: ANY_STAGE,
  activityWindow: 90,
}

export type ScoreCard = {
  title: string
  description: string
  reviewer: string
  updated: string
  verdict: string
  stars: number
}

export const SCORE_CARDS: ScoreCard[] = [
  {
    title: "Business Fit",
    description: "How well the company aligns with the ideal customer profile.",
    reviewer: "Emma Green",
    updated: "Updated 2h ago",
    verdict: "High potential",
    stars: 4,
  },
  {
    title: "Technical Fit",
    description: "Security requirements, integrations, and rollout readiness.",
    reviewer: "Ricky Brown",
    updated: "Updated 2h ago",
    verdict: "High potential",
    stars: 4,
  },
  {
    title: "Buying Committee",
    description: "Champion, economic buyer, and procurement coverage.",
    reviewer: "Taylor Leroy",
    updated: "Updated 5h ago",
    verdict: "Needs a sponsor",
    stars: 3,
  },
]

export type Notification = {
  id: string
  companyId: string
  message: string
  quote?: string
  time: string
  unread: boolean
}

export const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    companyId: "microsoft",
    message: "Mark Darnalds mentioned you on Microsoft",
    quote: "Can you join the pilot review on Friday? Procurement wants a security walkthrough.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    companyId: "lvmh",
    message: "Sarah Nguyen moved LVMH to Renewal",
    time: "18m ago",
    unread: true,
  },
  {
    id: "n3",
    companyId: "slack",
    message: "Win probability for Slack dropped to 23%",
    time: "1h ago",
    unread: true,
  },
  {
    id: "n4",
    companyId: "shopify",
    message: "Emma Green updated the Business Fit score for Shopify",
    time: "3h ago",
    unread: false,
  },
  {
    id: "n5",
    companyId: "stripe",
    message: "Noah Lee logged a demo with Stripe",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "n6",
    companyId: "snowflake",
    message: "Pipeline value for Snowflake increased to $520,000",
    time: "2d ago",
    unread: false,
  },
]

export function filterCompanies(
  companies: Company[],
  { sortBy, owner, stage, activityWindow }: CompanyFilters,
): Company[] {
  const filtered = companies.filter((company) => {
    if (owner !== ALL_OWNERS && company.owner !== owner) return false
    if (stage !== ANY_STAGE && !company.tags.some((tag) => tag === stage)) return false
    return company.activityDays <= activityWindow
  })

  return filtered.sort((a, b) => compareCompanies(sortBy, a, b))
}

function compareCompanies(sortBy: SortKey, a: Company, b: Company): number {
  switch (sortBy) {
    case "name":
      return a.name.localeCompare(b.name)
    case "lastInteraction":
      return b.lastInteraction.date.localeCompare(a.lastInteraction.date)
    case "openDeals":
      return b.openDeals - a.openDeals
    case "winProbability":
      return b.winProbability - a.winProbability
    case "pipelineValue":
      return b.pipelineValue - a.pipelineValue
    default: {
      const exhaustive: never = sortBy
      return exhaustive
    }
  }
}

export function splitTags(tags: Tag[]): { visible: Tag[]; hidden: number } {
  const budget = 20
  let used = 0
  const visible: Tag[] = []

  for (const tag of tags) {
    if (visible.length === 2 || used + tag.length > budget) break
    visible.push(tag)
    used += tag.length
  }

  if (visible.length === 0 && tags.length > 0) visible.push(tags[0])

  return { visible, hidden: tags.length - visible.length }
}

export function companyHealth(company: Company): {
  discovery: number
  evaluation: number
  procurement: number
} {
  return {
    discovery: Math.round(company.winProbability * 0.372),
    evaluation: Math.round(company.winProbability * 0.651),
    procurement: Math.round(company.winProbability * 0.372),
  }
}

export function companyActivity(company: Company): {
  total: number
  touches: number
  emails: number
  meetings: number
  calls: number
} {
  const deals = company.openDeals
  return {
    total: deals * 15,
    touches: deals * 4,
    emails: deals + 4,
    meetings: Math.ceil(deals / 2),
    calls: deals + 1,
  }
}

export function stageOf(company: Company): Stage {
  const stage = company.tags.find((tag): tag is Stage =>
    (STAGES as readonly string[]).includes(tag),
  )
  return stage ?? "New Logo"
}

export function formatDate(iso: string): string {
  const [, month, day] = iso.split("-").map(Number)
  const names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ]
  return `${names[(month ?? 1) - 1]} ${day}`
}

export function formatMoney(value: number): string {
  return value.toLocaleString("en-US")
}

export function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0] ?? "")
    .slice(0, 2)
    .join("")
}

export function daysSince(iso: string): number {
  const day = 24 * 60 * 60 * 1000
  return Math.max(0, Math.round((Date.parse(TODAY) - Date.parse(iso)) / day))
}

export function trendForWindow(values: number[], window: TrendWindow): number[] {
  switch (window) {
    case "Last 7 Days":
      return values.slice(-7)
    case "Last 30 Days":
      return values.slice(-10)
    case "Last 90 Days":
      return values
    default: {
      const exhaustive: never = window
      return exhaustive
    }
  }
}
