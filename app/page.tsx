"use client"

import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Autocomplete, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@/components/ui/autocomplete"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@/components/ui/combobox"
import { Command, CommandDialog, CommandDialogPopup, CommandDialogTrigger, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu"
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field"
import { Radio, RadioGroup } from "@/components/ui/radio-group"
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider, SliderValue } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ThemeSelector } from "@/components/theme-selector"
import Link from "next/link"
import { useState, type ReactNode } from "react"
import { CheckCircleIcon, EnvelopeIcon, HouseIcon, InfoIcon, MagnifyingGlassIcon, PlusCircleIcon, SlidersIcon, WarningCircleIcon, WarningIcon, XIcon } from "@phosphor-icons/react"

const accordionItems = [
  {
    content:
      "COSS UI is built on Base UI primitives and styled with Tailwind CSS v4.",
    id: "what-is-coss",
    title: "What is COSS UI?",
  },
  {
    content:
      "Browse particles at coss.com/ui/particles or add components with the CLI.",
    id: "getting-started",
    title: "How do I get started?",
  },
  {
    content: "Yes — COSS UI is open source and free to use in your projects.",
    id: "open-source",
    title: "Can I use it commercially?",
  },
]

const fruitItems = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Grape", value: "grape" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Kiwi", value: "kiwi" },
]

const frameworkItems = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
  { label: "Remix", value: "remix" },
]

const timezoneItems = [
  { label: "Pacific (PT)", value: "pt" },
  { label: "Mountain (MT)", value: "mt" },
  { label: "Central (CT)", value: "ct" },
  { label: "Eastern (ET)", value: "et" },
]

const commandItems = [
  { label: "Documentation", value: "docs" },
  { label: "Settings", value: "settings" },
  { label: "Profile", value: "profile" },
]

const showcaseCard = "h-full"
const showcaseCardPanel = "flex flex-1 flex-col gap-4"

function ButtonSection({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2">
      <p className="font-medium text-muted-foreground text-xs">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

export default function Page() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())

  return (
    <div className="min-h-svh p-4">
      <header className="mb-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            COSS UI Test App
          </h1>
          <p className="text-muted-foreground">
            A minimal showcase to validate components, tokens, and fonts locally.
          </p>
          <p className="text-muted-foreground text-sm">
            Use the theme selector or press <Kbd>d</Kbd> to switch modes and{" "}
            <Kbd>p</Kbd> for preset.
          </p>
        </div>
        <ThemeSelector />
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Accordion</CardTitle>
          <CardDescription>Expandable sections for FAQs and nested content.</CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Accordion>
            {accordionItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionPanel>{item.content}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Alert</CardTitle>
          <CardDescription>Inline status messages with semantic variants.</CardDescription>
        </CardHeader>
        <CardPanel className={`${showcaseCardPanel} space-y-2`}>
          <Alert variant="info">
            <InfoIcon aria-hidden="true" />
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              A new component release is available.
            </AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircleIcon aria-hidden="true" />
            <AlertTitle>Changes saved</AlertTitle>
            <AlertDescription>
              Your preferences were updated successfully.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <WarningIcon aria-hidden="true" />
            <AlertTitle>Storage almost full</AlertTitle>
            <AlertDescription>
              Free up space or upgrade your plan to avoid interruptions.
            </AlertDescription>
          </Alert>
          <Alert variant="error">
            <WarningCircleIcon aria-hidden="true" />
            <AlertTitle>Upload failed</AlertTitle>
            <AlertDescription>
              The file could not be uploaded. Try again in a few minutes.
            </AlertDescription>
          </Alert>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Alert dialog</CardTitle>
          <CardDescription>Confirmation modal for destructive actions.</CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive-outline" />}>
              Delete project
            </AlertDialogTrigger>
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All files and settings will be
                  permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose render={<Button variant="outline" />}>
                  Cancel
                </AlertDialogClose>
                <AlertDialogClose render={<Button variant="destructive" />}>
                  Delete
                </AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Autocomplete</CardTitle>
          <CardDescription>Searchable combobox with filtered suggestions.</CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Autocomplete items={fruitItems}>
            <AutocompleteInput
              aria-label="Search fruits"
              placeholder="Search fruits…"
            />
            <AutocompletePopup>
              <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
              <AutocompleteList>
                {(item) => (
                  <AutocompleteItem key={item.value} value={item}>
                    {item.label}
                  </AutocompleteItem>
                )}
              </AutocompleteList>
            </AutocompletePopup>
          </Autocomplete>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            Image with fallback initials, sizes, and stacked groups.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <ButtonSection label="Default">
            <Avatar>
              <AvatarImage
                alt="COSS UI"
                src="https://github.com/cosscom.png"
              />
              <AvatarFallback>CO</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
          </ButtonSection>

          <ButtonSection label="Sizes">
            <Avatar className="size-6">
              <AvatarFallback className="text-[10px]">SM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <Avatar className="size-12">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
          </ButtonSection>

          <ButtonSection label="Group">
            <div className="flex -space-x-2">
              <Avatar className="ring-2 ring-background">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="ring-2 ring-background">
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Avatar className="ring-2 ring-background">
                <AvatarFallback>C</AvatarFallback>
              </Avatar>
            </div>
          </ButtonSection>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>
            Variants, sizes, icons, and composition patterns.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <ButtonSection label="Variants">
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </ButtonSection>

          <ButtonSection label="Sizes">
            <Badge size="sm" variant="outline">Small</Badge>
            <Badge variant="outline">Default</Badge>
            <Badge size="lg" variant="outline">Large</Badge>
          </ButtonSection>

          <ButtonSection label="With icon">
            <Badge variant="outline">
              <CheckCircleIcon aria-hidden="true" />
              Verified
            </Badge>
            <Badge variant="success">
              <CheckCircleIcon aria-hidden="true" />
              Paid
            </Badge>
          </ButtonSection>

          <ButtonSection label="Composition">
            <Badge className="rounded-full" variant="secondary">
              Pill
            </Badge>
            <Badge render={<a href="#" />} variant="outline">
              Link
            </Badge>
            <Button variant="outline">
              Messages
              <Badge className="-me-1" variant="outline">
                18
              </Badge>
            </Button>
          </ButtonSection>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Breadcrumb</CardTitle>
          <CardDescription>
            Hierarchy trails with ellipsis, icons, and custom separators.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <ButtonSection label="Default">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="#" />}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <Menu>
                    <MenuTrigger
                      render={
                        <Button
                          className="-m-1.5 text-muted-foreground"
                          size="icon-sm"
                          variant="ghost"
                        />
                      }
                    >
                      <BreadcrumbEllipsis />
                    </MenuTrigger>
                    <MenuPopup align="start">
                      <MenuItem render={<Link href="#" />}>Docs</MenuItem>
                      <MenuItem render={<Link href="#" />}>Particles</MenuItem>
                    </MenuPopup>
                  </Menu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="#" />}>Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ButtonSection>

          <ButtonSection label="Icon home">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink aria-label="Home" href="#">
                    <HouseIcon aria-hidden="true" className="size-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ButtonSection>

          <ButtonSection label="Custom separator">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </ButtonSection>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Variants, sizes, icons, loading, and composition patterns.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <ButtonSection label="Variants">
            <Button>Primary</Button>
            <Button variant="primary-outline">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="destructive-outline">Destructive</Button>
          </ButtonSection>

          <ButtonSection label="Sizes">
            <Button variant="outline" size="xs">Extra small</Button>
            <Button variant="outline" size="sm">Small</Button>
            <Button variant="outline">Default</Button>
            <Button variant="outline" size="lg">Large</Button>
            <Button variant="outline" size="xl">Extra large</Button>
          </ButtonSection>

          <ButtonSection label="With icon">
            <Button>
              <PlusCircleIcon aria-hidden="true" />
              Add item
            </Button>
            <Button variant="outline">
              <SlidersIcon aria-hidden="true" />
              Settings
            </Button>
          </ButtonSection>

          <ButtonSection label="Icon only">
            <Button aria-label="Settings" size="icon-xs" variant="ghost">
              <SlidersIcon aria-hidden="true" />
            </Button>
            <Button aria-label="Settings" size="icon-sm" variant="outline">
              <SlidersIcon aria-hidden="true" />
            </Button>
            <Button aria-label="Settings" size="icon" variant="outline">
              <SlidersIcon aria-hidden="true" />
            </Button>
            <Button aria-label="Close" size="icon-lg" variant="ghost">
              <XIcon aria-hidden="true" />
            </Button>
          </ButtonSection>

          <ButtonSection label="States">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled outline
            </Button>
          </ButtonSection>

          <ButtonSection label="As link">
            <Button
              render={<a href="https://coss.com/ui" target="_blank" rel="noreferrer" />}
              variant="link"
            >
              Visit docs
            </Button>
          </ButtonSection>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Date picker grid built on react-day-picker.</CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Calendar
            mode="single"
            selected={calendarDate}
            onSelect={setCalendarDate}
          />
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Card</CardTitle>
          <CardDescription>
            Structured surface with header, panel, footer, and action slots.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Card>
            <CardHeader>
              <CardTitle>Project status</CardTitle>
              <CardDescription>
                Deployments and activity for your workspace.
              </CardDescription>
              <CardAction>
                <Button size="sm" variant="outline">
                  View all
                </Button>
              </CardAction>
            </CardHeader>
            <CardPanel className="text-sm">
              Last deploy completed 2 hours ago. All checks passed.
            </CardPanel>
            <CardFooter className="text-muted-foreground text-xs">
              Updated just now
            </CardFooter>
          </Card>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Checkbox</CardTitle>
          <CardDescription>
            Single boolean controls with linked labels and disabled state.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <div className="flex items-start gap-2">
            <Checkbox defaultChecked id="accept-terms" />
            <div className="flex flex-col gap-1">
              <Label htmlFor="accept-terms">Accept terms and conditions</Label>
              <p className="text-muted-foreground text-xs">
                Checkbox with linked label for screen reader testing.
              </p>
            </div>
          </div>

          <Label className="flex items-center gap-2 opacity-64">
            <Checkbox disabled />
            Disabled checkbox
          </Label>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Checkbox group</CardTitle>
          <CardDescription>
            Multi-select options grouped inside a fieldset.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Field name="interests">
            <Fieldset>
              <FieldsetLegend>Interests</FieldsetLegend>
              <FieldDescription className="mb-3">
                Select all topics that apply.
              </FieldDescription>
              <CheckboxGroup
                aria-label="Interests"
                defaultValue={["design", "a11y"]}
              >
                <Label className="flex items-center gap-2">
                  <Checkbox value="design" />
                  Design systems
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox value="a11y" />
                  Accessibility
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox value="perf" />
                  Performance
                </Label>
                <Label className="flex items-center gap-2 opacity-64">
                  <Checkbox value="legacy" disabled />
                  Legacy (disabled)
                </Label>
              </CheckboxGroup>
            </Fieldset>
          </Field>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Collapsible</CardTitle>
          <CardDescription>Progressive disclosure for optional content.</CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Collapsible defaultOpen>
            <CollapsibleTrigger render={<Button variant="outline" className="w-full justify-between" />}>
              Billing details
              <PlusCircleIcon aria-hidden="true" className="size-4" />
            </CollapsibleTrigger>
            <CollapsiblePanel className="pt-3 text-muted-foreground text-sm">
              Your next invoice will be issued on the 1st of each month. Payment
              methods can be updated in account settings.
            </CollapsiblePanel>
          </Collapsible>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Combobox</CardTitle>
          <CardDescription>Searchable selection with filtered suggestions.</CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Combobox items={fruitItems}>
            <ComboboxInput
              aria-label="Search fruits"
              placeholder="Select a fruit…"
            />
            <ComboboxPopup>
              <ComboboxEmpty>No fruits found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.value} value={item}>
                    {item.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxPopup>
          </Combobox>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Command</CardTitle>
          <CardDescription>
            Keyboard-navigable command palette in a dialog overlay.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <CommandDialog>
            <CommandDialogTrigger render={<Button variant="outline" />}>
              Open command palette
            </CommandDialogTrigger>
            <CommandDialogPopup>
              <Command items={commandItems}>
                <CommandInput placeholder="Search commands…" />
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandList>
                  {(item) => (
                    <CommandItem key={item.value} value={item.value}>
                      {item.label}
                    </CommandItem>
                  )}
                </CommandList>
              </Command>
            </CommandDialogPopup>
          </CommandDialog>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Dialog</CardTitle>
          <CardDescription>
            Modal with heading font (<code className="font-mono text-xs">--font-heading</code>).
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              Open dialog
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>COSS UI Dialog</DialogTitle>
                <DialogDescription>
                  If you can read this, the dialog primitive is working.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Radio &amp; switch</CardTitle>
          <CardDescription>
            Radio groups and switches for single-choice and boolean input.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Field name="plan">
            <FieldLabel>Billing plan</FieldLabel>
            <RadioGroup defaultValue="pro">
              <Label className="flex items-center gap-2">
                <Radio value="free" />
                Free — $0/mo
              </Label>
              <Label className="flex items-center gap-2">
                <Radio value="pro" />
                Pro — $12/mo
              </Label>
              <Label className="flex items-center gap-2">
                <Radio value="team" />
                Team — $29/mo
              </Label>
            </RadioGroup>
          </Field>

          <Separator />

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Switch defaultChecked />
              Email notifications
            </Label>

            <Label className="flex items-center gap-2 opacity-64">
              <Switch disabled />
              Disabled switch
            </Label>
          </div>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Input groups</CardTitle>
          <CardDescription>
            Inputs with inline addons for icons, prefixes, and suffixes.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Field name="email-group">
            <FieldLabel>Email with icon</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <EnvelopeIcon />
              </InputGroupAddon>
              <InputGroupInput
                type="email"
                placeholder="name@company.com"
              />
            </InputGroup>
          </Field>

          <Field name="domain">
            <FieldLabel>Website</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="example.com" />
            </InputGroup>
          </Field>

          <Field name="search-group">
            <FieldLabel>Search with suffix</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <MagnifyingGlassIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search…" type="search" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>⌘K</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Range &amp; numeric</CardTitle>
          <CardDescription>
            Sliders and number fields for continuous and stepped values.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Field name="volume">
            <FieldLabel>Volume</FieldLabel>
            <Slider defaultValue={40} max={100} step={1}>
              <SliderValue className="mb-2 flex justify-end text-sm" />
            </Slider>
            <FieldDescription>
              Use arrow keys to adjust when focused.
            </FieldDescription>
          </Field>

          <Field name="quantity">
            <FieldLabel>Quantity</FieldLabel>
            <NumberField defaultValue={3} min={0} max={99}>
              <NumberFieldGroup>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>
          </Field>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Select &amp; textarea</CardTitle>
          <CardDescription>
            Popup selection and multi-line text entry.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Field name="framework">
            <FieldLabel>Framework</FieldLabel>
            <Select items={frameworkItems} defaultValue={frameworkItems[0]}>
              <SelectTrigger>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectPopup>
                {frameworkItems.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item}
                    disabled={item.value === "remix"}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
            <FieldDescription>
              Remix is disabled to test unavailable options.
            </FieldDescription>
          </Field>

          <Field name="timezone">
            <FieldLabel>Timezone</FieldLabel>
            <Select items={timezoneItems}>
              <SelectTrigger size="sm">
                <SelectValue placeholder="Choose timezone" />
              </SelectTrigger>
              <SelectPopup>
                {timezoneItems.map((item) => (
                  <SelectItem key={item.value} value={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          </Field>

          <Field name="bio">
            <FieldLabel>Bio</FieldLabel>
            <Textarea placeholder="Tell us about yourself…" />
            <FieldDescription>Markdown is supported.</FieldDescription>
          </Field>

          <Field name="invalid-textarea">
            <FieldLabel>Notes (required)</FieldLabel>
            <Textarea aria-invalid placeholder="Add notes…" />
            <FieldError>This field is required.</FieldError>
          </Field>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>Interactive Base UI primitive.</CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-4 text-sm">
              COSS UI is built on Base UI and styled with Tailwind CSS v4.
            </TabsContent>
            <TabsContent value="details" className="pt-4 text-sm">
              This tab confirms panel switching works correctly.
            </TabsContent>
          </Tabs>
        </CardPanel>
      </Card>

      <Card className={showcaseCard}>
        <CardHeader>
          <CardTitle>Text inputs</CardTitle>
          <CardDescription>
            Default, sized, disabled, and invalid states with labels and helper
            text.
          </CardDescription>
        </CardHeader>
        <CardPanel className={showcaseCardPanel}>
          <Field name="name">
            <FieldLabel>Full name</FieldLabel>
            <Input type="text" placeholder="Jane Doe" autoComplete="name" />
            <FieldDescription>
              Shown on your public profile.
            </FieldDescription>
          </Field>

          <Field name="email-sm">
            <FieldLabel>Small</FieldLabel>
            <Input size="sm" type="email" placeholder="name@example.com" />
          </Field>
          <Field name="email-default">
            <FieldLabel>Default</FieldLabel>
            <Input type="email" placeholder="name@example.com" />
          </Field>
          <Field name="email-lg">
            <FieldLabel>Large</FieldLabel>
            <Input size="lg" type="email" placeholder="name@example.com" />
          </Field>

          <Field name="password">
            <FieldLabel>Password</FieldLabel>
            <Input
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </Field>
          <Field name="search">
            <FieldLabel>Search</FieldLabel>
            <Input type="search" placeholder="Search components…" />
          </Field>

          <Field name="disabled-input">
            <FieldLabel>Disabled</FieldLabel>
            <Input disabled defaultValue="Cannot edit this field" />
            <FieldDescription>
              Disabled inputs should remain readable but not interactive.
            </FieldDescription>
          </Field>
          <Field name="invalid-input">
            <FieldLabel>Invalid</FieldLabel>
            <Input
              aria-invalid
              defaultValue="not-an-email"
              type="email"
            />
            <FieldError>Please enter a valid email address.</FieldError>
          </Field>
        </CardPanel>
      </Card>
      </div>
    </div>
  )
}
