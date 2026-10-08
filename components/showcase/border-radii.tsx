"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"

import { useUiPreset } from "@/components/ui-preset-provider"
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/autocomplete"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field"
import { Radio, RadioGroup } from "@/components/ui/radio-group"
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"

const COLUMNS = ["4", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "full"] as const

type RadiusColumn = (typeof COLUMNS)[number]

type RadiusSample = {
  token: string
  node: React.ReactNode
}

type RadiusRow = {
  name: string
  samples: Partial<Record<RadiusColumn, RadiusSample>>
}

const fruitItems = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
]

const tokenSquares: Record<RadiusColumn, string> = {
  "4": "rounded-[.25rem]",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "4xl": "rounded-4xl",
  full: "rounded-full",
}

function useMeasureDeps(): string {
  const { resolvedTheme } = useTheme()
  const { preset } = useUiPreset()

  return `${preset}:${resolvedTheme ?? "light"}`
}

function measureTarget(wrapper: HTMLDivElement): HTMLElement | null {
  return (
    wrapper.querySelector<HTMLElement>("[data-height-target]") ??
    wrapper.querySelector<HTMLElement>("[data-slot='input-group']") ??
    wrapper.querySelector<HTMLElement>("[data-slot='number-field-group']") ??
    wrapper.querySelector<HTMLElement>("[data-slot='select-trigger']") ??
    wrapper.querySelector<HTMLElement>("[data-slot='tabs-list']") ??
    wrapper.querySelector<HTMLElement>("[data-slot='input-control']") ??
    wrapper.querySelector<HTMLElement>("[data-slot='combobox-input-group']") ??
    wrapper.querySelector<HTMLElement>(
      "[data-slot='autocomplete-input-group']",
    ) ??
    (wrapper.firstElementChild as HTMLElement | null)
  )
}

function formatRadius(target: HTMLElement): string {
  const radius = Number.parseFloat(
    getComputedStyle(target).borderTopLeftRadius,
  )
  if (!Number.isFinite(radius)) {
    return "—"
  }

  const limit = Math.min(target.offsetWidth, target.offsetHeight) / 2
  if (limit > 0 && radius >= limit - 0.5) {
    return "full"
  }

  return `${Math.round(radius)}px`
}

function RadiusCellSample({
  token,
  deps,
  children,
}: {
  token: string
  deps: string
  children: React.ReactNode
}): React.ReactElement {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [radius, setRadius] = React.useState<string | null>(null)

  const measure = React.useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    const target = measureTarget(wrapper)
    if (target) {
      setRadius(formatRadius(target))
    }
  }, [])

  React.useLayoutEffect(() => {
    measure()

    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    const observer = new ResizeObserver(measure)
    observer.observe(wrapper)
    const first = wrapper.firstElementChild
    if (first instanceof HTMLElement) {
      observer.observe(first)
    }

    window.addEventListener("resize", measure)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [deps, measure])

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex min-h-11 items-center justify-center">
        <div ref={wrapperRef} className="w-fit">
          {children}
        </div>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">
        {token}
        {radius == null ? "" : ` · ${radius}`}
      </p>
    </div>
  )
}

function getRadiusRows(): RadiusRow[] {
  return [
    {
      name: "Token",
      samples: Object.fromEntries(
        COLUMNS.map((column) => [
          column,
          {
            token: column,
            node: (
              <div
                data-height-target
                className={`size-14 border border-border bg-muted ${tokenSquares[column]}`}
              />
            ),
          },
        ]),
      ) as RadiusRow["samples"],
    },
    {
      name: "Button",
      samples: {
        md: {
          token: "xs",
          node: (
            <Button data-height-target size="xs" variant="outline">
              Button
            </Button>
          ),
        },
        lg: {
          token: "default",
          node: (
            <Button data-height-target variant="outline">
              Button
            </Button>
          ),
        },
      },
    },
    {
      name: "Input",
      samples: {
        lg: { token: "default", node: <Input placeholder="Input" /> },
      },
    },
    {
      name: "InputGroup",
      samples: {
        lg: {
          token: "default",
          node: (
            <InputGroup data-height-target className="w-28">
              <InputGroupAddon>
                <MagnifyingGlassIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search" type="search" />
            </InputGroup>
          ),
        },
      },
    },
    {
      name: "Select",
      samples: {
        lg: {
          token: "default",
          node: (
            <Select items={fruitItems} defaultValue={fruitItems[0]}>
              <SelectTrigger data-height-target className="w-28">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectPopup>
                {fruitItems.map((item) => (
                  <SelectItem key={item.value} value={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
          ),
        },
      },
    },
    {
      name: "Combobox",
      samples: {
        lg: {
          token: "default",
          node: (
            <Combobox items={fruitItems}>
              <ComboboxInput
                aria-label="Fruit"
                className="w-28"
                placeholder="Combobox"
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
          ),
        },
      },
    },
    {
      name: "Autocomplete",
      samples: {
        lg: {
          token: "default",
          node: (
            <Autocomplete items={fruitItems}>
              <AutocompleteInput
                aria-label="Fruit"
                className="w-28"
                placeholder="Auto"
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
          ),
        },
      },
    },
    {
      name: "NumberField",
      samples: {
        lg: {
          token: "default",
          node: (
            <NumberField defaultValue={3} min={0} max={99} className="w-28">
              <NumberFieldGroup data-height-target>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>
          ),
        },
      },
    },
    {
      name: "Toggle",
      samples: {
        lg: {
          token: "default",
          node: <Toggle data-height-target>Toggle</Toggle>,
        },
      },
    },
    {
      name: "Badge",
      samples: {
        "4": {
          token: "sm",
          node: (
            <Badge data-height-target size="sm" variant="outline">
              Badge
            </Badge>
          ),
        },
        sm: {
          token: "default",
          node: (
            <Badge data-height-target variant="outline">
              Badge
            </Badge>
          ),
        },
      },
    },
    {
      name: "Switch",
      samples: {
        full: {
          token: "full",
          node: (
            <Switch data-height-target defaultChecked aria-label="Switch" />
          ),
        },
      },
    },
    {
      name: "Checkbox",
      samples: {
        "4": {
          token: "default",
          node: (
            <Checkbox
              data-height-target
              defaultChecked
              aria-label="Checkbox"
            />
          ),
        },
      },
    },
    {
      name: "Radio",
      samples: {
        full: {
          token: "full",
          node: (
            <RadioGroup
              defaultValue="on"
              className="flex-row"
              aria-label="Radio"
            >
              <Radio data-height-target value="on" />
            </RadioGroup>
          ),
        },
      },
    },
    {
      name: "Kbd",
      samples: {
        "4": {
          token: "default",
          node: <Kbd data-height-target>⌘K</Kbd>,
        },
      },
    },
    {
      name: "TabsList",
      samples: {
        lg: {
          token: "default",
          node: (
            <Tabs defaultValue="one">
              <TabsList data-height-target>
                <TabsTrigger value="one">One</TabsTrigger>
                <TabsTrigger value="two">Two</TabsTrigger>
              </TabsList>
            </Tabs>
          ),
        },
      },
    },
  ]
}

const stickyCell =
  "sticky start-0 z-10 bg-background shadow-[1px_0_0_0_var(--border)]"

export function BorderRadii(): React.ReactElement {
  const deps = useMeasureDeps()
  const rows = React.useMemo(() => getRadiusRows(), [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Border Radii</CardTitle>
        <CardDescription>
          Columns are radius steps. Each control sits in the column it uses.
          Empty cells stay empty.
        </CardDescription>
      </CardHeader>
      <CardPanel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={stickyCell}>Component</TableHead>
              {COLUMNS.map((column) => (
                <TableHead key={column} className="text-center">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell className={`${stickyCell} font-medium`}>
                  {row.name}
                </TableCell>
                {COLUMNS.map((column) => {
                  const sample = row.samples[column]
                  return (
                    <TableCell
                      key={column}
                      className="text-center align-middle"
                    >
                      {sample ? (
                        <RadiusCellSample deps={deps} token={sample.token}>
                          {sample.node}
                        </RadiusCellSample>
                      ) : null}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardPanel>
    </Card>
  )
}
