"use client"

import {
  AddressBookIcon,
  BellIcon,
  BuildingsIcon,
  CalendarBlankIcon,
  ChartBarIcon,
  ClockIcon,
  CursorClickIcon,
  DotsThreeIcon,
  EnvelopeSimpleIcon,
  ExportIcon,
  KanbanIcon,
  ListChecksIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  PlusIcon,
  QuestionIcon,
  StarIcon,
  TargetIcon,
  UserPlusIcon,
  UsersIcon,
  WalletIcon,
  WarningIcon,
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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
import { Meter, MeterIndicator, MeterTrack } from "@/components/ui/meter"
import { Popover, PopoverPopup, PopoverTrigger } from "@/components/ui/popover"
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress"
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Slider } from "@/components/ui/slider"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTab } from "@/components/ui/tabs"
import { toastManager } from "@/components/ui/toast"
import {
  ACTIVITY_WINDOWS,
  ALL_OWNERS,
  ANY_STAGE,
  COMPANIES,
  CURRENT_USER,
  DEFAULT_FILTERS,
  DEFAULT_TREND,
  NOTIFICATIONS,
  OWNERS,
  SCORE_CARDS,
  SEGMENTS,
  SORT_OPTIONS,
  STAGES,
  TODAY,
  TREND_WINDOWS,
  companyActivity,
  companyHealth,
  daysSince,
  filterCompanies,
  formatDate,
  formatMoney,
  initials,
  ownerByName,
  splitTags,
  stageOf,
  trendForWindow,
  type ActivityWindow,
  type Company,
  type CompanyFilters,
  type Notification,
  type ScoreCard,
  type SortKey,
  type Stage,
  type Tag,
  type TrendWindow,
} from "@/lib/sales-crm"

type View =
  | "companies"
  | "deals"
  | "forecast"
  | "activities"
  | "contacts"
  | "sequences"
  | "strategic"
  | "mid-market"
  | "sdr"
  | "q1"
  | "slipping"

type Option = { label: string; value: string }

type Panel =
  | { kind: "company"; id: string }
  | { kind: "profile"; name: string }
  | null

const TAG_VARIANT = {
  Enterprise: "info",
  "Mid-Market": "success",
  SMB: "warning",
  Strategic: "error",
  "New Logo": "success",
  Upsell: "default",
  Expansion: "info",
  Renewal: "success",
  Pilot: "warning",
  "Co-Sell": "warning",
  "Land & Expand": "info",
} as const satisfies Record<Tag, "default" | "info" | "success" | "warning" | "error">

const PIPELINES = [
  { label: "North America", className: "bg-warning" },
  { label: "EMEA Enterprise", className: "bg-destructive" },
  { label: "APAC Expansion", className: "bg-primary" },
] as const

const OWNER_OPTIONS: Option[] = [
  { value: ALL_OWNERS, label: "All Owners" },
  ...OWNERS.map((owner) => ({ value: owner.name, label: owner.name })),
]

const STAGE_OPTIONS: Option[] = [
  { value: ANY_STAGE, label: "Any" },
  ...[...SEGMENTS, ...STAGES].map((tag) => ({ value: tag, label: tag })),
]

const ACTIVITY_OPTIONS: Option[] = ACTIVITY_WINDOWS.map((days) => ({
  value: String(days),
  label: `${days} Days`,
}))

const SORT_ITEMS: Option[] = SORT_OPTIONS.map((option) => ({
  value: option.value,
  label: option.label,
}))

const MAIN_VIEWS = ["companies", "deals", "forecast"] as const

type MainView = (typeof MAIN_VIEWS)[number]

function isMainView(view: View): view is MainView {
  return (MAIN_VIEWS as readonly string[]).includes(view)
}

function viewTitle(view: View): string {
  switch (view) {
    case "companies":
      return "Companies"
    case "deals":
      return "Deals"
    case "forecast":
      return "Forecast"
    case "activities":
      return "Activities"
    case "contacts":
      return "Contacts"
    case "sequences":
      return "Email Sequences"
    case "strategic":
      return "Strategic AEs"
    case "mid-market":
      return "Mid Market"
    case "sdr":
      return "SDR Team"
    case "q1":
      return "Q1 Forecast"
    case "slipping":
      return "Slipping Deals"
    default: {
      const exhaustive: never = view
      return exhaustive
    }
  }
}

export function SalesCrm(): React.ReactElement {
  const [companies, setCompanies] = React.useState<Company[]>(COMPANIES)
  const [filters, setFilters] = React.useState<CompanyFilters>(DEFAULT_FILTERS)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [view, setView] = React.useState<View>("companies")
  const [panel, setPanel] = React.useState<Panel>(null)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [createOpen, setCreateOpen] = React.useState(false)
  const [notifications, setNotifications] =
    React.useState<Notification[]>(NOTIFICATIONS)

  const visible = React.useMemo(
    () => filterCompanies(companies, filters),
    [companies, filters],
  )

  const selectedVisible = visible.filter((company) =>
    selectedIds.includes(company.id),
  )
  const allSelected = visible.length > 0 && selectedVisible.length === visible.length
  const someSelected = selectedVisible.length > 0 && !allSelected

  const openCompany = React.useCallback((id: string) => {
    setPanel({ kind: "company", id })
  }, [])

  const openProfile = React.useCallback((name: string) => {
    setPanel({ kind: "profile", name })
  }, [])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  function toggleAll() {
    setSelectedIds(allSelected ? [] : visible.map((company) => company.id))
  }

  function toggleSelected(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function addCompany(company: Company) {
    setCompanies((current) => [company, ...current])
    setCreateOpen(false)
    setView("companies")
    toastManager.add({
      title: "Company Added",
      description: `${company.name} is in the pipeline.`,
      type: "success",
    })
  }

  function exportCsv() {
    const rows = [
      [
        "Company",
        "Segment & Stage",
        "Account Owner",
        "Open Deals",
        "Pipeline Value",
        "Win Probability",
        "Last Interaction",
      ],
      ...visible.map((company) => [
        company.name,
        company.tags.join("; "),
        company.owner,
        String(company.openDeals),
        String(company.pipelineValue),
        String(company.winProbability),
        `${company.lastInteraction.date} ${company.lastInteraction.label}`,
      ]),
    ]
    const csv = rows
      .map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","))
      .join("\n")
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    const link = document.createElement("a")
    link.href = url
    link.download = `companies-${TODAY}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const activeCompany =
    panel?.kind === "company"
      ? companies.find((company) => company.id === panel.id)
      : undefined
  const profile =
    panel?.kind === "profile" ? ownerByName(panel.name) : undefined

  return (
    <SidebarProvider className="h-dvh min-h-0 overflow-hidden">
      <CrmSidebar
        companyCount={companies.length}
        view={view}
        onView={setView}
      />
      <SidebarInset className="min-h-0 overflow-hidden">
        <header className="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b bg-header px-4 py-3">
          <div className="flex shrink-0 items-center gap-2">
            <SidebarTrigger />
            <h1 className="font-heading text-xl font-semibold tracking-tight">
              {viewTitle(view)}
            </h1>
            {view === "companies" ? (
              <Badge variant="success">
                <span className="size-1.5 rounded-full bg-success-foreground" />
                Active
              </Badge>
            ) : null}
          </div>
          <div className="ms-auto flex shrink-0 items-center gap-2">
            <Button
              aria-keyshortcuts="Meta+K Control+K"
              aria-label="Search companies"
              onClick={() => setSearchOpen(true)}
              size="icon"
              variant="outline"
            >
              <MagnifyingGlassIcon />
            </Button>
            <NotificationsMenu
              items={notifications}
              onOpenCompany={openCompany}
              onChange={setNotifications}
            />
            <Button
              aria-label={`Open profile for ${CURRENT_USER.name}`}
              onClick={() => openProfile(CURRENT_USER.name)}
              size="sm"
              variant="outline"
            >
              <Avatar className="size-5">
                <AvatarFallback>{initials(CURRENT_USER.name)}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">{CURRENT_USER.name}</span>
            </Button>
            <ThemeSelector />
          </div>
        </header>

        {isMainView(view) ? (
          <Tabs
            onValueChange={(next) => setView(next as MainView)}
            value={view}
          >
            <TabsList className="px-4" variant="underline">
              <TabsTab value="companies">Companies</TabsTab>
              <TabsTab value="deals">Deals</TabsTab>
              <TabsTab value="forecast">Forecast</TabsTab>
            </TabsList>
          </Tabs>
        ) : null}

        {view === "companies" ? (
          <CompaniesView
            allSelected={allSelected}
            filters={filters}
            onExport={exportCsv}
            onFilters={setFilters}
            onOpen={openCompany}
            onOpenOwner={openProfile}
            onToggle={toggleSelected}
            onToggleAll={toggleAll}
            selectedIds={selectedIds}
            someSelected={someSelected}
            visible={visible}
            onCreate={() => setCreateOpen(true)}
          />
        ) : null}

        {view === "deals" ? (
          <DealsBoard companies={companies} onOpen={openCompany} />
        ) : null}

        {view === "forecast" ? <ForecastView companies={companies} /> : null}

        {!isMainView(view) ? <PlaceholderView title={viewTitle(view)} /> : null}
      </SidebarInset>

      <CompanySearch
        companies={companies}
        onOpen={openCompany}
        onOpenChange={setSearchOpen}
        open={searchOpen}
      />
      <CompanyDetail
        company={activeCompany}
        onOpenChange={(open) => {
          if (!open) setPanel(null)
        }}
        onOpenOwner={openProfile}
        open={activeCompany !== undefined}
      />
      <OwnerProfile
        companies={companies}
        onOpenChange={(open) => {
          if (!open) setPanel(null)
        }}
        onOpenCompany={openCompany}
        onShowAccounts={(name) => {
          setFilters((current) => ({ ...current, owner: name }))
          setView("companies")
          setPanel(null)
        }}
        open={profile !== undefined}
        owner={profile}
      />
      <NewCompanyDialog
        onCreate={addCompany}
        onOpenChange={setCreateOpen}
        open={createOpen}
      />
    </SidebarProvider>
  )
}

function CrmSidebar({
  companyCount,
  view,
  onView,
}: {
  companyCount: number
  view: View
  onView: (view: View) => void
}): React.ReactElement {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary font-semibold text-sidebar-primary-foreground text-sm">
            S
          </div>
          <div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold text-sm">Sales CRM</span>
            <span className="truncate text-muted-foreground text-xs">
              Company pipeline
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavButton
                active={view === "companies"}
                count={companyCount}
                icon={BuildingsIcon}
                label="Companies"
                onClick={() => onView("companies")}
              />
              <NavButton
                active={view === "deals"}
                icon={KanbanIcon}
                label="Deals Board"
                onClick={() => onView("deals")}
              />
              <NavButton
                active={view === "forecast"}
                count={9}
                icon={ChartBarIcon}
                label="Forecast"
                onClick={() => onView("forecast")}
              />
              <NavButton
                active={view === "activities"}
                icon={ListChecksIcon}
                label="Activities"
                onClick={() => onView("activities")}
              />
              <NavButton
                active={view === "contacts"}
                count={38}
                icon={AddressBookIcon}
                label="Contacts"
                onClick={() => onView("contacts")}
              />
              <NavButton
                active={view === "sequences"}
                icon={EnvelopeSimpleIcon}
                label="Email Sequences"
                onClick={() => onView("sequences")}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Team</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavButton
                active={view === "strategic"}
                icon={TargetIcon}
                label="Strategic AEs"
                onClick={() => onView("strategic")}
              />
              <NavButton
                active={view === "mid-market"}
                icon={TargetIcon}
                label="Mid Market"
                onClick={() => onView("mid-market")}
              />
              <NavButton
                active={view === "sdr"}
                icon={UsersIcon}
                label="SDR Team"
                onClick={() => onView("sdr")}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Reporting</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavButton
                active={view === "q1"}
                icon={ChartBarIcon}
                label="Q1 Forecast"
                onClick={() => onView("q1")}
              />
              <NavButton
                active={view === "slipping"}
                icon={WarningIcon}
                label="Slipping Deals"
                onClick={() => onView("slipping")}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pipelines</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {PIPELINES.map((pipeline) => (
                <SidebarMenuItem key={pipeline.label}>
                  <SidebarMenuButton tooltip={pipeline.label}>
                    <span
                      className={`size-2 shrink-0 rounded-full ${pipeline.className}`}
                    />
                    <span>{pipeline.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Invite Teammates">
              <UserPlusIcon />
              <span>Invite Teammates</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help">
              <QuestionIcon />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/" />} tooltip="Design System">
              <span>Design System</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex flex-col gap-2 rounded-lg border bg-sidebar-accent p-3 group-data-[collapsible=icon]:hidden">
          <div>
            <p className="font-medium text-sm">14 Days</p>
            <p className="text-muted-foreground text-xs">Left on Trial</p>
          </div>
          <Button className="w-full" size="sm" variant="outline">
            <WalletIcon />
            Add Billing
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function NavButton({
  label,
  icon: Icon,
  active,
  count,
  onClick,
}: {
  label: string
  icon: React.ComponentType
  active?: boolean
  count?: number
  onClick: () => void
}): React.ReactElement {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton isActive={active} onClick={onClick} tooltip={label}>
        <Icon />
        <span>{label}</span>
      </SidebarMenuButton>
      {count !== undefined ? <SidebarMenuBadge>{count}</SidebarMenuBadge> : null}
    </SidebarMenuItem>
  )
}

function CompaniesView({
  visible,
  filters,
  onFilters,
  selectedIds,
  allSelected,
  someSelected,
  onToggle,
  onToggleAll,
  onOpen,
  onOpenOwner,
  onExport,
  onCreate,
}: {
  visible: Company[]
  filters: CompanyFilters
  onFilters: (filters: CompanyFilters) => void
  selectedIds: string[]
  allSelected: boolean
  someSelected: boolean
  onToggle: (id: string) => void
  onToggleAll: () => void
  onOpen: (id: string) => void
  onOpenOwner: (name: string) => void
  onExport: () => void
  onCreate: () => void
}): React.ReactElement {
  const pipeline = visible.reduce((sum, company) => sum + company.pipelineValue, 0)
  const avgWin = visible.length
    ? Math.round(
        visible.reduce((sum, company) => sum + company.winProbability, 0) /
          visible.length,
      )
    : 0
  const deals = visible.reduce((sum, company) => sum + company.openDeals, 0)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 px-4 py-3">
        <div className="flex min-w-0 flex-wrap gap-2">
          <FilterSelect
            items={SORT_ITEMS}
            label="Sort By"
            onValueChange={(sortBy) =>
              onFilters({ ...filters, sortBy: sortBy as SortKey })
            }
            value={filters.sortBy}
          />
          <FilterSelect
            items={OWNER_OPTIONS}
            label="Owner"
            onValueChange={(owner) => onFilters({ ...filters, owner })}
            value={filters.owner}
          />
          <FilterSelect
            items={STAGE_OPTIONS}
            label="Stage"
            onValueChange={(stage) => onFilters({ ...filters, stage })}
            value={filters.stage}
          />
          <FilterSelect
            items={ACTIVITY_OPTIONS}
            label="Last Activity"
            onValueChange={(value) =>
              onFilters({
                ...filters,
                activityWindow: Number(value) as ActivityWindow,
              })
            }
            value={String(filters.activityWindow)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onExport} size="sm" variant="outline">
            <ExportIcon />
            Export
          </Button>
          <Button onClick={onCreate} size="sm">
            <PlusIcon />
            New Company
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto border-t">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>
                <span className="flex items-center gap-3">
                  <Checkbox
                    aria-label="Select all companies"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={onToggleAll}
                  />
                  Companies
                </span>
              </TableHead>
              <TableHead>Segment & Stage</TableHead>
              <TableHead>Account Owner</TableHead>
              <TableHead className="text-end">Open Deals</TableHead>
              <TableHead className="text-end">Pipeline Value</TableHead>
              <TableHead>Win Probability</TableHead>
              <TableHead>Activity Trend</TableHead>
              <TableHead>Last Interaction</TableHead>
              <TableHead className="text-end">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((company) => (
              <CompanyRow
                company={company}
                key={company.id}
                onOpen={() => onOpen(company.id)}
                onOpenOwner={() => onOpenOwner(company.owner)}
                onToggle={() => onToggle(company.id)}
                selected={selectedIds.includes(company.id)}
              />
            ))}
            {visible.length === 0 ? (
              <TableRow>
                <TableCell className="py-10 text-center text-muted-foreground" colSpan={9}>
                  No companies match the current filters.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>

      <footer className="grid shrink-0 grid-cols-2 border-t sm:grid-cols-4">
        <FooterStat label="Companies in View" value={String(visible.length)} />
        <FooterStat label="Pipeline" value={`$${formatMoney(pipeline)}`} />
        <FooterStat label="Avg Win" value={`${avgWin}%`} />
        <FooterStat label="Open Deals" value={String(deals)} />
      </footer>
    </div>
  )
}

function FooterStat({
  label,
  value,
}: {
  label: string
  value: string
}): React.ReactElement {
  return (
    <div className="flex items-baseline gap-2 border-e border-b p-3 text-sm last:border-e-0 sm:border-b-0">
      <span className="font-medium tabular-nums">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}

function CompanyRow({
  company,
  selected,
  onToggle,
  onOpen,
  onOpenOwner,
}: {
  company: Company
  selected: boolean
  onToggle: () => void
  onOpen: () => void
  onOpenOwner: () => void
}): React.ReactElement {
  const { visible, hidden } = splitTags(company.tags)

  return (
    <TableRow
      className="cursor-pointer"
      data-state={selected ? "selected" : undefined}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === "Enter") onOpen()
      }}
      tabIndex={0}
    >
      <TableCell className="font-medium">
        <span className="flex items-center gap-3">
          <Checkbox
            aria-label={`Select ${company.name}`}
            checked={selected}
            onCheckedChange={onToggle}
            onClick={(event) => event.stopPropagation()}
          />
          {company.name}
        </span>
      </TableCell>
      <TableCell>
        <span className="flex items-center gap-1">
          {visible.map((tag) => (
            <Badge key={tag} variant={TAG_VARIANT[tag]}>
              {tag}
            </Badge>
          ))}
          {hidden > 0 ? <Badge variant="outline">+{hidden}</Badge> : null}
        </span>
      </TableCell>
      <TableCell onClick={(event) => event.stopPropagation()}>
        <Button
          aria-label={`Open ${company.owner} profile`}
          onClick={onOpenOwner}
          size="sm"
          variant="ghost"
        >
          <Avatar className="size-5">
            <AvatarFallback>{initials(company.owner)}</AvatarFallback>
          </Avatar>
          {company.owner}
        </Button>
      </TableCell>
      <TableCell className="text-end tabular-nums">{company.openDeals}</TableCell>
      <TableCell className="text-end tabular-nums">
        <span className="text-muted-foreground">$</span>
        {formatMoney(company.pipelineValue)}
      </TableCell>
      <TableCell>
        <span className="flex items-center gap-2">
          <Meter className="w-16 gap-0" value={company.winProbability}>
            <MeterTrack className="h-1.5">
              <MeterIndicator />
            </MeterTrack>
          </Meter>
          <span className="w-[4ch] text-end tabular-nums">
            {company.winProbability}%
          </span>
        </span>
      </TableCell>
      <TableCell>
        <Sparkline values={company.trend} />
      </TableCell>
      <TableCell>
        <span className="flex items-center gap-1.5">
          <CalendarBlankIcon className="size-3.5" />
          <span className="tabular-nums">{formatDate(company.lastInteraction.date)}</span>
          <span aria-hidden className="mx-0.5 h-2 w-px bg-border" />
          {company.lastInteraction.label}
        </span>
      </TableCell>
      <TableCell className="text-end" onClick={(event) => event.stopPropagation()}>
        <Menu>
          <MenuTrigger
            aria-label={`Actions for ${company.name}`}
            render={<Button size="icon-xs" variant="ghost" />}
          >
            <DotsThreeIcon />
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuItem onClick={onOpen}>Open Details</MenuItem>
            <MenuItem onClick={onOpenOwner}>View Owner</MenuItem>
          </MenuPopup>
        </Menu>
      </TableCell>
    </TableRow>
  )
}

function DealsBoard({
  companies,
  onOpen,
}: {
  companies: Company[]
  onOpen: (id: string) => void
}): React.ReactElement {
  return (
    <div className="flex min-h-0 flex-1 gap-3 overflow-x-auto p-4">
      {STAGES.map((stage) => {
        const column = companies.filter((company) => stageOf(company) === stage)
        return (
          <section className="flex w-72 shrink-0 flex-col gap-2" key={stage}>
            <header className="flex items-center justify-between gap-2 px-1">
              <h2 className="font-medium text-sm">{stage}</h2>
              <Badge variant="outline">{column.length}</Badge>
            </header>
            <div className="flex flex-col gap-2">
              {column.map((company) => (
                <Card
                  className="gap-2 p-3 text-start [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent/40"
                  key={company.id}
                  onClick={() => onOpen(company.id)}
                  render={<button type="button" />}
                >
                  <span className="font-medium">{company.name}</span>
                  <span className="text-muted-foreground text-sm">{company.owner}</span>
                  <span className="flex items-center justify-between gap-2 text-sm tabular-nums">
                    <span>${formatMoney(company.pipelineValue)}</span>
                    <span>{company.winProbability}%</span>
                  </span>
                </Card>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}

function ForecastView({ companies }: { companies: Company[] }): React.ReactElement {
  const pipeline = companies.reduce((sum, company) => sum + company.pipelineValue, 0)
  const weighted = companies.reduce(
    (sum, company) => sum + company.pipelineValue * (company.winProbability / 100),
    0,
  )
  const deals = companies.reduce((sum, company) => sum + company.openDeals, 0)
  const avgWin = companies.length
    ? Math.round(
        companies.reduce((sum, company) => sum + company.winProbability, 0) /
          companies.length,
      )
    : 0
  const top = [...companies]
    .sort((a, b) => b.pipelineValue - a.pipelineValue)
    .slice(0, 5)

  const stats = [
    { label: "Pipeline", value: `$${formatMoney(pipeline)}` },
    { label: "Weighted", value: `$${formatMoney(Math.round(weighted))}` },
    { label: "Open Deals", value: String(deals) },
    { label: "Avg Win", value: `${avgWin}%` },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-4">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="font-heading text-3xl tabular-nums">
                {stat.value}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>
      <Card>
        <CardHeader>
          <CardTitle>Largest Accounts</CardTitle>
          <CardDescription>Top pipeline value across the book.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-end">Pipeline</TableHead>
                <TableHead className="text-end">Win</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {top.map((company) => (
                <TableRow key={company.id}>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.owner}</TableCell>
                  <TableCell className="text-end tabular-nums">
                    ${formatMoney(company.pipelineValue)}
                  </TableCell>
                  <TableCell className="text-end tabular-nums">
                    {company.winProbability}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function PlaceholderView({ title }: { title: string }): React.ReactElement {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BuildingsIcon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          This section is in the sales CRM navigation. Companies, Deals, and Forecast
          are the working views.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
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

function Sparkline({ values }: { values: number[] }): React.ReactElement {
  const width = 72
  const height = 22
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width
      const y = height - ((value - min) / span) * (height - 4) - 2
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      aria-hidden
      className="text-primary"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <polyline
        fill="none"
        points={points}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function NotificationsMenu({
  items,
  onChange,
  onOpenCompany,
}: {
  items: Notification[]
  onChange: (items: Notification[]) => void
  onOpenCompany: (id: string) => void
}): React.ReactElement {
  const [filter, setFilter] = React.useState<"all" | "unread">("all")
  const unread = items.filter((item) => item.unread).length
  const visible = items.filter((item) => filter === "all" || item.unread)

  return (
    <Popover>
      <PopoverTrigger
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
        render={<Button size="icon" variant="outline" />}
      >
        <BellIcon />
        {unread > 0 ? (
          <span className="absolute end-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
        ) : null}
      </PopoverTrigger>
      <PopoverPopup align="end" className="w-96">
        <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm">Notifications</p>
            {unread > 0 ? <Badge>{unread}</Badge> : null}
          </div>
          <Button
            disabled={unread === 0}
            onClick={() =>
              onChange(items.map((item) => ({ ...item, unread: false })))
            }
            size="xs"
            variant="ghost"
          >
            Mark All Read
          </Button>
        </div>
        <Tabs onValueChange={(next) => setFilter(next as "all" | "unread")} value={filter}>
          <TabsList className="px-3" variant="underline">
            <TabsTab value="all">All</TabsTab>
            <TabsTab value="unread">Unread</TabsTab>
          </TabsList>
        </Tabs>
        <ul className="max-h-80 overflow-auto">
          {visible.length === 0 ? (
            <li className="px-3 py-6 text-center text-muted-foreground text-sm">
              No unread notifications.
            </li>
          ) : (
            visible.map((item) => (
              <li key={item.id}>
                <button
                  className="flex w-full flex-col gap-1 px-3 py-2 text-start text-sm focus-visible:bg-accent focus-visible:outline-none [@media(hover:hover)_and_(pointer:fine)]:hover:bg-accent"
                  onClick={() => {
                    onChange(
                      items.map((current) =>
                        current.id === item.id ? { ...current, unread: false } : current,
                      ),
                    )
                    onOpenCompany(item.companyId)
                  }}
                  type="button"
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className={item.unread ? "font-medium" : undefined}>
                      {item.message}
                    </span>
                    <span className="shrink-0 text-muted-foreground text-xs">
                      {item.time}
                    </span>
                  </span>
                  {item.quote ? (
                    <span className="text-muted-foreground">{item.quote}</span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </PopoverPopup>
    </Popover>
  )
}

function CompanySearch({
  open,
  onOpenChange,
  companies,
  onOpen,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  companies: Company[]
  onOpen: (id: string) => void
}): React.ReactElement {
  const items = companies.map((company) => ({
    label: company.name,
    value: company.id,
  }))

  return (
    <CommandDialog onOpenChange={onOpenChange} open={open}>
      <CommandDialogPopup>
        <Command items={items}>
          <CommandInput placeholder="Search companies" />
          <CommandEmpty>No companies match.</CommandEmpty>
          <CommandList>
            {(item: { label: string; value: string }) => (
              <CommandItem
                key={item.value}
                onClick={() => {
                  onOpen(item.value)
                  onOpenChange(false)
                }}
                value={item}
              >
                {item.label}
              </CommandItem>
            )}
          </CommandList>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  )
}

function CompanyDetail({
  company,
  open,
  onOpenChange,
  onOpenOwner,
}: {
  company: Company | undefined
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenOwner: (name: string) => void
}): React.ReactElement {
  const [trendWindow, setTrendWindow] = React.useState<TrendWindow>("Last 30 Days")
  const owner = company ? ownerByName(company.owner) : undefined
  const health = company ? companyHealth(company) : undefined
  const activity = company ? companyActivity(company) : undefined
  const trend = company ? trendForWindow(company.trend, trendWindow) : []

  const stages = health
    ? [
        { label: "Discovery", value: health.discovery, className: "bg-destructive" },
        { label: "Evaluation", value: health.evaluation, className: "bg-warning" },
        { label: "Procurement", value: health.procurement, className: "bg-success" },
      ]
    : []

  const stats = activity
    ? [
        { icon: CursorClickIcon, label: "Total Touches", value: activity.touches },
        { icon: EnvelopeSimpleIcon, label: "Emails", value: activity.emails },
        { icon: CalendarBlankIcon, label: "Meetings", value: activity.meetings },
        { icon: PhoneIcon, label: "Calls & Notes", value: activity.calls },
      ]
    : []

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetPopup className="max-w-xl">
        <SheetHeader>
          <SheetTitle>Company Detail</SheetTitle>
          <SheetDescription>
            Account summary, pipeline health, activity, and score cards.
          </SheetDescription>
        </SheetHeader>
        {company && owner ? (
          <SheetPanel className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <Avatar className="size-12 rounded-xl text-base">
                <AvatarFallback>{company.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col gap-2">
                <h2 className="truncate font-heading text-xl font-semibold">
                  {company.name}
                </h2>
                <div className="flex flex-wrap gap-1">
                  {company.tags.map((tag) => (
                    <Badge key={tag} variant={TAG_VARIANT[tag]}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <section className="flex flex-col gap-2">
              <h3 className="font-medium text-sm">Account Summary</h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <Button
                  aria-label={`Open ${owner.name} profile`}
                  onClick={() => onOpenOwner(owner.name)}
                  size="sm"
                  variant="ghost"
                >
                  <Avatar className="size-5">
                    <AvatarFallback>{initials(owner.name)}</AvatarFallback>
                  </Avatar>
                  {owner.name}
                </Button>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <EnvelopeSimpleIcon className="size-3.5" />
                  {owner.email}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <PhoneIcon className="size-3.5" />
                  {owner.phone}
                </span>
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <h3 className="font-medium text-sm">Pipeline Health</h3>
              <p className="font-heading text-3xl font-semibold tabular-nums">
                {company.winProbability}%
              </p>
              <p className="text-muted-foreground text-sm">
                Win probability across all open deals
              </p>
              {stages.map((stage) => (
                <Progress key={stage.label} value={stage.value}>
                  <div className="flex items-center justify-between gap-2">
                    <ProgressLabel>{stage.label}</ProgressLabel>
                    <ProgressValue />
                  </div>
                  <ProgressTrack>
                    <ProgressIndicator className={stage.className} />
                  </ProgressTrack>
                </Progress>
              ))}
            </section>

            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium text-sm">Activity Trend</h3>
                <FilterSelect
                  items={TREND_WINDOWS.map((window) => ({
                    label: window,
                    value: window,
                  }))}
                  label="Window"
                  onValueChange={(next) => setTrendWindow(next as TrendWindow)}
                  value={trendWindow}
                />
              </div>
              <div className="flex items-end gap-2">
                <span className="font-heading text-2xl tabular-nums">
                  {activity?.total}
                </span>
                <Sparkline values={trend} />
              </div>
              <p className="text-muted-foreground text-sm">
                Spikes around QBR prep and renewal review
              </p>
              <div className="grid grid-cols-2 gap-2">
                {stats.map((stat) => (
                  <div className="flex flex-col gap-2 rounded-xl border p-3" key={stat.label}>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs">
                      <stat.icon className="size-3.5" />
                      {stat.label}
                    </span>
                    <span className="font-medium tabular-nums">{stat.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="font-medium text-sm">Score Card</h3>
              {SCORE_CARDS.map((card) => (
                <ScoreCardView card={card} key={card.title} />
              ))}
            </section>
          </SheetPanel>
        ) : null}
        <SheetFooter className="sm:justify-between">
          <Button
            render={<a href="mailto:sales@crm.example" />}
            variant="link"
          >
            Need Help? Ask Us.
          </Button>
          <div className="flex items-center gap-2">
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Cancel
            </Button>
            <Button
              onClick={() => {
                toastManager.add({
                  title: "Update Saved",
                  description: company ? `${company.name} is up to date.` : "Saved.",
                  type: "success",
                })
                onOpenChange(false)
              }}
            >
              Save Update
            </Button>
          </div>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}

function ScoreCardView({ card }: { card: ScoreCard }): React.ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{card.title}</CardTitle>
        <CardDescription>{card.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="flex items-center gap-2">
          <Avatar className="size-5">
            <AvatarFallback>{initials(card.reviewer)}</AvatarFallback>
          </Avatar>
          {card.reviewer}
          <span className="flex items-center gap-1 text-muted-foreground">
            <ClockIcon className="size-3.5" />
            {card.updated}
          </span>
        </span>
        <span className="flex items-center gap-1">
          {card.verdict}
          <span aria-label={`${card.stars} out of 5 stars`} className="flex" role="img">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon
                className="size-3.5"
                key={index}
                weight={index < card.stars ? "fill" : "regular"}
              />
            ))}
          </span>
        </span>
      </CardContent>
    </Card>
  )
}

function OwnerProfile({
  owner,
  companies,
  open,
  onOpenChange,
  onOpenCompany,
  onShowAccounts,
}: {
  owner: ReturnType<typeof ownerByName> | undefined
  companies: Company[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenCompany: (id: string) => void
  onShowAccounts: (name: string) => void
}): React.ReactElement {
  const isCurrent = owner?.name === CURRENT_USER.name
  const accounts = owner
    ? companies
        .filter((company) => isCurrent || company.owner === owner.name)
        .sort((a, b) => b.pipelineValue - a.pipelineValue)
    : []
  const openDeals = accounts.reduce((sum, company) => sum + company.openDeals, 0)
  const pipeline = accounts.reduce((sum, company) => sum + company.pipelineValue, 0)
  const avgWin = accounts.length
    ? Math.round(
        accounts.reduce((sum, company) => sum + company.winProbability, 0) /
          accounts.length,
      )
    : 0

  return (
    <Sheet onOpenChange={onOpenChange} open={open}>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>{isCurrent ? "My Profile" : "Owner Profile"}</SheetTitle>
          <SheetDescription>
            Contact details, pipeline summary, and assigned accounts.
          </SheetDescription>
        </SheetHeader>
        {owner ? (
          <SheetPanel className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Avatar className="size-12">
                <AvatarFallback>{initials(owner.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-heading text-lg font-semibold">{owner.name}</h2>
                <p className="text-muted-foreground text-sm">{owner.role}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <EnvelopeSimpleIcon className="size-3.5" />
                {owner.email}
              </span>
              <span className="flex items-center gap-1">
                <PhoneIcon className="size-3.5" />
                {owner.phone}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Accounts", value: String(accounts.length) },
                { label: "Open Deals", value: String(openDeals) },
                { label: "Pipeline", value: `$${formatMoney(pipeline)}` },
                { label: "Avg Win", value: `${avgWin}%` },
              ].map((stat) => (
                <div className="rounded-xl border p-3" key={stat.label}>
                  <p className="text-muted-foreground text-xs">{stat.label}</p>
                  <p className="font-medium tabular-nums">{stat.value}</p>
                </div>
              ))}
            </div>
            <section className="flex flex-col gap-1">
              <h3 className="font-medium text-sm">Accounts</h3>
              {accounts.map((company) => (
                <Button
                  className="justify-between"
                  key={company.id}
                  onClick={() => onOpenCompany(company.id)}
                  variant="ghost"
                >
                  <span>{company.name}</span>
                  <span className="text-muted-foreground tabular-nums">
                    ${formatMoney(company.pipelineValue)}
                  </span>
                </Button>
              ))}
              {accounts.length === 0 ? (
                <p className="text-muted-foreground text-sm">No assigned accounts.</p>
              ) : null}
            </section>
          </SheetPanel>
        ) : null}
        <SheetFooter>
          {owner && !isCurrent ? (
            <Button onClick={() => onShowAccounts(owner.name)} variant="outline">
              Show Accounts
            </Button>
          ) : null}
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  )
}

function NewCompanyDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (company: Company) => void
}): React.ReactElement {
  const [name, setName] = React.useState("")
  const [segment, setSegment] = React.useState<string>(SEGMENTS[0])
  const [stage, setStage] = React.useState<Stage>(STAGES[0])
  const [owner, setOwner] = React.useState(OWNERS[0].name)
  const [pipelineValue, setPipelineValue] = React.useState("")
  const [openDeals, setOpenDeals] = React.useState("1")
  const [winProbability, setWinProbability] = React.useState(50)
  const [interaction, setInteraction] = React.useState("Demo")
  const [nameError, setNameError] = React.useState(false)

  function reset() {
    setName("")
    setSegment(SEGMENTS[0])
    setStage(STAGES[0])
    setOwner(OWNERS[0].name)
    setPipelineValue("")
    setOpenDeals("1")
    setWinProbability(50)
    setInteraction("Demo")
    setNameError(false)
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setNameError(true)
      return
    }
    const tags: Tag[] = segment === stage ? [stage] : [segment as Tag, stage]
    onCreate({
      id: `${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      name: trimmed,
      tags,
      owner,
      openDeals: Math.max(0, Math.round(Number(openDeals) || 0)),
      pipelineValue: Math.max(0, Math.round(Number(pipelineValue) || 0)),
      winProbability,
      trend: DEFAULT_TREND,
      lastInteraction: { date: TODAY, label: interaction },
      activityDays: daysSince(TODAY),
    })
    reset()
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
          <DialogTitle>New Company</DialogTitle>
          <DialogDescription>
            Add an account to the pipeline. It shows up at the top of the list.
          </DialogDescription>
        </DialogHeader>
        <form className="flex min-h-0 flex-col" onSubmit={submit}>
          <DialogPanel className="flex flex-col gap-4">
            <Field name="company-name">
              <FieldLabel>Company Name</FieldLabel>
              <Input
                aria-invalid={nameError || undefined}
                onChange={(event) => {
                  setName(event.target.value)
                  setNameError(false)
                }}
                value={name}
              />
              {nameError ? <FieldError>Enter a company name.</FieldError> : null}
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="segment">
                <FieldLabel>Segment</FieldLabel>
                <FilterSelect
                  className="w-full"
                  items={SEGMENTS.map((item) => ({ label: item, value: item }))}
                  label="Segment"
                  onValueChange={setSegment}
                  showLabel={false}
                  value={segment}
                />
              </Field>
              <Field name="stage">
                <FieldLabel>Stage</FieldLabel>
                <FilterSelect
                  className="w-full"
                  items={STAGES.map((item) => ({ label: item, value: item }))}
                  label="Stage"
                  onValueChange={(next) => setStage(next as Stage)}
                  showLabel={false}
                  value={stage}
                />
              </Field>
            </div>
            <Field name="owner">
              <FieldLabel>Account Owner</FieldLabel>
              <FilterSelect
                className="w-full"
                items={OWNERS.map((item) => ({ label: item.name, value: item.name }))}
                label="Owner"
                onValueChange={setOwner}
                showLabel={false}
                value={owner}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="pipeline">
                <FieldLabel>Pipeline Value</FieldLabel>
                <Input
                  inputMode="numeric"
                  onChange={(event) => setPipelineValue(event.target.value)}
                  value={pipelineValue}
                />
              </Field>
              <Field name="deals">
                <FieldLabel>Open Deals</FieldLabel>
                <Input
                  inputMode="numeric"
                  onChange={(event) => setOpenDeals(event.target.value)}
                  value={openDeals}
                />
              </Field>
            </div>
            <Field name="win">
              <FieldLabel>Win Probability</FieldLabel>
              <div className="flex w-full items-center gap-3">
                <Slider
                  max={100}
                  min={0}
                  onValueChange={(next) => {
                    const value = Array.isArray(next) ? next[0] : next
                    setWinProbability(value ?? 0)
                  }}
                  value={winProbability}
                />
                <span className="w-10 text-end text-sm tabular-nums">
                  {winProbability}%
                </span>
              </div>
            </Field>
            <Field name="interaction">
              <FieldLabel>Last Interaction</FieldLabel>
              <FilterSelect
                className="w-full"
                items={["Demo", "Discovery", "Pricing", "QBR Call", "Security"].map(
                  (item) => ({ label: item, value: item }),
                )}
                label="Type"
                onValueChange={setInteraction}
                showLabel={false}
                value={interaction}
              />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Add Company</Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}
