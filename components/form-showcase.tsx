"use client"

import * as React from "react"
import { MailIcon, SearchIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckboxGroup } from "@/components/ui/checkbox-group"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Fieldset, FieldsetLegend } from "@/components/ui/fieldset"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
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
import { Separator } from "@/components/ui/separator"
import { Slider, SliderValue } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

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

export function FormShowcase() {
  const termsId = React.useId()

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Text inputs</CardTitle>
          <CardDescription>
            Default, sized, disabled, and invalid states with labels and helper
            text.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Field name="name">
            <FieldLabel>Full name</FieldLabel>
            <Input type="text" placeholder="Jane Doe" autoComplete="name" />
            <FieldDescription>
              Shown on your public profile.
            </FieldDescription>
          </Field>

          <div className="grid gap-6 sm:grid-cols-3">
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
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
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
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select &amp; textarea</CardTitle>
          <CardDescription>
            Popup selection and multi-line text entry.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Choice controls</CardTitle>
          <CardDescription>
            Checkboxes, radio groups, and switches for boolean and single-choice
            input.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
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

          <Separator />

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

            <div className="flex items-start gap-2">
              <Checkbox id={termsId} />
              <div className="flex flex-col gap-1">
                <Label htmlFor={termsId}>Accept terms and conditions</Label>
                <p className="text-muted-foreground text-xs">
                  Checkbox with linked label and description for screen reader
                  testing.
                </p>
              </div>
            </div>

            <Label className="flex items-center gap-2 opacity-64">
              <Switch disabled />
              Disabled switch
            </Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Range &amp; numeric</CardTitle>
          <CardDescription>
            Sliders and number fields for continuous and stepped values.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input groups</CardTitle>
          <CardDescription>
            Inputs with inline addons for icons, prefixes, and suffixes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Field name="email-group">
            <FieldLabel>Email with icon</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <MailIcon />
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
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search…" type="search" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>⌘K</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </CardContent>
      </Card>
    </>
  )
}
