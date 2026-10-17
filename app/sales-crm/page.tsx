import type { Metadata } from "next"

import { SalesCrm } from "@/components/sales-crm/sales-crm"

export const metadata: Metadata = {
  title: "Sales CRM",
}

export default function SalesCrmPage() {
  return <SalesCrm />
}
