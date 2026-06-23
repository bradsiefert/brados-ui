export type Stat = {
  label: string
  value: string
  delta: string
  trend: "up" | "down"
}

export type OrderStatus = "completed" | "pending" | "failed"

export type RecentOrder = {
  id: string
  customer: string
  product: string
  amount: string
  status: OrderStatus
  date: string
}

export type ActivityItem = {
  id: string
  action: string
  time: string
}

export const stats: Stat[] = [
  {
    label: "Revenue",
    value: "$48,290",
    delta: "+12.5%",
    trend: "up",
  },
  {
    label: "Active Users",
    value: "2,847",
    delta: "+8.2%",
    trend: "up",
  },
  {
    label: "Orders",
    value: "1,204",
    delta: "-3.1%",
    trend: "down",
  },
  {
    label: "Conversion",
    value: "3.2%",
    delta: "+0.4%",
    trend: "up",
  },
]

export const recentOrders: RecentOrder[] = [
  {
    id: "ORD-1042",
    customer: "Sarah Chen",
    product: "Pro Plan",
    amount: "$299.00",
    status: "completed",
    date: "Jun 14, 2026",
  },
  {
    id: "ORD-1041",
    customer: "Marcus Webb",
    product: "Starter Kit",
    amount: "$49.00",
    status: "pending",
    date: "Jun 14, 2026",
  },
  {
    id: "ORD-1040",
    customer: "Elena Rodriguez",
    product: "Enterprise",
    amount: "$1,200.00",
    status: "completed",
    date: "Jun 13, 2026",
  },
  {
    id: "ORD-1039",
    customer: "James Okonkwo",
    product: "Add-on Pack",
    amount: "$79.00",
    status: "failed",
    date: "Jun 13, 2026",
  },
  {
    id: "ORD-1038",
    customer: "Priya Sharma",
    product: "Pro Plan",
    amount: "$299.00",
    status: "completed",
    date: "Jun 12, 2026",
  },
  {
    id: "ORD-1037",
    customer: "Tom Bradley",
    product: "Starter Kit",
    amount: "$49.00",
    status: "pending",
    date: "Jun 12, 2026",
  },
  {
    id: "ORD-1036",
    customer: "Aisha Patel",
    product: "Pro Plan",
    amount: "$299.00",
    status: "completed",
    date: "Jun 11, 2026",
  },
  {
    id: "ORD-1035",
    customer: "David Kim",
    product: "Enterprise",
    amount: "$1,200.00",
    status: "completed",
    date: "Jun 11, 2026",
  },
]

export const recentActivity: ActivityItem[] = [
  {
    id: "act-1",
    action: "New enterprise signup from Northwind Traders",
    time: "2 minutes ago",
  },
  {
    id: "act-2",
    action: "Payment received for order ORD-1042",
    time: "18 minutes ago",
  },
  {
    id: "act-3",
    action: "Failed payment retry succeeded for ORD-1039",
    time: "1 hour ago",
  },
  {
    id: "act-4",
    action: "Weekly report exported by admin@acme.com",
    time: "3 hours ago",
  },
  {
    id: "act-5",
    action: "12 new users joined the Starter plan",
    time: "5 hours ago",
  },
]
