import type { Metadata } from "next"

import { WorkflowEditor } from "@/components/workflow/workflow-editor"

export const metadata: Metadata = {
  title: "Workflow Editor",
}

export default function WorkflowEditorPage() {
  return <WorkflowEditor />
}
