import type { Metadata } from "next"

import { Kanban } from "@/components/kanban/kanban"

export const metadata: Metadata = {
  title: "Kanban",
}

export default function KanbanPage() {
  return <Kanban />
}
