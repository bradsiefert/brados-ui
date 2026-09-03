"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MagnifyingGlassIcon, SlidersIcon } from "@phosphor-icons/react"

import { useUiPreset } from "@/components/ui-preset-provider"
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/autocomplete"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { OTPField, OTPFieldInput } from "@/components/ui/otp-field"
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

const HEIGHTS = [16, 18, 20, 22, 24, 28, 32, 36, 40] as const

type Height = (typeof HEIGHTS)[number]

type ControlSize = "sm" | "default" | "lg"
type ButtonSize = "xs" | "sm" | "default" | "lg" | "xl"
type IconSize = "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"

type SizeSample = {
  token: string
  node: React.ReactNode
}

type SizeRow = {
  name: string
  samples: Partial<Record<Height, SizeSample>>
}

const fruitItems = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
]

const controlWidth = "w-28"

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
    wrapper.querySelector<HTMLElement>("[data-slot='tabs-tab']") ??
    wrapper.querySelector<HTMLElement>("[data-slot='otp-field-input']") ??
    wrapper.querySelector<HTMLElement>("[data-slot='input-control']") ??
    (wrapper.firstElementChild as HTMLElement | null)
  )
}

function SizeCellSample({
  token,
  deps,
  children,
}: {
  token: string
  deps: string
  children: React.ReactNode
}): React.ReactElement {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | null>(null)

  const measure = React.useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    const target = measureTarget(wrapper)
    if (target) {
      setHeight(target.offsetHeight)
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
      <div className="flex h-11 items-center justify-center">
        <div ref={wrapperRef} className="w-fit">
          {children}
        </div>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">
        {token}
        {height == null ? "" : ` · ${height}`}
      </p>
    </div>
  )
}

function FruitSelect({
  size,
}: {
  size?: ControlSize
}): React.ReactElement {
  return (
    <Select items={fruitItems} defaultValue={fruitItems[0]}>
      <SelectTrigger
        data-height-target
        size={size}
        className="min-w-28 w-28"
      >
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
  )
}

function FruitCombobox({
  size,
}: {
  size?: ControlSize
}): React.ReactElement {
  return (
    <div className={controlWidth}>
      <Combobox items={fruitItems}>
        <ComboboxInput
          aria-label="Fruit"
          placeholder="Combobox"
          size={size}
        />
        <ComboboxPopup>
          <ComboboxEmpty>None</ComboboxEmpty>
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
  )
}

function FruitAutocomplete({
  size,
}: {
  size?: ControlSize
}): React.ReactElement {
  return (
    <div className={controlWidth}>
      <Autocomplete items={fruitItems}>
        <AutocompleteInput
          aria-label="Fruit"
          placeholder="Auto"
          size={size}
        />
        <AutocompletePopup>
          <AutocompleteEmpty>None</AutocompleteEmpty>
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
  )
}

function SizedNumberField({
  size,
}: {
  size?: ControlSize
}): React.ReactElement {
  return (
    <NumberField defaultValue={3} min={0} max={99} size={size} className="w-28">
      <NumberFieldGroup data-height-target>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}

function SizedInputGroup({
  size,
}: {
  size?: ControlSize
}): React.ReactElement {
  return (
    <InputGroup data-height-target className={controlWidth}>
      <InputGroupAddon>
        <MagnifyingGlassIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search" size={size} type="search" />
    </InputGroup>
  )
}

function SizedOtpField({
  size,
}: {
  size?: "default" | "lg"
}): React.ReactElement {
  return (
    <OTPField aria-label="Code" length={3} size={size}>
      <OTPFieldInput aria-label="Digit 1 of 3" data-height-target />
      <OTPFieldInput aria-label="Digit 2 of 3" />
      <OTPFieldInput aria-label="Digit 3 of 3" />
    </OTPField>
  )
}

function getSizeRows(): SizeRow[] {
  const button = (size: ButtonSize): SizeSample => ({
    token: size,
    node: (
      <Button size={size} variant="outline">
        Button
      </Button>
    ),
  })

  const icon = (size: IconSize): SizeSample => ({
    token: size,
    node: (
      <Button aria-label="Settings" size={size} variant="outline">
        <SlidersIcon aria-hidden="true" />
      </Button>
    ),
  })

  const input = (size: ControlSize): SizeSample => ({
    token: size,
    node: <Input className={controlWidth} placeholder="Input" size={size} />,
  })

  const inputGroup = (size: ControlSize): SizeSample => ({
    token: size,
    node: <SizedInputGroup size={size} />,
  })

  const select = (size: ControlSize): SizeSample => ({
    token: size,
    node: <FruitSelect size={size} />,
  })

  const combobox = (size: ControlSize): SizeSample => ({
    token: size,
    node: <FruitCombobox size={size} />,
  })

  const autocomplete = (size: ControlSize): SizeSample => ({
    token: size,
    node: <FruitAutocomplete size={size} />,
  })

  const numberField = (size: ControlSize): SizeSample => ({
    token: size,
    node: <SizedNumberField size={size} />,
  })

  const toggle = (size: ControlSize): SizeSample => ({
    token: size,
    node: <Toggle size={size}>Toggle</Toggle>,
  })

  return [
    {
      name: "Button",
      samples: {
        24: button("xs"),
        28: button("sm"),
        32: button("default"),
        36: button("lg"),
        40: button("xl"),
      },
    },
    {
      name: "Button icon",
      samples: {
        24: icon("icon-xs"),
        28: icon("icon-sm"),
        32: icon("icon"),
        36: icon("icon-lg"),
        40: icon("icon-xl"),
      },
    },
    {
      name: "Input",
      samples: {
        28: input("sm"),
        32: input("default"),
        36: input("lg"),
      },
    },
    {
      name: "InputGroup",
      samples: {
        28: inputGroup("sm"),
        32: inputGroup("default"),
        36: inputGroup("lg"),
      },
    },
    {
      name: "Select",
      samples: {
        28: select("sm"),
        32: select("default"),
        36: select("lg"),
      },
    },
    {
      name: "Combobox",
      samples: {
        28: combobox("sm"),
        32: combobox("default"),
        36: combobox("lg"),
      },
    },
    {
      name: "Autocomplete",
      samples: {
        28: autocomplete("sm"),
        32: autocomplete("default"),
        36: autocomplete("lg"),
      },
    },
    {
      name: "NumberField",
      samples: {
        28: numberField("sm"),
        32: numberField("default"),
        36: numberField("lg"),
      },
    },
    {
      name: "Toggle",
      samples: {
        28: toggle("sm"),
        32: toggle("default"),
        36: toggle("lg"),
      },
    },
    {
      name: "OTPField",
      samples: {
        32: { token: "default", node: <SizedOtpField size="default" /> },
        36: { token: "lg", node: <SizedOtpField size="lg" /> },
      },
    },
    {
      name: "Badge",
      samples: {
        16: { token: "sm", node: <Badge size="sm">Badge</Badge> },
        18: { token: "default", node: <Badge>Badge</Badge> },
        22: { token: "lg", node: <Badge size="lg">Badge</Badge> },
      },
    },
    {
      name: "Checkbox",
      samples: {
        16: {
          token: "—",
          node: (
            <Checkbox
              aria-label="Checkbox"
              data-height-target
              defaultChecked
            />
          ),
        },
      },
    },
    {
      name: "Radio",
      samples: {
        16: {
          token: "—",
          node: (
            <RadioGroup
              aria-label="Radio"
              className="flex-row"
              defaultValue="on"
            >
              <Radio data-height-target value="on" />
            </RadioGroup>
          ),
        },
      },
    },
    {
      name: "Switch",
      samples: {
        18: {
          token: "—",
          node: (
            <Switch aria-label="Switch" data-height-target defaultChecked />
          ),
        },
      },
    },
    {
      name: "Kbd",
      samples: {
        20: { token: "—", node: <Kbd data-height-target>⌘K</Kbd> },
      },
    },
    {
      name: "Avatar",
      samples: {
        32: {
          token: "size-8",
          node: (
            <Avatar data-height-target>
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          ),
        },
      },
    },
    {
      name: "TabsTab",
      samples: {
        32: {
          token: "default",
          node: (
            <Tabs defaultValue="one">
              <TabsList className="bg-transparent p-0">
                <TabsTrigger data-height-target value="one">
                  Tab
                </TabsTrigger>
              </TabsList>
            </Tabs>
          ),
        },
      },
    },
    {
      name: "TabsList",
      samples: {
        36: {
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

export function InlineSizes(): React.ReactElement {
  const deps = useMeasureDeps()
  const rows = React.useMemo(() => getSizeRows(), [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sizes</CardTitle>
        <CardDescription>
          Columns are desktop heights. Token names sit under each control.
          Empty cells mean no variant at that height.
        </CardDescription>
      </CardHeader>
      <CardPanel>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={stickyCell}>Component</TableHead>
              {HEIGHTS.map((height) => (
                <TableHead key={height} className="text-center">
                  {height}
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
                {HEIGHTS.map((height) => {
                  const sample = row.samples[height]
                  return (
                    <TableCell key={height} className="text-center align-middle">
                      {sample ? (
                        <SizeCellSample deps={deps} token={sample.token}>
                          {sample.node}
                        </SizeCellSample>
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
