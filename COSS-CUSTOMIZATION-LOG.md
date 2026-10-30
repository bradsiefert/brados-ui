# COSS customization log

Reference for every change made to the default COSS UI scaffold in this project. Use this when debugging issues against stock COSS behavior or when reverting customizations.

**Baseline:** git commit `04292fa` (`feat: initial commit`) — state after `npx shadcn init @coss/style`.

**Last reviewed:** 2026-10-09 (frozen original set in `components/coss-stock`).

---

## Summary

| Area | Files changed | Notes |
|------|---------------|-------|
| Design tokens | `app/globals.css` | 20+ semantic token overrides (light + dark); font weight tokens |
| Typography | `app/fonts.ts`, `app/layout.tsx`, `app/globals.css`, `app/coss-default-preset.css` | Custom: Source Sans 3, Source Serif 4, Fira Code, weights 424 / 600 / 720. COSS preset uses Cal Sans and Paper Mono (the faces coss.com ships) and weights 400 / 700. Serif stays Source Serif 4 in both presets. |
| Dependencies | `package.json` | Custom primitives use `@phosphor-icons/react`. `lucide-react` is installed again for `components/coss-stock` only. |
| UI primitives | `components/ui/button.tsx` | Custom variants + control height scale |
| UI primitives | height scale (see below) | `sm`/`default`/`lg`/`xl` desktop heights: 28 / 32 / 48 / 56 |
| UI primitives | 17 icon-swapped files (see below) | `lucide-react` → `@phosphor-icons/react` imports only |
| UI primitives | overlay backdrops | Dialog, alert dialog, sheet, drawer, and command: `backdrop-blur-sm` removed. Scrim is `bg-black/48` (stock `bg-black/32`). |
| Preset tooling | `app/coss-default-preset.css`, `components/ui-preset-provider.tsx`, `components/theme-selector.tsx` | Restores baseline tokens at runtime (not part of COSS library). The same attribute also scopes a subtree. |
| Frozen original | `components/coss-stock/`, `scripts/refresh-coss-stock.mjs` | Stock primitives from `04292fa`. App still imports `components/ui`. |
| Third-party drop-ins | `components/ui/marquee.tsx`, `components/kibo-ui/dropzone/index.tsx` | Magic UI Marquee and Kibo UI Dropzone. Not COSS primitives. See below. |
| Colors page | `components/color-scale.tsx`, `components/palette-source.ts`, `components/theme-selector.tsx`, `lib/gds-palette.ts`, `app/globals.css`, `app/layout.tsx` | Header GDS / Tailwind switch sets `data-palette` on `<html>` and remaps Tailwind color ramps site wide. Custom / COSS and light / dark stay separate. |

All other files under `components/ui/` match the scaffold except `button.tsx`, the height-scaled controls listed below, the overlay backdrops, the icon-swapped primitives, and `marquee.tsx` (third-party drop-in, not a COSS primitive edit).

---

## Token changes (`app/globals.css`)

Custom values live in `:root:not([data-ui-preset="coss-default"]), [data-ui-preset="custom"]` and `.dark:not([data-ui-preset="coss-default"]), .dark [data-ui-preset="custom"]`. Stock values live in `app/coss-default-preset.css` on `:root[data-ui-preset="coss-default"], [data-ui-preset="coss-default"]` and `.dark[data-ui-preset="coss-default"], .dark [data-ui-preset="coss-default"]`. Semantic token values are unchanged. The extra selectors set those same values on the element that carries the attribute, so a subtree can use stock tokens while the rest of the page stays custom (and the reverse). Dark mode still follows `.dark` on `<html>`. The header toggle and the `p` hotkey still set or remove the attribute on `<html>`.

That snapshot **must** be `@import`ed from `app/globals.css` (after `@import "tailwindcss"`) so Tailwind compiles `--alpha()` at build time. Do not import it from `layout.tsx` as a sibling CSS file — `--alpha()` is not valid CSS in the browser, so border/input/muted/secondary/accent tokens get dropped and the COSS preset looks broken. `@theme inline` emits utilities as `var(--primary)` (and the other semantic names), so a subtree override of those variables changes `bg-primary` and the other color utilities inside it.

### Light mode (`:root`)

| Token | COSS default | Your custom |
|-------|-------------|-------------|
| `--background` | `var(--color-white)` | `var(--color-neutral-100)` |
| `--sidebar` | `var(--color-neutral-50)` | `var(--neutral-lightest)` (`#ffffff`) |
| `--sidebar-foreground` | `color-mix(in srgb, var(--color-neutral-800) 64%, var(--sidebar))` | `var(--color-neutral-800)` |
| `--sidebar-primary-foreground` | `var(--color-neutral-50)` | `var(--color-neutral-100)` |
| `--muted-foreground` | `color-mix(in srgb, var(--color-neutral-500) 90%, var(--color-black))` | `var(--color-neutral-500)` |
| `--primary` | `var(--color-neutral-800)` | `var(--color-blue-600)` |
| `--primary-foreground` | `var(--color-neutral-50)` | `var(--color-white)` |
| `--destructive` | `var(--color-red-500)` | `var(--color-red-600)` |
| `--border` | `--alpha(var(--color-black) / 8%)` | `--alpha(var(--color-black) / 10%)` |
| `--input` | `--alpha(var(--color-black) / 10%)` | `--alpha(var(--color-black) / 24%)` |
| `--muted` | `--alpha(var(--color-black) / 4%)` | `--alpha(var(--color-black) / 8%)` |

### Dark mode (`.dark`)

| Token | COSS default | Your custom |
|-------|-------------|-------------|
| `--background` | `color-mix(in srgb, var(--color-neutral-950) 95%, var(--color-white))` | `var(--color-neutral-950)`. The page is the darker ground. |
| `--sidebar` | `color-mix(in srgb, var(--color-neutral-950) 97%, var(--color-white))` | `var(--neutral-darkest)`. Light mode is `var(--neutral-lightest)`. |
| `--header` | — | Same pairing as the sidebar: lightest in light, darkest in dark. |
| `--sidebar-foreground` | `color-mix(in srgb, var(--color-neutral-100) 64%, var(--sidebar))` | `var(--color-neutral-100)` |
| `--card`, `--code` | `color-mix(in srgb, var(--background) 98%, var(--color-white))` | `var(--color-neutral-900)`. One step lighter than the page. |
| `--popover` | `color-mix(in srgb, var(--background) 98%, var(--color-white))` | `var(--color-neutral-800)`. Third level, for a layer that sits on a card. Light mode has no lighter step than white, so popover matches card there. |
| `--muted-foreground` | `color-mix(in srgb, var(--color-neutral-500) 90%, var(--color-white))` | `var(--color-neutral-500)` |
| `--primary` | `var(--color-neutral-100)` | `var(--color-blue-600)` |
| `--primary-foreground` | `var(--color-neutral-800)` | `var(--color-white)` |
| `--destructive` | `color-mix(in srgb, var(--color-red-500) 90%, var(--color-white))` | `var(--color-red-600)` |
| `--border` | `--alpha(var(--color-white) / 6%)` | `--alpha(var(--color-white) / 10%)` |
| `--destructive-foreground` | `var(--color-red-400)` | `var(--color-red-500)` |
| `--info-foreground` | `var(--color-blue-400)` | `var(--color-blue-600)` |
| `--input` | `--alpha(var(--color-white) / 8%)` | `--alpha(var(--color-white) / 24%)` |
| `--muted` | `--alpha(var(--color-white) / 4%)` | `--alpha(var(--color-white) / 8%)` |

### Tokens added (not in scaffold)

These do not exist in the default COSS theme. Components or utilities may depend on them.

| Token | Light value | Dark value |
|-------|-------------|------------|
| `--border-destructive` | `var(--color-red-500)` | `var(--color-red-500)` |
| `--destructive-outline-border` | `var(--destructive)` | `var(--color-red-400)` |
| `--destructive-outline-foreground` | `var(--destructive-foreground)` | `var(--color-red-400)` |
| `--primary-outline-border` | `var(--primary)` | `var(--color-blue-400)` |
| `--primary-outline-foreground` | `var(--primary)` | `var(--color-blue-300)` |
| `--header` | `var(--neutral-lightest)` | `var(--neutral-darkest)` |
| `--neutral-lightest` | — | `#ffffff` |
| `--neutral-darkest` | — | Tailwind `neutral-950` (`oklch(14.5% 0 0)`). GDS `#121212` |

### Font weight tokens added (shared `:root`)

| Token | Value | Maps to |
|-------|-------|---------|
| `--font-weights-regular` | `424` | Tailwind `font-normal` |
| `--font-weights-semibold` | `600` | Tailwind `font-semibold` |
| `--font-weights-bold` | `720` | Tailwind `font-bold` |

Defined on shared `:root` for the custom preset. The COSS preset overrides `--font-weights-regular` to `400` and `--font-weights-bold` to `700`, and points `--font-sans`, `--font-heading`, and `--font-mono` at Cal Sans and Paper Mono. `font-medium` (500) and `font-semibold` (600) stay the same in both presets.

### `@theme inline` font mappings

| Token | COSS default | Your custom |
|-------|-------------|-------------|
| `--font-heading` | separate `--font-heading` variable | `var(--font-sans)` (single Source Sans 3 instance) |
| `--font-serif` | — | `var(--font-serif)` (Source Serif 4) |
| `--font-weight-normal` | `400` | `var(--font-weights-regular)` (`424`) |
| `--font-weight-semibold` | `600` | `var(--font-weights-semibold)` |
| `--font-weight-bold` | `700` | `var(--font-weights-bold)` (`720`) |

### `@theme inline` color mappings added

Tailwind color aliases wired to the new outline tokens:

```css
--color-destructive-outline-border: var(--destructive-outline-border);
--color-destructive-outline-foreground: var(--destructive-outline-foreground);
--color-primary-outline-border: var(--primary-outline-border);
--color-primary-outline-foreground: var(--primary-outline-foreground);
```

### Palette source (`data-palette`)

The header GDS / Tailwind control sets `data-palette="gds"` on `<html>` (stored as `colors-palette-source`). Absent attribute means Tailwind. A blocking script in `app/layout.tsx` applies the stored choice before paint.

`html[data-palette="gds"]` in `app/globals.css` rewrites `--palette-*`. `@theme static inline` points each `--color-*` ramp at the matching `--palette-*` variable, and utilities inline that same variable. Role tokens (`--primary`, `--background`, and the rest) stay written as `var(--color-…)` and pick up the new ramps in both presets and in light and dark. White and black are unchanged.

The header neutral control sits in the same row as the other switchers. It sets `data-neutral="half"` or `data-neutral="light"` on `<html>` (stored as `colors-neutral-tint`). Absent attribute means the current GDS neutral. Those two rules rewrite only the neutral ramp, and only while GDS is active. Half Tint and Light Tint keep the current lightness from 100 through 900, cut the blue, and darken 1000. Picking either one also switches the palette source to GDS.

Custom role tokens use a raw step. No `color-mix`. Light page background is `neutral-100`, with cards on white. Dark page background is `neutral-950`, with cards on `neutral-900`. The sidebar and header use lightest in light and darkest in dark. Popovers use `neutral-800` in dark mode. Those two ends are not numbered steps: Tailwind lightest is `#ffffff` and darkest is `neutral-950`. GDS lightest is `#ffffff` and darkest is `#121212`.

Tailwind drops `--color-*` declarations that sit outside `@theme`, so the switch cannot write those names directly. `--palette-*` is a normal custom property, which is why the override survives the build.

| Tailwind family | GDS family |
|-----------------|------------|
| neutral | neutral |
| blue, cyan | primary / info |
| red, rose | danger |
| emerald, teal | success |
| amber | warning |
| orange, purple | highlight |

Steps `50` and `100` share GDS `100`. Step `950` uses GDS `1000`. The other steps match by number (`200`→`200` … `900`→`900`). Hex values live in `lib/gds-palette.ts` and are copied into that CSS block.

### Base layer / global CSS

| Change | COSS default | Your custom |
|--------|-------------|-------------|
| `html` font | `@apply font-sans font-mono` | `@apply font-sans` only |
| `body` background | via `@apply bg-background` only | extra rule: `body { background-color: var(--background); }` |
| `--radius` location | inside `:root` token block | shared `:root { --radius: 0.625rem; }` (value unchanged) |

---

## Typography (`app/fonts.ts`, `app/layout.tsx`, `app/globals.css`)

| Change | COSS default (`04292fa`) | Your custom |
|--------|--------------------------|-------------|
| Sans font | Inter (`--font-sans`) | Source Sans 3 via `next/font/google` |
| Serif font | — | Source Serif 4 via `next/font/google` (`preload: false`) |
| Heading font | Inter (`--font-heading`, second instance) | Same Source Sans 3 instance; `--font-heading: var(--font-sans)` in `@theme` |
| Mono font | Geist Mono (`--font-mono`) | Fira Code (`preload: false`) |
| Font definitions | Inline in `layout.tsx` | Centralized in `app/fonts.ts` |
| `<html className>` | `"antialiased", "font-mono", …` then `"font-sans", …` | `"antialiased", "font-sans"` plus Source Sans 3, Source Serif 4, Fira Code, Cal Sans, and Paper Mono variables |
| Display | (default) | `display: "swap"` on all five fonts |

One `Source_Sans_3()` call only (not two) — avoids duplicate hosted font instances per Next.js docs. One `Source_Serif_4()` call sets `--font-serif`. The `04292fa` scaffold loaded Inter and Geist Mono. The COSS preset instead loads the faces coss.com ships, Cal Sans and Paper Mono, from `app/coss-fonts`. Those overrides sit on the same `data-ui-preset="coss-default"` selectors as the stock color tokens, including a subtree. The preset does not override `--font-serif`.

---

## Dependencies (`package.json`)

| Package | COSS default | Your custom |
|---------|-------------|-------------|
| Icons | `lucide-react` | `@phosphor-icons/react` on custom primitives. `lucide-react` stays installed for `components/coss-stock`. |
| Dropzone | — | `react-dropzone` (Kibo UI Dropzone) |

---

## Component changes

### Control height scale (desktop `sm:`)

Aligned form/toolbar control sizes. Compact controls (Badge, Checkbox, Radio, Switch, Kbd) unchanged. Textarea min-heights unchanged.

| Token | COSS default (desktop) | Your custom (desktop) |
|-------|------------------------|------------------------|
| `sm` | 28 | 28 (unchanged) |
| `default` | 32 | 32 (unchanged) |
| `lg` | 36 | **48** |
| `xl` (Button only) | 40 | **56** (kept above `lg`) |

Mobile stays ~4px taller than desktop (`h-13`/`sm:h-12` for `lg`, etc.). Input / NumberField use half-step inner heights so the bordered wrapper measures the target outer px.

**Files:** `button.tsx`, `toggle.tsx`, `input.tsx`, `select.tsx`, `number-field.tsx`, `otp-field.tsx`, `combobox.tsx` (chips). Combobox / Autocomplete single-line inputs inherit via `Input`. Showcase `#sizes` columns updated to 48 / 56.

Field chrome (`input`, `textarea`, `select`, `combobox`, `number-field`, `otp-field`, `input-group`) uses `neutral-lightest` in light mode and `neutral-darkest` in dark mode. Stock used the page background, then a translucent `input` wash in dark mode.

### `components/ui/button.tsx` (variant customizations)

#### New variant: `primary-outline`

Not present in stock COSS. Uses `--primary-outline-border` and `--primary-outline-foreground` tokens.

Usage in this project: `app/page.tsx` (`<Button variant="primary-outline">`).

#### Modified variant: `destructive-outline`

| Aspect | COSS default | Your custom |
|--------|-------------|-------------|
| Border | `border-input` | `border-destructive-outline-border` |
| Text | `text-destructive-foreground` | `text-destructive-outline-foreground` |
| Hover border | `hover:border-destructive/32` | `hover:border-destructive-outline-border` |
| Dark background | `dark:bg-input/32` | `dark:bg-destructive/16` |
| Dark hover/pressed | (none) | `dark:hover:bg-destructive/24`, `dark:data-pressed:bg-destructive/24` |

#### Filled top highlight

`default` and `destructive` use a 1px white inset. Stock is 16%. Custom is 10%. Pressed and disabled still clear it.

### Overlay backdrops

Stock `DialogBackdrop`, `AlertDialogBackdrop`, `SheetBackdrop`, `DrawerBackdrop`, and `CommandDialogBackdrop` use `bg-black/32 backdrop-blur-sm`. Custom drops the blur and uses `bg-black/48` in light and dark. The slash is black opacity: 48% black is darker than 32%. Frozen originals in `components/coss-stock` still blur at 32%.

#### Unchanged button variants

`ghost`, `link`, `outline`, `secondary`, and all `size` options match the scaffold.

### Icon swap primitives (`lucide-react` → `@phosphor-icons/react`)

Import and icon component names only — no styling or behavior changes. Reinstall `lucide-react` and restore files from `04292fa` to revert.

| File | Notes |
|------|-------|
| `accordion.tsx` | `CaretDownIcon` |
| `autocomplete.tsx` | `CaretUpDownIcon`, `XIcon` |
| `breadcrumb.tsx` | `CaretRightIcon`, `DotsThreeIcon` |
| `calendar.tsx` | `CaretLeftIcon`, `CaretRightIcon`, `CaretUpDownIcon` |
| `combobox.tsx` | `CaretUpDownIcon`, `XIcon` |
| `command.tsx` | `MagnifyingGlassIcon` |
| `context-menu.tsx` | `CaretRightIcon` |
| `dialog.tsx` | `XIcon` |
| `drawer.tsx` | `CaretRightIcon`, `XIcon` |
| `menu.tsx` | `CaretRightIcon` |
| `number-field.tsx` | `MinusIcon`, `PlusIcon` |
| `pagination.tsx` | `CaretLeftIcon`, `CaretRightIcon`, `DotsThreeIcon` |
| `select.tsx` | `CaretDownIcon`, `CaretUpIcon`, `CaretUpDownIcon` |
| `sheet.tsx` | `XIcon` |
| `sidebar.tsx` | `SidebarSimpleIcon` |
| `spinner.tsx` | `CircleNotchIcon`; added `"use client"` (Phosphor SSR) |
| `toast.tsx` | `WarningCircleIcon`, `CheckCircleIcon`, `InfoIcon`, `CircleNotchIcon`, `WarningIcon` |

### Unmodified primitives

Identical to commit `04292fa` except `button.tsx`, the height-scaled controls (`toggle`, `input`, `select`, `number-field`, `otp-field`, `combobox`), the overlay backdrops (`dialog`, `alert-dialog`, `sheet`, `drawer`, `command`), and the icon-swapped files above:

`alert`, `avatar`, `badge`, `card`, `checkbox`, `checkbox-group`, `collapsible`, `empty`, `field`, `fieldset`, `form`, `frame`, `group`, `input-group`, `kbd`, `label`, `meter`, `popover`, `preview-card`, `progress`, `radio-group`, `scroll-area`, `separator`, `skeleton`, `slider`, `switch`, `table`, `tabs`, `textarea`, `toggle-group`, `toolbar`, `tooltip`.

The showcase page uses stock `Card`, `CardHeader`, `CardTitle`, `CardDescription`, and `CardPanel` with no component-level edits.

### Third-party drop-ins (not COSS primitives)

Installed with `pnpm dlx shadcn@latest`. `components.json` `style` stayed `new-york`. The CLI added registry URLs:

| Namespace | URL |
|-----------|-----|
| `@magicui` | `https://magicui.design/r/{name}` |
| `@kibo-ui` | `https://www.kibo-ui.com/r/{name}.json` |

`@coss` is unchanged. Semantic token values in `app/globals.css` were not changed. Marquee animation utilities were added inside the existing `@theme inline` block (`--animate-marquee`, `--animate-marquee-vertical`, and the matching `@keyframes`).

| File | Source | Local adaptation |
|------|--------|------------------|
| `components/ui/marquee.tsx` | `@magicui/marquee` | New file. `React.ReactNode` replaced with an imported `ReactNode` type. `"use client"` plus pointer enter/leave state. Pause uses an inline `animationPlayState` because Tailwind's `group-hover:` rule is inside `@media (hover: hover)` and does not run when the browser reports no hover capability, so a moving row swallows clicks. |
| `components/kibo-ui/dropzone/index.tsx` | `@kibo-ui/dropzone` | Uses the existing COSS `Button`. `lucide-react` `UploadIcon` swapped to Phosphor `UploadSimpleIcon`. Button classes include `sm:h-auto` and `whitespace-normal` so the COSS desktop height (`sm:h-8`) does not clip the drop target. |

The Dropzone registry item also depends on shadcn `button`. That overwrite was declined. `components/ui/button.tsx` is still the COSS button. The CLI installed `lucide-react` and the `cn` package as part of that skipped button; both were removed after the Phosphor swap. `react-dropzone` stayed.

No second Button, Dialog, Card, or Input was written into `components/ui/`.

---

## App-only files (not COSS library changes)

These were added for local development and do not change COSS primitives:

| File | Purpose |
|------|---------|
| `app/coss-default-preset.css` | Snapshot of `04292fa` tokens; applied when `data-ui-preset="coss-default"`. Imported from `globals.css` so `--alpha()` compiles. |
| `components/ui-preset-provider.tsx` | Custom / COSS preset toggle + `p` hotkey |
| `components/theme-selector.tsx` | Light/dark + preset UI; Phosphor icons (`MoonIcon`, `SunIcon`, `PaletteIcon`) |
| `components/app-sidebar.tsx` | App sidebar; Phosphor nav icons |
| `app/page.tsx` | Showcase page; Phosphor icons; `"use client"` for Phosphor SSR |
| `app/dashboard/page.tsx`, etc. | Other app pages (not part of COSS registry) |
| `app/sandbox/drop-ins/page.tsx` | Sandbox for the Marquee and Dropzone drop-ins. Linked from the Examples group in `components/library-sidebar.tsx`, above Foundations. The marquee sample button counts on `onPointerDown` so a moving row does not drop the press. |
| `components/playground/button-playground.tsx` | Button gallery and specimen follow the header Custom / COSS toggle. COSS renders `components/coss-stock/button`. Custom renders `components/ui/button`. |

---

## Frozen original and a future COSS release

Two copies, same public props.

| Copy | Path | Import |
|------|------|--------|
| Custom (what the app uses) | `components/ui` | `@/components/ui/...` |
| Original (frozen COSS) | `components/coss-stock` | `@/coss-stock/...` |

`tsconfig.json` maps `@/coss-stock/*` to `./components/coss-stock/*`. `@/*` is unchanged. Do not retarget the shadcn `ui` alias.

`components/coss-stock` is `components/ui` from commit `04292fa`, with sibling imports rewritten from `@/components/ui/` to `@/coss-stock/`. Stock button variants, stock control heights, and Lucide icons stay in that folder. Custom button variants, the height scale, and Phosphor swaps stay in `components/ui`. `marquee.tsx` is not part of the frozen set.

Button comparison is the component page (`/components/button`), not a second column. The header Custom / COSS toggle (and `p`) swaps tokens for the page and swaps the button implementation in the gallery and specimen. COSS shows the stock button (no `primary-outline`, scaffold heights, Lucide loader and example icons). Custom shows the local button. Other component pages still render the custom primitives only.

### Prop rule

Do not add, remove, or change public props on either copy as part of a refresh. A future COSS release may change props; that upstream change is applied to both copies so they stay aligned. Keep local visual diffs: `primary-outline`, restyled `destructive-outline`, the control height scale, overlay backdrops without `backdrop-blur-sm`, Phosphor icon imports, and the semantic token values in `app/globals.css`. Do not port the 100–1000 color scale. Do not change semantic token values while refreshing components.

### Refresh command

`node scripts/refresh-coss-stock.mjs` (`pnpm coss-stock:refresh`). It replaces `components/coss-stock` only. It rewrites `@/components/ui/` and `@/registry/default/ui/` to `@/coss-stock/`, and `@/registry/default/hooks/` plus `@/registry/default/lib/` to the shared `@/hooks/` and `@/lib/` aliases. It does not run the shadcn CLI and does not overwrite `components/ui`.

```bash
# Preview old stock vs new stock. Exit 1 means they differ. Nothing is written.
node scripts/refresh-coss-stock.mjs --ref <git-ref> --diff
node scripts/refresh-coss-stock.mjs --from-dir /tmp/coss-next --diff
node scripts/refresh-coss-stock.mjs --from-registry --diff

# Replace the frozen original from a git ref whose components/ui tree is stock COSS.
node scripts/refresh-coss-stock.mjs --ref <git-ref>

# Replace the frozen original from a directory of COSS primitive files.
node scripts/refresh-coss-stock.mjs --from-dir /tmp/coss-next

# Replace the frozen original from the live @coss registry (https://coss.com/ui/r/{name}.json).
node scripts/refresh-coss-stock.mjs --from-registry

# Same as a replace, then three-way-merge that old→new stock delta onto components/ui.
node scripts/refresh-coss-stock.mjs --from-registry --apply
```

`--from-dir` and `--from-registry` are the registry paths. `shadcn add @coss/<name>` writes through the `ui` alias into `components/ui`. Do not use it to refresh stock.

### How the delta is applied

`--apply` snapshots the current `components/coss-stock` as the merge base, writes the new stock, then runs `git merge-file` for each primitive:

- base: previous stock (`@/coss-stock` imports)
- ours: `components/ui/<file>`
- theirs: new stock (`@/coss-stock` imports)

Lines that changed only locally (heights, variants, Phosphor imports) stay, because base and theirs still agree. Lines that changed only upstream are taken. Overlapping edits leave conflict markers. Custom-only files such as `marquee.tsx` are left alone. Upstream files that disappeared are reported and not deleted from `components/ui`. A new upstream file is added under `components/ui` with imports rewritten back to `@/components/ui/`.

After `--apply`, review conflicts before keeping them. Keep the local visual hunks. Keep public props identical on both copies. Re-run `--diff` only before the replace; once stock has been replaced, a second `--apply` with the same source is a no-op.

## How to restore COSS defaults

### Tokens only (runtime)

Use the **COSS** preset in the header toggle, or press `p`. This applies `app/coss-default-preset.css` (imported from `globals.css`) without editing files.

### Tokens (permanent revert)

```bash
git show 04292fa:app/globals.css > app/globals.css
```

Then remove the `:not([data-ui-preset="coss-default"])` selectors and shared `:root { --radius }` block if you also remove the preset system.

### Button component

```bash
git show 04292fa:components/ui/button.tsx > components/ui/button.tsx
```

### Layout / typography

```bash
git show 04292fa:app/layout.tsx > app/layout.tsx
rm -f app/fonts.ts
# Restore Inter + Geist Mono imports; remove Source Sans 3 / Source Serif 4 / Fira Code
```

Revert font weight tokens and `--font-heading` alias in `app/globals.css` manually or from git.

### Icons (per primitive)

```bash
git show 04292fa:components/ui/<name>.tsx > components/ui/<name>.tsx
npm install lucide-react
npm uninstall @phosphor-icons/react
```

### Full scaffold restore (tokens + button + layout + icons)

```bash
git show 04292fa:app/globals.css > app/globals.css
git show 04292fa:components/ui/button.tsx > components/ui/button.tsx
git show 04292fa:app/layout.tsx > app/layout.tsx
```

---

## Quick diagnostic checklist

When something looks wrong compared to stock COSS:

1. **Toggle COSS preset** — if it fixes the issue, a token in the tables above is the cause.
2. **COSS preset missing borders/washes** — inspect computed `--border` / `--input` / `--muted` on `<html>`. If they are empty or still `--alpha(...)`, the snapshot is not going through Tailwind. Keep `@import "./coss-default-preset.css"` in `globals.css` after `@import "tailwindcss"`.
3. **Check button variants** — `primary-outline` and customized `destructive-outline` only exist in your `button.tsx`.
4. **Check page background** — custom light `--background` is `neutral-100`; dark `--background` is `neutral-950`. Cards and the sidebar are white in light and `neutral-900` in dark. Popover is white in light and `neutral-800` in dark. Scaffold page is white (light) or a mix of `neutral-950` (dark), and its sidebar stays on `neutral-50` / a `neutral-950` mix.
5. **Check input/muted opacity** — custom uses 24% / 8%; scaffold uses 10% / 4% (light) and 8% / 4% (dark).
6. **Confirm primitive** — run `git diff 04292fa -- components/ui/<name>.tsx`; expect diffs in `button.tsx`, height-scaled controls (`toggle`, `input`, `select`, `number-field`, `otp-field`, `combobox`), and the 17 icon-swapped files.
7. **Control heights** — desktop `lg` is 48px (stock 36); Button `xl` is 56px (stock 40). Use `#sizes` on the home showcase to verify.
8. **Icon appearance** — Phosphor stroke/style differs from Lucide; not a token issue.
9. **Fonts** — custom preset uses Source Sans 3, Source Serif 4, Fira Code, and weights 424 / 600 / 720. COSS preset uses Cal Sans, Paper Mono, and weights 400 / 700. Serif stays Source Serif 4 when the preset is COSS.

---

## Regenerating this log

```bash
git diff 04292fa -- app/globals.css app/layout.tsx components/ui/
```

Baseline commit: `04292fa`
