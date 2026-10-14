export const gdsSteps = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
] as const

type GdsStep = (typeof gdsSteps)[number]

type GdsHexes = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
]

export type GdsFamily = {
  name: string
  hexes: GdsHexes
}

export type GdsSwatch = {
  step: GdsStep
  hex: string
  token: string
}

/** Standard blue ramp. Primary and info share these values. Branded purple is excluded. */
export const gdsFamilies: readonly GdsFamily[] = [
  {
    name: "neutral",
    hexes: [
      "#f7f7f7",
      "#edeeef",
      "#d5d7db",
      "#b7bcc3",
      "#818791",
      "#6b7280",
      "#4f5562",
      "#343944",
      "#242831",
      "#191b22",
    ],
  },
  {
    name: "primary",
    hexes: [
      "#f0f7ff",
      "#d9eafe",
      "#abcffd",
      "#66a8fd",
      "#3a89fd",
      "#0c57cd",
      "#063b99",
      "#052b74",
      "#041c4f",
      "#03122f",
    ],
  },
  {
    name: "danger",
    hexes: [
      "#feecec",
      "#fedcdc",
      "#feada9",
      "#fc817c",
      "#f4534f",
      "#d12828",
      "#ab1a1d",
      "#7e130e",
      "#5c0b09",
      "#3b0807",
    ],
  },
  {
    name: "warning",
    hexes: [
      "#fff3e0",
      "#ffe4c2",
      "#fec880",
      "#fba94b",
      "#f39129",
      "#d26e16",
      "#a2520c",
      "#753c08",
      "#553008",
      "#3c2109",
    ],
  },
  {
    name: "success",
    hexes: [
      "#e2fdee",
      "#c0f6dc",
      "#71e0b0",
      "#29c68c",
      "#1aad74",
      "#088556",
      "#086945",
      "#0a4e35",
      "#063724",
      "#052618",
    ],
  },
  {
    name: "highlight",
    hexes: [
      "#fbfbb7",
      "#f4f587",
      "#efe752",
      "#d6ce31",
      "#beb71f",
      "#a29f14",
      "#807d0f",
      "#65620a",
      "#494606",
      "#2f2c03",
    ],
  },
  {
    name: "info",
    hexes: [
      "#f0f7ff",
      "#d9eafe",
      "#abcffd",
      "#66a8fd",
      "#3a89fd",
      "#0c57cd",
      "#063b99",
      "#052b74",
      "#041c4f",
      "#03122f",
    ],
  },
]

export const gdsNeutralEnds = [
  {
    name: "lightest",
    token: "--color-neutral-lightest",
    hex: "#ffffff",
  },
  {
    name: "darkest",
    token: "--color-neutral-darkest",
    hex: "#121212",
  },
] as const

export function gdsSwatches(family: GdsFamily): GdsSwatch[] {
  return gdsSteps.map((step, index) => {
    const hex = family.hexes[index]
    return {
      step,
      hex,
      token: `--color-${family.name}-${step}`,
    }
  })
}
