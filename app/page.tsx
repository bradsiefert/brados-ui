import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Kbd } from "@/components/ui/kbd"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FormShowcase } from "@/components/form-showcase"
import { ThemeSelector } from "@/components/theme-selector"

export default function Page() {
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            COSS UI Test App
          </h1>
          <p className="text-muted-foreground">
            A minimal showcase to validate components, tokens, and fonts locally.
          </p>
          <p className="text-muted-foreground text-sm">
            Use the theme selector or press <Kbd>d</Kbd> to switch modes.
          </p>
        </div>
        <ThemeSelector />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Default button variants.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="primary-outline">Primary</Button>
          {/* <Button variant="secondary">Secondary</Button> */}
          <Button variant="outline">Neutral</Button>
          <Button variant="destructive">Danger</Button>
          <Button variant="destructive-outline">Danger</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>
            Semantic color tokens (info, success, warning).
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Badge variant="info">Info</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>Interactive Base UI primitive.</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <FormShowcase />

      <Card>
        <CardHeader>
          <CardTitle>Dialog</CardTitle>
          <CardDescription>
            Modal with heading font (<code className="font-mono text-xs">--font-heading</code>).
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  )
}
