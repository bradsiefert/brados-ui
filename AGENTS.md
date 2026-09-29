<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## COSS customization agent

This repo tracks local changes on top of stock COSS UI. See [COSS-CUSTOMIZATION-LOG.md](COSS-CUSTOMIZATION-LOG.md) and `.cursor/rules/coss-customization-agent.mdc`.

- **Baseline:** git `04292fa`
- **Custom tokens:** `app/globals.css`
- **Stock snapshot:** `app/coss-default-preset.css` (COSS preset toggle)
- **Only modified primitives (beyond icons):** `components/ui/button.tsx` (+ height scale on toggle/input/select/number-field/otp-field/combobox)
