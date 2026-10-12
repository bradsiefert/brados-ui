"use client"

import { PlusCircleIcon, SlidersIcon } from "@phosphor-icons/react"
import { PlusIcon, SlidersHorizontalIcon } from "lucide-react"
import * as React from "react"

import {
  CanvasModeToggle,
  ChoiceField,
  CompositionNote,
  Gallery,
  GalleryGroup,
  PropsList,
  SwitchField,
  type CanvasMode,
  type Choice,
} from "@/components/playground/canvas-parts"
import { CanvasIntro, PlaygroundShell } from "@/components/playground/playground-shell"
import { Button as StockButton, type ButtonProps as StockButtonProps } from "@/coss-stock/button"
import {
  Button as CustomButton,
  type ButtonProps as CustomButtonProps,
} from "@/components/ui/button"
import { useUiPreset, type UiPreset } from "@/components/ui-preset-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type ButtonVariant = NonNullable<CustomButtonProps["variant"]>
type ButtonSize = NonNullable<CustomButtonProps["size"]>
type StockVariant = NonNullable<StockButtonProps["variant"]>
type IconMode = "none" | "leading" | "icon-only"
type GalleryIcon = React.ComponentType<{ "aria-hidden"?: boolean | "true" }>

const variants: Choice<ButtonVariant>[] = [
  { label: "Default", value: "default" },
  { label: "Primary outline", value: "primary-outline" },
  { label: "Outline", value: "outline" },
  { label: "Secondary", value: "secondary" },
  { label: "Ghost", value: "ghost" },
  { label: "Link", value: "link" },
  { label: "Destructive", value: "destructive" },
  { label: "Destructive outline", value: "destructive-outline" },
]

const textSizes: Choice<ButtonSize>[] = [
  { label: "Extra small", value: "xs" },
  { label: "Small", value: "sm" },
  { label: "Default", value: "default" },
  { label: "Large", value: "lg" },
  { label: "Extra large", value: "xl" },
]

const iconSizes: Choice<ButtonSize>[] = [
  { label: "Extra small", value: "icon-xs" },
  { label: "Small", value: "icon-sm" },
  { label: "Default", value: "icon" },
  { label: "Large", value: "icon-lg" },
  { label: "Extra large", value: "icon-xl" },
]

const iconModes: Choice<IconMode>[] = [
  { label: "None", value: "none" },
  { label: "Leading", value: "leading" },
  { label: "Icon only", value: "icon-only" },
]

const buttonProps = [
  { name: "variant", type: "string", defaultValue: "default" },
  { name: "size", type: "string", defaultValue: "default" },
  { name: "loading", type: "boolean", defaultValue: "false" },
  { name: "disabled", type: "boolean", defaultValue: "false" },
  { name: "children", type: "ReactNode", defaultValue: "—" },
  { name: "render", type: "ReactElement", defaultValue: "—" },
]

function asStockVariant(variant: CustomButtonProps["variant"]): StockVariant {
  if (variant == null || variant === "primary-outline") {
    return "default"
  }
  return variant
}

function galleryIcons(preset: UiPreset): {
  Plus: GalleryIcon
  Sliders: GalleryIcon
} {
  if (preset === "coss-default") {
    return {
      Plus: PlusIcon,
      Sliders: SlidersHorizontalIcon,
    }
  }

  return {
    Plus: PlusCircleIcon,
    Sliders: SlidersIcon,
  }
}

function PlaygroundButton({
  preset,
  variant = "default",
  ...props
}: CustomButtonProps & { preset: UiPreset }): React.ReactElement {
  if (preset === "coss-default") {
    return <StockButton {...props} variant={asStockVariant(variant)} />
  }

  return <CustomButton {...props} variant={variant} />
}

function toIconSize(size: ButtonSize): ButtonSize {
  switch (size) {
    case "xs":
    case "icon-xs":
      return "icon-xs"
    case "sm":
    case "icon-sm":
      return "icon-sm"
    case "lg":
    case "icon-lg":
      return "icon-lg"
    case "xl":
    case "icon-xl":
      return "icon-xl"
    default:
      return "icon"
  }
}

function toTextSize(size: ButtonSize): ButtonSize {
  switch (size) {
    case "xs":
    case "icon-xs":
      return "xs"
    case "sm":
    case "icon-sm":
      return "sm"
    case "lg":
    case "icon-lg":
      return "lg"
    case "xl":
    case "icon-xl":
      return "xl"
    default:
      return "default"
  }
}

function ButtonGallery({ preset }: { preset: UiPreset }): React.ReactElement {
  const icons = galleryIcons(preset)

  return (
    <Gallery>
      <GalleryGroup label="Variants">
        <PlaygroundButton preset={preset}>Primary</PlaygroundButton>
        {preset === "custom" ? (
          <PlaygroundButton preset={preset} variant="primary-outline">
            Primary
          </PlaygroundButton>
        ) : null}
        <PlaygroundButton preset={preset} variant="outline">
          Outline
        </PlaygroundButton>
        <PlaygroundButton preset={preset} variant="secondary">
          Secondary
        </PlaygroundButton>
        <PlaygroundButton preset={preset} variant="ghost">
          Ghost
        </PlaygroundButton>
        <PlaygroundButton preset={preset} variant="link">
          Link
        </PlaygroundButton>
        <PlaygroundButton preset={preset} variant="destructive">
          Destructive
        </PlaygroundButton>
        <PlaygroundButton preset={preset} variant="destructive-outline">
          Destructive
        </PlaygroundButton>
      </GalleryGroup>
      <GalleryGroup label="Sizes">
        <PlaygroundButton preset={preset} size="xs" variant="outline">
          Extra small
        </PlaygroundButton>
        <PlaygroundButton preset={preset} size="sm" variant="outline">
          Small
        </PlaygroundButton>
        <PlaygroundButton preset={preset} variant="outline">
          Default
        </PlaygroundButton>
        <PlaygroundButton preset={preset} size="lg" variant="outline">
          Large
        </PlaygroundButton>
        <PlaygroundButton preset={preset} size="xl" variant="outline">
          Extra large
        </PlaygroundButton>
      </GalleryGroup>
      <GalleryGroup label="With icon">
        <PlaygroundButton preset={preset}>
          <icons.Plus aria-hidden="true" />
          Add item
        </PlaygroundButton>
      </GalleryGroup>
      <GalleryGroup label="Icon only">
        <PlaygroundButton aria-label="Settings" preset={preset} size="icon-xs" variant="outline">
          <icons.Sliders aria-hidden="true" />
        </PlaygroundButton>
        <PlaygroundButton aria-label="Settings" preset={preset} size="icon-sm" variant="outline">
          <icons.Sliders aria-hidden="true" />
        </PlaygroundButton>
        <PlaygroundButton aria-label="Settings" preset={preset} size="icon" variant="outline">
          <icons.Sliders aria-hidden="true" />
        </PlaygroundButton>
        <PlaygroundButton aria-label="Settings" preset={preset} size="icon-lg" variant="outline">
          <icons.Sliders aria-hidden="true" />
        </PlaygroundButton>
        <PlaygroundButton aria-label="Settings" preset={preset} size="icon-xl" variant="outline">
          <icons.Sliders aria-hidden="true" />
        </PlaygroundButton>
      </GalleryGroup>
      <GalleryGroup label="States">
        <PlaygroundButton loading preset={preset}>
          Loading
        </PlaygroundButton>
        <PlaygroundButton disabled preset={preset}>
          Disabled
        </PlaygroundButton>
      </GalleryGroup>
      <GalleryGroup label="As link">
        <PlaygroundButton
          preset={preset}
          render={
            <a href="https://coss.com/ui" rel="noreferrer" target="_blank" />
          }
          variant="link"
        >
          Visit docs
        </PlaygroundButton>
      </GalleryGroup>
    </Gallery>
  )
}

export function ButtonPlayground(): React.ReactElement {
  const { preset } = useUiPreset()
  const [mode, setMode] = React.useState<CanvasMode>("specimen")
  const [variant, setVariant] = React.useState<ButtonVariant>("default")
  const [size, setSize] = React.useState<ButtonSize>("default")
  const [icon, setIcon] = React.useState<IconMode>("none")
  const [label, setLabel] = React.useState("Button")
  const [disabled, setDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const variantOptions =
    preset === "coss-default"
      ? variants.filter((option) => option.value !== "primary-outline")
      : variants
  const activeVariant: ButtonVariant =
    preset === "coss-default" && variant === "primary-outline" ? "default" : variant

  function setIconMode(next: IconMode) {
    setIcon(next)
    setSize((current) => (next === "icon-only" ? toIconSize(current) : toTextSize(current)))
  }

  const sizeOptions = icon === "icon-only" ? iconSizes : textSizes
  const LeadingIcon = galleryIcons(preset).Plus

  return (
    <PlaygroundShell
      inspector={
        <div className="flex flex-col gap-5 p-4">
          <h2 className="font-heading text-sm font-semibold tracking-tight">Inspector</h2>
          <ChoiceField
            id="button-variant"
            label="Variant"
            onChange={setVariant}
            options={variantOptions}
            value={activeVariant}
          />
          <div className="flex flex-col gap-2">
            <span className="font-medium text-sm" id="button-icon-label">
              Icon
            </span>
            <ToggleGroup
              aria-labelledby="button-icon-label"
              onValueChange={(value) => {
                const next = value[0]
                if (next === "none" || next === "leading" || next === "icon-only") {
                  setIconMode(next)
                }
              }}
              size="sm"
              value={[icon]}
              variant="outline"
            >
              {iconModes.map((option) => (
                <ToggleGroupItem key={option.value} value={option.value}>
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <ChoiceField
            id="button-size"
            label="Size"
            onChange={setSize}
            options={sizeOptions}
            value={size}
          />
          <div className="flex flex-col gap-2">
            <Label htmlFor="button-label">Label</Label>
            <Input
              id="button-label"
              onChange={(event) => setLabel(event.target.value)}
              value={label}
            />
          </div>
          <SwitchField
            checked={disabled}
            id="button-disabled"
            label="Disabled"
            onCheckedChange={setDisabled}
          />
          <SwitchField
            checked={loading}
            id="button-loading"
            label="Loading"
            onCheckedChange={setLoading}
          />
          <Separator />
          <PropsList props={buttonProps} />
          <CompositionNote>
            {preset === "coss-default"
              ? "Stock COSS button. Primary outline is not in this set. Large and extra large use the scaffold heights."
              : "Your button. Primary outline, the destructive outline treatment, and the taller large sizes are local."}{" "}
            Pass <span className="font-mono text-foreground">render</span> to turn the
            button into another element, such as a link. An icon-only button needs an
            accessible name.
          </CompositionNote>
        </div>
      }
    >
      <CanvasIntro
        description={
          preset === "coss-default"
            ? "Stock COSS button. Use Custom in the header to see your variants and sizes."
            : "Your button. Use COSS in the header to see the stock variants and sizes."
        }
        title="Button"
      >
        <CanvasModeToggle mode={mode} onModeChange={setMode} />
      </CanvasIntro>
      {mode === "gallery" ? (
        <ButtonGallery preset={preset} />
      ) : (
        <div className="flex min-h-80 flex-1 items-center justify-center p-8">
          <PlaygroundButton
            aria-label={icon === "icon-only" ? label : undefined}
            disabled={disabled}
            loading={loading}
            preset={preset}
            size={size}
            variant={activeVariant}
          >
            {icon === "none" ? null : <LeadingIcon aria-hidden="true" />}
            {icon === "icon-only" ? null : label}
          </PlaygroundButton>
        </div>
      )}
    </PlaygroundShell>
  )
}
