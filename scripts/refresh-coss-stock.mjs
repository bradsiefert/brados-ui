#!/usr/bin/env node
/**
 * Refresh the frozen COSS primitives in components/coss-stock.
 *
 * Default source is git commit 04292fa (components/ui at that ref).
 * Writes only components/coss-stock unless --apply is set.
 * Never calls the shadcn CLI and never replaces components/ui wholesale.
 *
 *   node scripts/refresh-coss-stock.mjs
 *   node scripts/refresh-coss-stock.mjs --ref <git-ref>
 *   node scripts/refresh-coss-stock.mjs --from-dir <dir-of-tsx>
 *   node scripts/refresh-coss-stock.mjs --from-registry
 *   node scripts/refresh-coss-stock.mjs --from-dir <dir> --diff
 *   node scripts/refresh-coss-stock.mjs --from-registry --apply
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const root = process.cwd()
const stockDir = path.join(root, "components", "coss-stock")
const customDir = path.join(root, "components", "ui")
const defaultRef = "04292fa"

function fail(message) {
  console.error(message)
  process.exit(1)
}

function parseArgs(argv) {
  const args = {
    ref: defaultRef,
    fromDir: null,
    fromRegistry: false,
    apply: false,
    diff: false,
    help: false,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === "--help" || arg === "-h") {
      args.help = true
    } else if (arg === "--apply") {
      args.apply = true
    } else if (arg === "--diff") {
      args.diff = true
    } else if (arg === "--ref") {
      const ref = argv[index + 1]
      if (!ref || ref.startsWith("--")) {
        fail("--ref requires a git ref")
      }
      args.ref = ref
      index += 1
    } else if (arg === "--from-registry") {
      args.fromRegistry = true
    } else if (arg === "--from-dir") {
      const dir = argv[index + 1]
      if (!dir || dir.startsWith("--")) {
        fail("--from-dir requires a directory of COSS primitive files")
      }
      args.fromDir = dir
      index += 1
    } else {
      fail(`Unknown argument: ${arg}`)
    }
  }

  if (args.apply && args.diff) {
    fail("Use either --diff or --apply")
  }

  if (args.fromRegistry && args.fromDir) {
    fail("Use either --from-registry or --from-dir")
  }

  return args
}

function printHelp() {
  console.log(`Usage: node scripts/refresh-coss-stock.mjs [options]

Replace components/coss-stock with a COSS snapshot and rewrite
@/components/ui/ imports to @/coss-stock/.

Options:
  --ref <git-ref>     Read components/ui from this git ref (default ${defaultRef})
  --from-dir <dir>    Read .ts/.tsx files from a directory (a registry drop)
  --from-registry     Read @coss ui items from https://coss.com/ui/r/*.json
  --diff              Show the old-stock vs new-stock diff and do not write
  --apply             Three-way-merge that upstream delta onto components/ui
  --help

--from-registry and --from-dir write components/coss-stock only.
Do not run shadcn add against components/ui.

--apply keeps local visual edits when they do not overlap the upstream hunk.
It does not delete custom-only files (for example marquee.tsx).
Conflict markers are left in place for review.
`)
}

function rewriteToStock(source) {
  return source
    .replaceAll("@/registry/default/ui/", "@/coss-stock/")
    .replaceAll("@/registry/default/hooks/", "@/hooks/")
    .replaceAll("@/registry/default/lib/", "@/lib/")
    .replaceAll("@/components/ui/", "@/coss-stock/")
}

function rewriteToCustom(source) {
  return source.replaceAll("@/coss-stock/", "@/components/ui/")
}

function runGit(args, options = {}) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    ...options,
  })
}

function listFromGit(ref) {
  let output = ""
  try {
    output = runGit(["ls-tree", "--name-only", "-r", ref, "components/ui"])
  } catch (error) {
    const stderr = error instanceof Error ? error.message : String(error)
    fail(`Could not list components/ui at ${ref}: ${stderr}`)
  }

  const files = new Map()
  for (const line of output.split("\n")) {
    if (!line.endsWith(".ts") && !line.endsWith(".tsx")) {
      continue
    }
    const relative = line.slice("components/ui/".length)
    let source = ""
    try {
      source = runGit(["show", `${ref}:${line}`])
    } catch (error) {
      const stderr = error instanceof Error ? error.message : String(error)
      fail(`Could not read ${ref}:${line}: ${stderr}`)
    }
    files.set(relative, rewriteToStock(source))
  }

  if (files.size === 0) {
    fail(`No components/ui TypeScript files at ${ref}`)
  }

  return files
}

function listFromDir(dir) {
  const absolute = path.resolve(root, dir)
  if (!fs.existsSync(absolute) || !fs.statSync(absolute).isDirectory()) {
    fail(`--from-dir is not a directory: ${absolute}`)
  }

  const files = new Map()
  const entries = fs.readdirSync(absolute, { recursive: true, withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isFile()) {
      continue
    }
    const parent = entry.parentPath ?? entry.path
    const fullPath = path.join(parent, entry.name)
    if (!fullPath.endsWith(".ts") && !fullPath.endsWith(".tsx")) {
      continue
    }
    const relative = path.relative(absolute, fullPath)
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      fail(`Refusing to read outside --from-dir: ${fullPath}`)
    }
    files.set(relative, rewriteToStock(fs.readFileSync(fullPath, "utf8")))
  }

  if (files.size === 0) {
    fail(`No .ts or .tsx files in ${absolute}`)
  }

  return files
}

function readStockFiles() {
  if (!fs.existsSync(stockDir)) {
    return new Map()
  }
  const files = new Map()
  const entries = fs.readdirSync(stockDir, { recursive: true, withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isFile()) {
      continue
    }
    const parent = entry.parentPath ?? entry.path
    const fullPath = path.join(parent, entry.name)
    if (!fullPath.endsWith(".ts") && !fullPath.endsWith(".tsx")) {
      continue
    }
    const relative = path.relative(stockDir, fullPath)
    files.set(relative, fs.readFileSync(fullPath, "utf8"))
  }
  return files
}

function writeTree(dir, files) {
  fs.mkdirSync(dir, { recursive: true })
  for (const [relative, contents] of files) {
    const destination = path.join(dir, relative)
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(destination, contents)
  }
}

function diffTrees(previous, next) {
  const left = fs.mkdtempSync(path.join(os.tmpdir(), "coss-stock-old-"))
  const right = fs.mkdtempSync(path.join(os.tmpdir(), "coss-stock-new-"))
  writeTree(left, previous)
  writeTree(right, next)
  try {
    const output = runGit([
      "diff",
      "--no-index",
      "--",
      left,
      right,
    ])
    return { status: 0, output }
  } catch (error) {
    const stdout =
      error && typeof error === "object" && "stdout" in error
        ? String(error.stdout ?? "")
        : ""
    const status =
      error && typeof error === "object" && "status" in error
        ? Number(error.status)
        : 1
    if (status === 1) {
      return {
        status: 1,
        output: stdout.replaceAll(left, "previous-stock").replaceAll(right, "next-stock"),
      }
    }
    fail(error instanceof Error ? error.message : String(error))
  } finally {
    fs.rmSync(left, { recursive: true, force: true })
    fs.rmSync(right, { recursive: true, force: true })
  }
  return { status: 0, output: "" }
}

function replaceStock(files) {
  const staging = fs.mkdtempSync(path.join(os.tmpdir(), "coss-stock-stage-"))
  writeTree(staging, files)
  fs.rmSync(stockDir, { recursive: true, force: true })
  fs.mkdirSync(path.dirname(stockDir), { recursive: true })
  fs.cpSync(staging, stockDir, { recursive: true })
  fs.rmSync(staging, { recursive: true, force: true })
}

function assertNoCustomImports(files) {
  const leaks = []
  for (const [relative, contents] of files) {
    if (
      contents.includes("@/components/ui/") ||
      contents.includes("@/registry/default/")
    ) {
      leaks.push(relative)
    }
  }
  if (leaks.length > 0) {
    fail(
      `Stock files still import @/components/ui or @/registry/default: ${leaks.join(", ")}`,
    )
  }
}

const registryIndexUrl = "https://coss.com/ui/r/registry.json"

function uiRelative(filePath) {
  const marker = "/ui/"
  const index = filePath.lastIndexOf(marker)
  if (index === -1) {
    return path.posix.basename(filePath)
  }
  return filePath.slice(index + marker.length)
}

async function listFromRegistry() {
  let indexResponse
  try {
    indexResponse = await fetch(registryIndexUrl)
  } catch (error) {
    fail(
      `Could not fetch ${registryIndexUrl}: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
  if (!indexResponse.ok) {
    fail(`Could not fetch ${registryIndexUrl}: ${indexResponse.status}`)
  }

  const index = await indexResponse.json()
  const items = Array.isArray(index.items) ? index.items : []
  const uiItems = items.filter((item) => {
    if (!item || item.type !== "registry:ui" || typeof item.name !== "string") {
      return false
    }
    const files = Array.isArray(item.files) ? item.files : []
    return files.some((file) => String(file.path ?? "").includes("/ui/"))
  })

  if (uiItems.length === 0) {
    fail("COSS registry index has no ui primitives")
  }

  const files = new Map()
  for (const item of uiItems) {
    const itemUrl = `https://coss.com/ui/r/${item.name}.json`
    let response
    try {
      response = await fetch(itemUrl)
    } catch (error) {
      fail(
        `Could not fetch ${itemUrl}: ${error instanceof Error ? error.message : String(error)}`,
      )
    }
    if (!response.ok) {
      fail(`Could not fetch ${itemUrl}: ${response.status}`)
    }
    const body = await response.json()
    const itemFiles = Array.isArray(body.files) ? body.files : []
    for (const file of itemFiles) {
      const filePath = String(file.path ?? "")
      if (!filePath.includes("/ui/")) {
        continue
      }
      if (typeof file.content !== "string") {
        fail(`${itemUrl} is missing content for ${filePath}`)
      }
      files.set(uiRelative(filePath), rewriteToStock(file.content))
    }
  }

  if (files.size === 0) {
    fail("COSS registry returned no ui file contents")
  }

  return files
}

function applyDelta(baseFiles, nextFiles) {
  if (baseFiles.size === 0) {
    fail("components/coss-stock is empty, so there is no merge base. Refresh once, then re-run --apply with the next drop.")
  }

  const conflicts = []
  const created = []
  const merged = []
  const removedUpstream = []

  for (const relative of baseFiles.keys()) {
    if (!nextFiles.has(relative)) {
      removedUpstream.push(relative)
    }
  }

  for (const [relative, nextSource] of nextFiles) {
    const customPath = path.join(customDir, relative)
    if (!fs.existsSync(customPath)) {
      fs.mkdirSync(path.dirname(customPath), { recursive: true })
      fs.writeFileSync(customPath, rewriteToCustom(nextSource))
      created.push(relative)
      continue
    }

    const baseSource = baseFiles.get(relative)
    if (baseSource === undefined) {
      created.push(relative)
      const current = fs.readFileSync(customPath, "utf8")
      if (current !== rewriteToCustom(nextSource)) {
        conflicts.push(relative)
        fs.writeFileSync(
          customPath,
          [
            current,
            "",
            "<<<<<<< custom (new upstream file, no stock base)",
            rewriteToCustom(nextSource),
            ">>>>>>> next-stock",
            "",
          ].join("\n"),
        )
      }
      continue
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "coss-merge-"))
    const basePath = path.join(tempDir, "base")
    const nextPath = path.join(tempDir, "next")
    fs.writeFileSync(basePath, baseSource)
    fs.writeFileSync(nextPath, nextSource)

    try {
      execFileSync(
        "git",
        [
          "merge-file",
          "-L",
          "custom",
          "-L",
          "previous-stock",
          "-L",
          "next-stock",
          "--diff3",
          customPath,
          basePath,
          nextPath,
        ],
        { cwd: root, encoding: "utf8" },
      )
      merged.push(relative)
    } catch (error) {
      const status =
        error && typeof error === "object" && "status" in error
          ? Number(error.status)
          : 1
      if (status > 0) {
        conflicts.push(relative)
        merged.push(relative)
      } else {
        fail(error instanceof Error ? error.message : String(error))
      }
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  }

  console.log(`Merged ${merged.length} custom file(s).`)
  if (created.length > 0) {
    console.log(`Added to components/ui (no previous custom file): ${created.join(", ")}`)
  }
  if (removedUpstream.length > 0) {
    console.log(
      `Removed upstream (left in components/ui): ${removedUpstream.join(", ")}`,
    )
  }
  if (conflicts.length > 0) {
    console.error(
      `Conflicts in: ${conflicts.join(", ")}. Keep local visual diffs (variants, heights, Phosphor icons) and keep public props aligned across both copies.`,
    )
    process.exit(1)
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printHelp()
    return
  }

  const nextFiles = args.fromRegistry
    ? await listFromRegistry()
    : args.fromDir
      ? listFromDir(args.fromDir)
      : listFromGit(args.ref)
  assertNoCustomImports(nextFiles)
  const previousFiles = readStockFiles()

  if (args.diff) {
    const result = diffTrees(previousFiles, nextFiles)
    process.stdout.write(result?.output ?? "")
    if (!result?.output) {
      console.log("No differences between components/coss-stock and the incoming snapshot.")
    }
    process.exit(result && result.status === 1 ? 1 : 0)
  }

  const baseForMerge = args.apply ? previousFiles : null
  replaceStock(nextFiles)
  const sourceLabel = args.fromRegistry
    ? registryIndexUrl
    : args.fromDir
      ? path.resolve(root, args.fromDir)
      : args.ref
  console.log(
    `Wrote ${nextFiles.size} file(s) to components/coss-stock from ${sourceLabel}.`,
  )
  console.log("Internal imports now use @/coss-stock/. components/ui was not replaced.")

  if (baseForMerge) {
    applyDelta(baseForMerge, nextFiles)
  }
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error))
})
