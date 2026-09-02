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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toggle } from "@/components/ui/toggle"

const fruitItems = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
]

function useMeasureDeps(): string {
  const { resolvedTheme } = useTheme()
  const { preset } = useUiPreset()

  return `${preset}:${resolvedTheme ?? "light"}`
}

function HeightSample({
  label,
  children,
  deps,
}: {
  label: string
  children: React.ReactNode
  deps: string
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | null>(null)

  const measure = React.useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) {
      return
    }

    const target =
      wrapper.querySelector<HTMLElement>("[data-height-target]") ??
      wrapper.querySelector<HTMLElement>("[data-slot='input-control']") ??
      wrapper.querySelector<HTMLElement>("[data-slot='input-group']") ??
      wrapper.querySelector<HTMLElement>("[data-slot='number-field-group']") ??
      wrapper.querySelector<HTMLElement>("[data-slot='select-trigger']") ??
      wrapper.querySelector<HTMLElement>("[data-slot='tabs-list']") ??
      (wrapper.firstElementChild as HTMLElement | null)

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
    <div className="flex min-w-0 flex-col items-start gap-2">
      <div className="relative flex h-12 items-center">
        <div ref={wrapperRef} className="w-fit max-w-44">
          {children}
        </div>
      </div>
      <p className="font-mono text-[10px] text-muted-foreground">
        {label} · {height == null ? "—" : `${height}px`}
      </p>
    </div>
  )
}

export function InlineHeights() {
  const deps = useMeasureDeps()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inline heights</CardTitle>
        <CardDescription>
          Default-size controls that sit on a form or toolbar line. Heights are
          measured live from the rendered control.
        </CardDescription>
      </CardHeader>
      <CardPanel>
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-6 z-0 h-px -translate-y-px bg-border"
          />
          <div className="relative z-10 flex flex-wrap items-start gap-x-6 gap-y-6">
            <HeightSample deps={deps} label="Button">
              <Button data-height-target>Button</Button>
            </HeightSample>

            <HeightSample deps={deps} label="Input">
              <Input placeholder="Input" />
            </HeightSample>

            <HeightSample deps={deps} label="InputGroup">
              <InputGroup>
                <InputGroupAddon>
                  <MagnifyingGlassIcon />
                </InputGroupAddon>
                <InputGroupInput placeholder="Search" type="search" />
              </InputGroup>
            </HeightSample>

            <HeightSample deps={deps} label="Select">
              <Select items={fruitItems} defaultValue={fruitItems[0]}>
                <SelectTrigger data-height-target className="min-w-36">
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
            </HeightSample>

            <HeightSample deps={deps} label="Combobox">
              <Combobox items={fruitItems}>
                <ComboboxInput
                  aria-label="Fruit"
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
            </HeightSample>

            <HeightSample deps={deps} label="Autocomplete">
              <Autocomplete items={fruitItems}>
                <AutocompleteInput
                  aria-label="Fruit"
                  placeholder="Autocomplete"
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
            </HeightSample>

            <HeightSample deps={deps} label="NumberField">
              <NumberField defaultValue={3} min={0} max={99}>
                <NumberFieldGroup data-height-target>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldGroup>
              </NumberField>
            </HeightSample>

            <HeightSample deps={deps} label="Toggle">
              <Toggle data-height-target>Toggle</Toggle>
            </HeightSample>

            <HeightSample deps={deps} label="Badge">
              <Badge data-height-target>Badge</Badge>
            </HeightSample>

            <HeightSample deps={deps} label="Switch">
              <Switch data-height-target defaultChecked aria-label="Switch" />
            </HeightSample>

            <HeightSample deps={deps} label="Checkbox">
              <Checkbox data-height-target defaultChecked aria-label="Checkbox" />
            </HeightSample>

            <HeightSample deps={deps} label="Radio">
              <RadioGroup
                defaultValue="on"
                className="flex-row"
                aria-label="Radio"
              >
                <Radio data-height-target value="on" />
              </RadioGroup>
            </HeightSample>

            <HeightSample deps={deps} label="Kbd">
              <Kbd data-height-target>⌘K</Kbd>
            </HeightSample>

            <HeightSample deps={deps} label="TabsList">
              <Tabs defaultValue="one">
                <TabsList data-height-target>
                  <TabsTrigger value="one">One</TabsTrigger>
                  <TabsTrigger value="two">Two</TabsTrigger>
                </TabsList>
              </Tabs>
            </HeightSample>
          </div>
        </div>
      </CardPanel>
    </Card>
  )
}
