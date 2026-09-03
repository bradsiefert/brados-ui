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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Slider, SliderValue } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ColorScale } from "@/components/color-scale"
import { LibrarySidebar } from "@/components/library-sidebar"
import { InlineHeights } from "@/components/showcase/inline-heights"
import { InlineSizes } from "@/components/showcase/inline-sizes"
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

function ShowcaseSection({
  id,
  children,
}: {
  id: string
  children: ReactNode
}) {
  return (
    <section id={id} className="h-full scroll-mt-24">
      {children}
    </section>
  )
}

export default function Page() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(new Date())

  return (
    <SidebarProvider>
      <LibrarySidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b bg-background/85 px-4 py-3 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div>
              <h1 className="font-heading text-xl font-semibold tracking-tight">
                brados-ui
              </h1>
              <p className="text-muted-foreground text-sm">
                Personal design system — components &amp; color
              </p>
            </div>
          </div>
          <ThemeSelector />
        </header>

        <div className="flex flex-1 flex-col gap-10 p-4 md:p-6">
          <section id="colors" className="scroll-mt-24 space-y-4">
            <div className="space-y-1">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                Colors
              </h2>
              <p className="text-muted-foreground text-sm">
                Palette and semantic tokens in use. Press <Kbd>p</Kbd> to switch
                preset and <Kbd>d</Kbd> for light/dark.
              </p>
            </div>
            <ColorScale />
          </section>

          <section id="inline-heights" className="scroll-mt-24 space-y-4">
            <div className="space-y-1">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                Inline heights
              </h2>
              <p className="text-muted-foreground text-sm">
                Default-size controls that can sit on the same row. Measured
                height is shown under each sample.
              </p>
            </div>
            <InlineHeights />
          </section>

          <section id="sizes" className="scroll-mt-24 space-y-4">
            <div className="space-y-1">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                Sizes
              </h2>
              <p className="text-muted-foreground text-sm">
                Compare inline controls by desktop height. Token names are
                captions under each sample.
              </p>
            </div>
            <InlineSizes />
          </section>

          <section className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                Components
              </h2>
              <p className="text-muted-foreground text-sm">
                Every primitive rendered with the active theme. Use the sidebar
                to jump to a component.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <ShowcaseSection id="accordion">
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
              </ShowcaseSection>

              <ShowcaseSection id="alert">
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
              </ShowcaseSection>

              <ShowcaseSection id="alert-dialog">
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
              </ShowcaseSection>

              <ShowcaseSection id="autocomplete">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Autocomplete</CardTitle>
                    <CardDescription>Searchable combobox with filtered suggestions.</CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
                      <div className="w-64">
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
                    </div>
                    </ButtonSection>

                    <ButtonSection label="Sizes">
                      <div className="w-64">
                      <Autocomplete items={fruitItems}>
                        <AutocompleteInput
                          aria-label="Small fruit search"
                          placeholder="Small"
                          size="sm"
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
                    </div>
                      <div className="w-64">
                      <Autocomplete items={fruitItems}>
                        <AutocompleteInput
                          aria-label="Large fruit search"
                          placeholder="Large"
                          size="lg"
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
                    </div>
                    </ButtonSection>

                    <ButtonSection label="States">
                      <div className="w-64">
                      <Autocomplete items={fruitItems}>
                        <AutocompleteInput
                          aria-label="Disabled fruit search"
                          disabled
                          placeholder="Disabled"
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
                    </div>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="avatar">
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
              </ShowcaseSection>

              <ShowcaseSection id="badges">
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
              </ShowcaseSection>

              <ShowcaseSection id="breadcrumb">
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
              </ShowcaseSection>

              <ShowcaseSection id="buttons">
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
              </ShowcaseSection>

              <ShowcaseSection id="calendar">
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
              </ShowcaseSection>

              <ShowcaseSection id="card">
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
              </ShowcaseSection>

              <ShowcaseSection id="checkbox">
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
              </ShowcaseSection>

              <ShowcaseSection id="checkbox-group">
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
              </ShowcaseSection>

              <ShowcaseSection id="collapsible">
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
              </ShowcaseSection>

              <ShowcaseSection id="combobox">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Combobox</CardTitle>
                    <CardDescription>Searchable selection with filtered suggestions.</CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
                      <div className="w-64">
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
                    </div>
                    </ButtonSection>

                    <ButtonSection label="Sizes">
                      <div className="w-64">
                      <Combobox items={fruitItems}>
                        <ComboboxInput
                          aria-label="Small fruit select"
                          placeholder="Small"
                          size="sm"
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
                    </div>
                      <div className="w-64">
                      <Combobox items={fruitItems}>
                        <ComboboxInput
                          aria-label="Large fruit select"
                          placeholder="Large"
                          size="lg"
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
                    </div>
                    </ButtonSection>

                    <ButtonSection label="States">
                      <div className="w-64">
                      <Combobox items={fruitItems}>
                        <ComboboxInput
                          aria-label="Disabled fruit select"
                          disabled
                          placeholder="Disabled"
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
                    </div>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="command">
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
              </ShowcaseSection>

              <ShowcaseSection id="dialog">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Dialog</CardTitle>
                    <CardDescription>
                      Modal with heading font (<code className="font-mono text-xs">--font-heading</code>).
                    </CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
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
                    </ButtonSection>

                    <ButtonSection label="With footer">
                      <Dialog>
                        <DialogTrigger render={<Button />}>
                          Confirm changes
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Save changes?</DialogTitle>
                            <DialogDescription>
                              This will update your workspace settings.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose render={<Button variant="outline" />}>
                              Cancel
                            </DialogClose>
                            <DialogClose render={<Button />}>
                              Save
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="radio">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Radio</CardTitle>
                    <CardDescription>
                      Single-choice groups with linked labels and disabled options.
                    </CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
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
                    </ButtonSection>

                    <ButtonSection label="States">
                      <RadioGroup defaultValue="on" className="flex-row gap-4">
                        <Label className="flex items-center gap-2">
                          <Radio value="on" />
                          Enabled
                        </Label>
                        <Label className="flex items-center gap-2 opacity-64">
                          <Radio value="off" disabled />
                          Disabled
                        </Label>
                      </RadioGroup>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="switch">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Switch</CardTitle>
                    <CardDescription>
                      Immediate on/off preferences with default and disabled states.
                    </CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
                      <Label className="flex items-center gap-2">
                        <Switch defaultChecked />
                        Email notifications
                      </Label>
                      <Label className="flex items-center gap-2">
                        <Switch />
                        Weekly digest
                      </Label>
                    </ButtonSection>

                    <ButtonSection label="States">
                      <Label className="flex items-center gap-2 opacity-64">
                        <Switch disabled />
                        Disabled
                      </Label>
                      <Label className="flex items-center gap-2 opacity-64">
                        <Switch disabled defaultChecked />
                        Disabled on
                      </Label>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="input-groups">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Input groups</CardTitle>
                    <CardDescription>
                      Inputs with inline addons for icons, prefixes, and suffixes.
                    </CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Icon">
                      <Field name="email-group" className="w-72">
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
                    </ButtonSection>

                    <ButtonSection label="Prefix">
                      <Field name="domain" className="w-72">
                        <FieldLabel>Website</FieldLabel>
                        <InputGroup>
                          <InputGroupAddon align="inline-start">
                            <InputGroupText>https://</InputGroupText>
                          </InputGroupAddon>
                          <InputGroupInput placeholder="example.com" />
                        </InputGroup>
                      </Field>
                    </ButtonSection>

                    <ButtonSection label="Suffix">
                      <Field name="search-group" className="w-72">
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
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="slider">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Slider</CardTitle>
                    <CardDescription>
                      Continuous values with a value readout and disabled state.
                    </CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
                      <Field name="volume" className="w-64">
                        <FieldLabel>Volume</FieldLabel>
                        <Slider defaultValue={40} max={100} step={1}>
                          <SliderValue className="mb-2 flex justify-end text-sm" />
                        </Slider>
                        <FieldDescription>
                          Use arrow keys to adjust when focused.
                        </FieldDescription>
                      </Field>
                    </ButtonSection>

                    <ButtonSection label="States">
                      <Field name="volume-disabled" className="w-64">
                        <FieldLabel>Disabled</FieldLabel>
                        <Slider defaultValue={20} disabled max={100} step={1}>
                          <SliderValue className="mb-2 flex justify-end text-sm" />
                        </Slider>
                      </Field>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="number-field">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Number field</CardTitle>
                    <CardDescription>
                      Stepped numeric input with increment controls and sizes.
                    </CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
                      <NumberField defaultValue={3} min={0} max={99} className="w-40">
                        <NumberFieldGroup>
                          <NumberFieldDecrement />
                          <NumberFieldInput />
                          <NumberFieldIncrement />
                        </NumberFieldGroup>
                      </NumberField>
                    </ButtonSection>

                    <ButtonSection label="Sizes">
                      <NumberField defaultValue={3} min={0} max={99} size="sm" className="w-40">
                        <NumberFieldGroup>
                          <NumberFieldDecrement />
                          <NumberFieldInput />
                          <NumberFieldIncrement />
                        </NumberFieldGroup>
                      </NumberField>
                      <NumberField defaultValue={3} min={0} max={99} size="lg" className="w-40">
                        <NumberFieldGroup>
                          <NumberFieldDecrement />
                          <NumberFieldInput />
                          <NumberFieldIncrement />
                        </NumberFieldGroup>
                      </NumberField>
                    </ButtonSection>

                    <ButtonSection label="States">
                      <NumberField defaultValue={3} min={0} max={99} disabled className="w-40">
                        <NumberFieldGroup>
                          <NumberFieldDecrement />
                          <NumberFieldInput />
                          <NumberFieldIncrement />
                        </NumberFieldGroup>
                      </NumberField>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="select">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Select</CardTitle>
                    <CardDescription>
                      Popup selection with sizes, disabled items, and disabled trigger.
                    </CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
                      <Select items={frameworkItems} defaultValue={frameworkItems[0]}>
                        <SelectTrigger className="w-56">
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
                    </ButtonSection>

                    <ButtonSection label="Sizes">
                      <Select items={timezoneItems}>
                        <SelectTrigger size="sm" className="w-44">
                          <SelectValue placeholder="Small" />
                        </SelectTrigger>
                        <SelectPopup>
                          {timezoneItems.map((item) => (
                            <SelectItem key={item.value} value={item}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectPopup>
                      </Select>
                      <Select items={timezoneItems}>
                        <SelectTrigger size="lg" className="w-44">
                          <SelectValue placeholder="Large" />
                        </SelectTrigger>
                        <SelectPopup>
                          {timezoneItems.map((item) => (
                            <SelectItem key={item.value} value={item}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectPopup>
                      </Select>
                    </ButtonSection>

                    <ButtonSection label="States">
                      <Select items={frameworkItems} disabled>
                        <SelectTrigger className="w-56">
                          <SelectValue placeholder="Disabled" />
                        </SelectTrigger>
                        <SelectPopup>
                          {frameworkItems.map((item) => (
                            <SelectItem key={item.value} value={item}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectPopup>
                      </Select>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="textarea">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Textarea</CardTitle>
                    <CardDescription>
                      Multi-line text entry with helper text and invalid state.
                    </CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
                      <Field name="bio" className="w-80">
                        <FieldLabel>Bio</FieldLabel>
                        <Textarea placeholder="Tell us about yourself…" />
                        <FieldDescription>Markdown is supported.</FieldDescription>
                      </Field>
                    </ButtonSection>

                    <ButtonSection label="States">
                      <Field name="invalid-textarea" className="w-80">
                        <FieldLabel>Notes (required)</FieldLabel>
                        <Textarea aria-invalid placeholder="Add notes…" />
                        <FieldError>This field is required.</FieldError>
                      </Field>
                      <Field name="disabled-textarea" className="w-80">
                        <FieldLabel>Disabled</FieldLabel>
                        <Textarea disabled defaultValue="Cannot edit this field" />
                      </Field>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="tabs">
                <Card className={showcaseCard}>
                  <CardHeader>
                    <CardTitle>Tabs</CardTitle>
                    <CardDescription>Interactive Base UI primitive.</CardDescription>
                  </CardHeader>
                  <CardPanel className={showcaseCardPanel}>
                    <ButtonSection label="Default">
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
                    </ButtonSection>

                    <ButtonSection label="Underline">
                      <Tabs defaultValue="overview">
                        <TabsList variant="underline">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="pt-4 text-sm">
                          Underline tabs use a primary indicator instead of a pill.
                        </TabsContent>
                        <TabsContent value="details" className="pt-4 text-sm">
                          Panel switching works the same as the default variant.
                        </TabsContent>
                      </Tabs>
                    </ButtonSection>
                  </CardPanel>
                </Card>
              </ShowcaseSection>

              <ShowcaseSection id="text-inputs">
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

                    <ButtonSection label="Sizes">
                      <Field name="email-sm" className="w-56">
                        <FieldLabel>Small</FieldLabel>
                        <Input size="sm" type="email" placeholder="name@example.com" />
                      </Field>
                      <Field name="email-default" className="w-56">
                        <FieldLabel>Default</FieldLabel>
                        <Input type="email" placeholder="name@example.com" />
                      </Field>
                      <Field name="email-lg" className="w-56">
                        <FieldLabel>Large</FieldLabel>
                        <Input size="lg" type="email" placeholder="name@example.com" />
                      </Field>
                    </ButtonSection>

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
              </ShowcaseSection>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
