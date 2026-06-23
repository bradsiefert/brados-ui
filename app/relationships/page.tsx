"use client"

import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field"
import { Separator } from "@/components/ui/separator"
import { ThemeSelector } from "@/components/theme-selector"

function countRelationships(n: number): number {
  if (n < 2) return 0
  return (n * (n - 1)) / 2
}

export default function RelationshipsPage() {
  const [people, setPeople] = React.useState(5)
  const relationships = countRelationships(people)

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 p-8">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Relationships Calculator
          </h1>
          <p className="text-muted-foreground">
            Calculate the total number of unique pairings in a group using the
            handshake problem formula.
          </p>
        </div>
        <ThemeSelector />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Calculator</CardTitle>
          <CardDescription>
            Enter the number of people in a group to find how many unique
            relationships can exist between them.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Field name="people">
            <FieldLabel>Number of people</FieldLabel>
            <FieldDescription>
              Each person can pair with everyone else in the group.
            </FieldDescription>
            <NumberField
              min={0}
              value={people}
              onValueChange={(value) => setPeople(value ?? 0)}
            >
              <NumberFieldGroup>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldGroup>
            </NumberField>
          </Field>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-sm">
                Total unique relationships
              </p>
              <Badge variant="info">N</Badge>
            </div>
            <p className="font-heading text-4xl font-semibold tabular-nums tracking-tight">
              {relationships.toLocaleString()}
            </p>
            <p className="text-muted-foreground text-sm">
              {people.toLocaleString()} people can form{" "}
              {relationships.toLocaleString()} unique{" "}
              {relationships === 1 ? "relationship" : "relationships"}.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it works</CardTitle>
          <CardDescription>
            The handshake problem from combinatorics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion>
            <AccordionItem value="formula">
              <AccordionTrigger>The formula</AccordionTrigger>
              <AccordionContent>
                <p>
                  The formula{" "}
                  <span className="font-mono text-foreground">
                    N = n(n − 1) / 2
                  </span>{" "}
                  calculates the total number of unique relationships, pairings,
                  or connections that can exist within a group of{" "}
                  <span className="font-mono text-foreground">n</span> people.
                </p>
                <ul className="mt-3 list-disc space-y-1 ps-5">
                  <li>
                    <span className="font-mono text-foreground">n</span> — the
                    number of individuals in the group
                  </li>
                  <li>
                    <span className="font-mono text-foreground">N</span> — the
                    total number of unique pairings
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="why-divide">
              <AccordionTrigger>Why divide by 2?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Every individual in a group of{" "}
                  <span className="font-mono text-foreground">n</span> people
                  can connect with everyone else except themselves, giving each
                  person{" "}
                  <span className="font-mono text-foreground">n − 1</span>{" "}
                  potential connections.
                </p>
                <p className="mt-3">
                  Multiplying{" "}
                  <span className="font-mono text-foreground">n</span> by{" "}
                  <span className="font-mono text-foreground">n − 1</span>{" "}
                  counts every connection twice — once from each person&apos;s
                  perspective. Dividing by 2 gives the actual number of unique
                  pairings.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
