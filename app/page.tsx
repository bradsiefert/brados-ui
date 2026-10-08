import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PlaygroundShell } from "@/components/playground/playground-shell"

export default function Page() {
  return (
    <PlaygroundShell>
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="space-y-2 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">brados-ui</h2>
          <p className="text-muted-foreground text-sm">
            A personal design system for components and color.
          </p>
        </div>
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border bg-card p-6">
          <div className="flex flex-wrap gap-2">
            <Button>Continue</Button>
            <Button variant="outline">Preview</Button>
            <Button variant="ghost">Skip</Button>
          </div>
          <Input aria-label="Email" placeholder="Email" />
          <div className="flex items-center justify-between gap-3">
            <Badge>New</Badge>
            <div className="flex items-center gap-2">
              <Label htmlFor="welcome-notifications">Notifications</Label>
              <Switch defaultChecked id="welcome-notifications" />
            </div>
          </div>
        </div>
      </div>
    </PlaygroundShell>
  )
}
