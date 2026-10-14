"use client"

import {
  BuildingsIcon,
  CellSignalHighIcon,
  CellSignalLowIcon,
  CellSignalMediumIcon,
  CheckCircleIcon,
  CircleDashedIcon,
  CircleHalfIcon,
  CircleIcon,
  FolderDashedIcon,
  FolderIcon,
  MinusIcon,
  WarningCircleIcon,
  type Icon,
} from "@phosphor-icons/react"
import { useState, type FormEvent, type ReactElement } from "react"

import {
  CanvasIntro,
  PlaygroundShell,
} from "@/components/playground/playground-shell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@/components/ui/combobox"
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Menu,
  MenuPopup,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
} from "@/components/ui/menu"
import { Textarea } from "@/components/ui/textarea"

type Choice = {
  value: string
  label: string
  icon: Icon
}

type Person = {
  value: string
  label: string
  initials: string
}

type IssueLabel = {
  value: string
  label: string
}

const teams: Choice[] = [
  { value: "engineering", label: "Engineering", icon: BuildingsIcon },
  { value: "design", label: "Design", icon: BuildingsIcon },
  { value: "product", label: "Product", icon: BuildingsIcon },
]

const statuses: Choice[] = [
  { value: "backlog", label: "Backlog", icon: CircleDashedIcon },
  { value: "todo", label: "Todo", icon: CircleIcon },
  { value: "in-progress", label: "In Progress", icon: CircleHalfIcon },
  { value: "done", label: "Done", icon: CheckCircleIcon },
]

const priorities: Choice[] = [
  { value: "none", label: "No Priority", icon: MinusIcon },
  { value: "low", label: "Low", icon: CellSignalLowIcon },
  { value: "medium", label: "Medium", icon: CellSignalMediumIcon },
  { value: "high", label: "High", icon: CellSignalHighIcon },
  { value: "urgent", label: "Urgent", icon: WarningCircleIcon },
]

const people: Person[] = [
  { value: "unassigned", label: "No Assignee", initials: "–" },
  { value: "ada", label: "Ada Lovelace", initials: "AL" },
  { value: "grace", label: "Grace Hopper", initials: "GH" },
  { value: "alan", label: "Alan Turing", initials: "AT" },
]

const projects: Choice[] = [
  { value: "none", label: "No Project", icon: FolderDashedIcon },
  { value: "design-system", label: "Design System", icon: FolderIcon },
  { value: "sandbox", label: "Sandbox", icon: FolderIcon },
]

const labelOptions: IssueLabel[] = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "improvement", label: "Improvement" },
  { value: "docs", label: "Docs" },
]

function findChoice(options: Choice[], value: string): Choice {
  const match = options.find((option) => option.value === value)
  if (!match) {
    return options[0]
  }
  return match
}

function findPerson(value: string): Person {
  const match = people.find((person) => person.value === value)
  if (!match) {
    return people[0]
  }
  return match
}

function ChoiceMenu({
  groupLabel,
  options,
  value,
  onValueChange,
}: {
  groupLabel: string
  options: Choice[]
  value: string
  onValueChange: (value: string) => void
}): ReactElement {
  const selected = findChoice(options, value)
  const SelectedIcon = selected.icon

  return (
    <Menu>
      <MenuTrigger
        aria-label={`${groupLabel}, ${selected.label}`}
        render={<Button size="sm" type="button" variant="outline" />}
      >
        <SelectedIcon aria-hidden="true" />
        {selected.label}
      </MenuTrigger>
      <MenuPopup align="start">
        <MenuRadioGroup
          aria-label={groupLabel}
          onValueChange={(next) => {
            if (typeof next === "string") {
              onValueChange(next)
            }
          }}
          value={value}
        >
          {options.map((option) => {
            const OptionIcon = option.icon
            return (
              <MenuRadioItem key={option.value} value={option.value}>
                <span className="inline-flex items-center gap-2">
                  <OptionIcon aria-hidden="true" />
                  {option.label}
                </span>
              </MenuRadioItem>
            )
          })}
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  )
}

function AssigneeMenu({
  value,
  onValueChange,
}: {
  value: string
  onValueChange: (value: string) => void
}): ReactElement {
  const selected = findPerson(value)

  return (
    <Menu>
      <MenuTrigger
        aria-label={`Assignee, ${selected.label}`}
        render={<Button size="sm" type="button" variant="outline" />}
      >
        <Avatar className="size-4">
          <AvatarFallback>{selected.initials}</AvatarFallback>
        </Avatar>
        {selected.label}
      </MenuTrigger>
      <MenuPopup align="start">
        <MenuRadioGroup
          aria-label="Assignee"
          onValueChange={(next) => {
            if (typeof next === "string") {
              onValueChange(next)
            }
          }}
          value={value}
        >
          {people.map((person) => (
            <MenuRadioItem key={person.value} value={person.value}>
              <span className="inline-flex items-center gap-2">
                <Avatar className="size-5">
                  <AvatarFallback>{person.initials}</AvatarFallback>
                </Avatar>
                {person.label}
              </span>
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  )
}

function LabelCombobox({
  value,
  onValueChange,
}: {
  value: IssueLabel[]
  onValueChange: (value: IssueLabel[]) => void
}): ReactElement {
  return (
    <Combobox
      items={labelOptions}
      multiple
      onValueChange={onValueChange}
      value={value}
    >
      <ComboboxChips>
        <ComboboxValue>
          {(selected: IssueLabel[] | undefined) => {
            const items = selected ?? []
            return (
              <>
                {items.map((item) => (
                  <ComboboxChip aria-label={item.label} key={item.value}>
                    {item.label}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  aria-label="Labels"
                  placeholder={items.length > 0 ? "" : "Labels"}
                />
              </>
            )
          }}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxEmpty>No Labels.</ComboboxEmpty>
        <ComboboxList>
          {(item: IssueLabel) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  )
}

function CreateIssueDialog(): ReactElement {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [team, setTeam] = useState(teams[0].value)
  const [status, setStatus] = useState(statuses[1].value)
  const [priority, setPriority] = useState(priorities[0].value)
  const [assignee, setAssignee] = useState(people[0].value)
  const [project, setProject] = useState(projects[0].value)
  const [labels, setLabels] = useState<IssueLabel[]>([])
  const [createMore, setCreateMore] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    if (createMore) {
      setTitle("")
      setDescription("")
      return
    }
    setOpen(false)
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger render={<Button type="button" />}>
        Create Issue
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle className="sr-only">New Issue</DialogTitle>
          <div className="self-start">
            <ChoiceMenu
              groupLabel="Team"
              onValueChange={setTeam}
              options={teams}
              value={team}
            />
          </div>
        </DialogHeader>
        <form className="contents" onSubmit={handleSubmit}>
          <DialogPanel>
            <div className="flex flex-col gap-4">
              <Input
                aria-label="Issue Title"
                className="block w-full"
                onChange={(event) => {
                  setTitle(event.target.value)
                }}
                placeholder="Issue Title"
                type="text"
                unstyled
                value={title}
              />
              <Textarea
                aria-label="Description"
                className="block w-full"
                onChange={(event) => {
                  setDescription(event.target.value)
                }}
                placeholder="Add Description…"
                unstyled
                value={description}
              />
              <div className="flex flex-wrap gap-2">
                <ChoiceMenu
                  groupLabel="Status"
                  onValueChange={setStatus}
                  options={statuses}
                  value={status}
                />
                <ChoiceMenu
                  groupLabel="Priority"
                  onValueChange={setPriority}
                  options={priorities}
                  value={priority}
                />
                <AssigneeMenu onValueChange={setAssignee} value={assignee} />
                <ChoiceMenu
                  groupLabel="Project"
                  onValueChange={setProject}
                  options={projects}
                  value={project}
                />
              </div>
              <LabelCombobox onValueChange={setLabels} value={labels} />
            </div>
          </DialogPanel>
          <DialogFooter variant="bare">
            <Label>
              <Checkbox checked={createMore} onCheckedChange={setCreateMore} />
              Create More
            </Label>
            <Button type="submit">Create Issue</Button>
          </DialogFooter>
        </form>
      </DialogPopup>
    </Dialog>
  )
}

export default function CreateIssuePage(): ReactElement {
  return (
    <PlaygroundShell>
      <CanvasIntro
        description="A create-issue dialog assembled from the current dialog, menu, input, and combobox parts."
        title="Create Issue"
      />
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <CreateIssueDialog />
      </div>
    </PlaygroundShell>
  )
}
