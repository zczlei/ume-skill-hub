#!/usr/bin/env node
/**
 * Sync default-skills from ume-ai into this repo's content/default-skills.
 *
 * Usage:
 *   node scripts/sync-default-skills.mjs [ume-ai-root]
 *
 * Defaults to ../ume-ai relative to this repo root (sibling directory).
 * In CI or other layouts, pass the ume-ai repo root as argv[2].
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_UME_AI = path.resolve(ROOT, "..", "ume-ai");
const UME_AI = path.resolve(process.argv[2] || DEFAULT_UME_AI);
const SRC = path.join(UME_AI, "app", "src", "main", "assets", "default-skills");
const DST = path.join(ROOT, "content", "default-skills");

if (!fs.existsSync(SRC)) {
  console.error(`ume-ai default-skills not found at: ${SRC}`);
  console.error("Pass the ume-ai repo root: node scripts/sync-default-skills.mjs /path/to/ume-ai");
  process.exit(1);
}

fs.mkdirSync(DST, { recursive: true });

let copied = 0;
let removed = 0;

const srcNames = new Set(fs.readdirSync(SRC));

for (const name of srcNames) {
  const srcDir = path.join(SRC, name);
  const dstDir = path.join(DST, name);
  const srcFile = path.join(srcDir, "SKILL.md");
  if (!fs.statSync(srcDir).isDirectory() || !fs.existsSync(srcFile)) continue;

  fs.mkdirSync(dstDir, { recursive: true });
  const raw = fs.readFileSync(srcFile, "utf8");
  const dstFile = path.join(dstDir, "SKILL.md");
  const existing = fs.existsSync(dstFile) ? fs.readFileSync(dstFile, "utf8") : null;
  if (existing !== raw) {
    fs.writeFileSync(dstFile, raw);
    copied++;
  }
}

for (const name of fs.readdirSync(DST)) {
  if (!srcNames.has(name)) {
    fs.rmSync(path.join(DST, name), { recursive: true, force: true });
    removed++;
  }
}

console.log(`synced ${copied} updated, ${removed} removed, ${srcNames.size} total from ${SRC}`);
