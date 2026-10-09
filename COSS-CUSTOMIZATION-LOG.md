# COSS customization log

Reference for every change made to the default COSS UI scaffold in this project. Use this when debugging issues against stock COSS behavior or when reverting customizations.

**Baseline:** git commit `04292fa` (`feat: initial commit`) — state after `npx shadcn init @coss/style`.

**Last reviewed:** 2026-10-09 (frozen original set in `components/coss-stock`).

---

## Summary

| Area | Files changed | Notes |
|------|---------------|-------|
| Design tokens | `app/globals.css` | 20+ semantic token overrides (light + dark); font weight tokens |
| Typography | `app/fonts.ts`, `app/layout.tsx`, `app/globals.css`, `app/coss-default-preset.css` | Custom: Source Sans 3, Fira Code, weights 424 / 600 / 720. COSS preset uses Cal Sans and Paper Mono (the faces coss.com ships) and weights 400 / 700. |
| Dependencies | `package.json` | Custom primitives use `@phosphor-icons/react`. `lucide-react` is installed again for `components/coss-stock` only. |
| UI primitives | `components/ui/button.tsx` | Custom variants + control height scale |
| UI primitives | height scale (see below) | `sm`/`default`/`lg`/`xl` desktop heights: 28 / 32 / 48 / 56 |
| UI primitives | 17 icon-swapped files (see below) | `lucide-react` → `@phosphor-icons/react` imports only |
| Preset tooling | `app/coss-default-preset.css`, `components/ui-preset-provider.tsx`, `components/theme-selector.tsx` | Restores baseline tokens at runtime (not part of COSS library). The same attribute also scopes a subtree. |
| Frozen original | `components/coss-stock/`, `scripts/refresh-coss-stock.mjs` | Stock primitives from `04292fa`. App still imports `components/ui`. |
| Third-party drop-ins | `components/ui/marquee.tsx`, `components/kibo-ui/dropzone/index.tsx` | Magic UI Marquee and Kibo UI Dropzone. Not COSS primitives. See below. |

All other files under `components/ui/` match the scaffold except `button.tsx`, the height-scaled controls listed below, the icon-swapped primitives, and `marquee.tsx` (third-party drop-in, not a COSS primitive edit).

---

## Token changes (`app/globals.css`)

Custom values live in `:root:not([data-ui-preset="coss-default"]), [data-ui-preset="custom"]` and `.dark:not([data-ui-preset="coss-default"]), .dark [data-ui-preset="custom"]`. Stock values live in `app/coss-default-preset.css` on `:root[data-ui-preset="coss-default"], [data-ui-preset="coss-default"]` and `.dark[data-ui-preset="coss-default"], .dark [data-ui-preset="coss-default"]`. Semantic token values are unchanged. The extra selectors set those same values on the element that carries the attribute, so a subtree can use stock tokens while the rest of the page stays custom (and the reverse). Dark mode still follows `.dark` on `<html>`. The header toggle and the `p` hotkey still set or remove the attribute on `<html>`.

That snapshot **must** be `@import`ed from `app/globals.css` (after `@import "tailwindcss"`) so Tailwind compiles `--alpha()` at build time. Do not import it from `layout.tsx` as a sibling CSS file — `--alpha()` is not valid CSS in the browser, so border/input/muted/secondary/accent tokens get dropped and the COSS preset looks broken. `@theme inline` emits utilities as `var(--primary)` (and the other semantic names), so a subtree override of those variables changes `bg-primary` and the other color utilities inside it.

### Light mode (`:root`)

| Token | COSS default | Your custom |
|-------|-------------|-------------|
| `--background` | `var(--color-white)` | `var(--color-neutral-50)` |
| `--primary` | `var(--color-neutral-800)` | `var(--color-blue-600)` |
| `--primary-foreground` | `var(--color-neutral-50)` | `var(--color-white)` |
| `--destructive` | `var(--color-red-500)` | `var(--color-red-600)` |
| `--input` | `--alpha(var(--color-black) / 10%)` | `--alpha(var(--color-black) / 24%)` |
| `--muted` | `--alpha(var(--color-black) / 4%)` | `--alpha(var(--color-black) / 8%)` |

### Dark mode (`.dark`)

| Token | COSS default | Your custom |
|-------|-------------|-------------|
| `--background` | `color-mix(in srgb, var(--color-neutral-950) 95%, var(--color-white))` | `color-mix(in srgb, var(--color-neutral-950) 88%, var(--color-black))` |
| `--primary` | `var(--color-neutral-100)` | `var(--color-blue-600)` |
| `--primary-foreground` | `var(--color-neutral-800)` | `var(--color-white)` |
| `--destructive` | `color-mix(in srgb, var(--color-red-500) 90%, var(--color-white))` | `color-mix(in srgb, var(--color-red-600) 90%, var(--color-white))` |
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
| Heading font | Inter (`--font-heading`, second instance) | Same Source Sans 3 instance; `--font-heading: var(--font-sans)` in `@theme` |
| Mono font | Geist Mono (`--font-mono`) | Fira Code (`preload: false`) |
| Font definitions | Inline in `layout.tsx` | Centralized in `app/fonts.ts` |
| `<html className>` | `"antialiased", "font-mono", …` then `"font-sans", …` | `"antialiased", "font-sans"` plus Source Sans 3, Fira Code, Cal Sans, and Paper Mono variables |
| Display | (default) | `display: "swap"` on all four fonts |

One `Source_Sans_3()` call only (not two) — avoids duplicate hosted font instances per Next.js docs. The `04292fa` scaffold loaded Inter and Geist Mono. The COSS preset instead loads the faces coss.com ships, Cal Sans and Paper Mono, from `app/coss-fonts`. Those overrides sit on the same `data-ui-preset="coss-default"` selectors as the stock color tokens, including a subtree.

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

#### Unchanged button variants

`default`, `destructive`, `ghost`, `link`, `outline`, `secondary`, and all `size` options match the scaffold.

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

Identical to commit `04292fa` except `button.tsx`, the height-scaled controls (`toggle`, `input`, `select`, `number-field`, `otp-field`, `combobox`), and the icon-swapped files above:

`alert`, `alert-dialog`, `avatar`, `badge`, `card`, `checkbox`, `checkbox-group`, `collapsible`, `empty`, `field`, `fieldset`, `form`, `frame`, `group`, `input-group`, `kbd`, `label`, `meter`, `popover`, `preview-card`, `progress`, `radio-group`, `scroll-area`, `separator`, `skeleton`, `slider`, `switch`, `table`, `tabs`, `textarea`, `toggle-group`, `toolbar`, `tooltip`.

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
| `app/sandbox/drop-ins/page.tsx` | Sandbox for the Marquee and Dropzone drop-ins. Header link in `components/playground/playground-shell.tsx`. The marquee sample button counts on `onPointerDown` so a moving row does not drop the press. |
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

Do not add, remove, or change public props on either copy as part of a refresh. A future COSS release may change props; that upstream change is applied to both copies so they stay aligned. Keep local visual diffs: `primary-outline`, restyled `destructive-outline`, the control height scale, Phosphor icon imports, and the semantic token values in `app/globals.css`. Do not port the 100–1000 color scale. Do not change semantic token values while refreshing components.

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
# Restore Inter + Geist Mono imports; remove Source Sans 3 / Fira Code
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
4. **Check page background** — custom `--background: neutral-50` makes white cards pop; scaffold uses white-on-white (border/shadow only).
5. **Check input/muted opacity** — custom uses 24% / 8%; scaffold uses 10% / 4% (light) and 8% / 4% (dark).
6. **Confirm primitive** — run `git diff 04292fa -- components/ui/<name>.tsx`; expect diffs in `button.tsx`, height-scaled controls (`toggle`, `input`, `select`, `number-field`, `otp-field`, `combobox`), and the 17 icon-swapped files.
7. **Control heights** — desktop `lg` is 48px (stock 36); Button `xl` is 56px (stock 40). Use `#sizes` on the home showcase to verify.
8. **Icon appearance** — Phosphor stroke/style differs from Lucide; not a token issue.
9. **Fonts** — custom preset uses Source Sans 3, Fira Code, and weights 424 / 600 / 720. COSS preset uses Cal Sans, Paper Mono, and weights 400 / 700.

---

## Regenerating this log

```bash
git diff 04292fa -- app/globals.css app/layout.tsx components/ui/
```

Baseline commit: `04292fa`
