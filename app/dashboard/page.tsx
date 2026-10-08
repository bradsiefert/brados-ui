import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DashboardShell } from "@/components/dashboard-shell"
import { ThemeSelector } from "@/components/theme-selector"
import {
  recentActivity,
  recentOrders,
  stats,
  type OrderStatus,
} from "@/lib/dashboard-data"

function statusVariant(
  status: OrderStatus,
): "success" | "warning" | "error" {
  switch (status) {
    case "completed":
      return "success"
    case "pending":
      return "warning"
    case "failed":
      return "error"
  }
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <header className="flex items-center justify-between gap-4 border-b px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <h1 className="font-heading text-xl font-semibold tracking-tight">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Overview of your business metrics
            </p>
          </div>
        </div>
        <ThemeSelector />
      </header>

      <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardDescription>{stat.label}</CardDescription>
                <CardTitle className="font-heading text-3xl font-semibold tabular-nums">
                  {stat.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={stat.trend === "up" ? "success" : "warning"}
                >
                  {stat.delta}
                </Badge>
                <span className="ms-2 text-muted-foreground text-sm">
                  vs last month
                </span>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest transactions across all channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table variant="card">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell className="tabular-nums">
                        {order.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(order.status)}>
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events in your workspace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={item.id}>
                  <p className="text-sm leading-snug">{item.action}</p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    {item.time}
                  </p>
                  {index < recentActivity.length - 1 ? (
                    <Separator className="mt-4" />
                  ) : null}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
