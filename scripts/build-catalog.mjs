#!/usr/bin/env node
/**
 * Build skill-hub/public:
 *  - copy hosted SKILL.md
 *  - emit api/v1/catalog.json (UME SkillCatalog shape)
 *  - emit api/v1/skills.json + per-skill detail
 *  - merge default-skills metadata (bundled) + curated.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const HOSTED = path.join(ROOT, "content", "hosted");
const CURATED = path.join(ROOT, "content", "curated.json");
// Snapshot of ume-ai default-skills, synced by scripts/sync-default-skills.mjs
const DEFAULT_SKILLS = path.join(ROOT, "content", "default-skills");

const PUBLIC_BASE = (process.env.PUBLIC_BASE || "").replace(/\/$/, "");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function readFrontmatter(md) {
  if (!md.startsWith("---")) return {};
  const end = md.indexOf("\n---", 3);
  if (end < 0) return {};
  const block = md.slice(3, end);
  const out = {};
  for (const line of block.split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

function titleCase(name) {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function guessCategory(name, desc) {
  const s = `${name} ${desc}`.toLowerCase();
  if (/memory|笔记|数字|纪念|储物/.test(s)) return "memory";
  if (/weather|天气/.test(s)) return "info";
  if (/gmail|mail|sms|whatsapp|telegram|message/.test(s)) return "comms";
  if (/alarm|timer|schedule|reminder|calendar|日程/.test(s)) return "time";
  if (/pdf|office|receipt|发票|文档|docx|xlsx/.test(s)) return "docs";
  if (/youtube|bilibili|video|tiktok|media/.test(s)) return "media";
  if (/map|location|定位|导航/.test(s)) return "maps";
  if (/shop|购物|比价/.test(s)) return "shopping";
  if (/device|a11y|phone|camera|settings|dark/.test(s)) return "device";
  if (/notif|forward|auto-reply|briefing/.test(s)) return "automation";
  return "general";
}

function absUrl(rel) {
  if (!PUBLIC_BASE) return rel.startsWith("/") ? rel : `/${rel}`;
  return `${PUBLIC_BASE}/${rel.replace(/^\//, "")}`;
}

function loadBundled() {
  if (!fs.existsSync(DEFAULT_SKILLS)) return [];
  const out = [];
  for (const name of fs.readdirSync(DEFAULT_SKILLS).sort()) {
    const skillPath = path.join(DEFAULT_SKILLS, name, "SKILL.md");
    if (!fs.existsSync(skillPath)) continue;
    const raw = fs.readFileSync(skillPath, "utf8");
    const fm = readFrontmatter(raw);
    const skillName = fm.name || name;
    const description = fm.description || "";
    out.push({
      name: skillName,
      title: titleCase(skillName),
      description: description.slice(0, 280),
      category: guessCategory(skillName, description),
      license: "AGPL-3.0",
      size_kb: Math.max(1, Math.round(Buffer.byteLength(raw, "utf8") / 1024)),
      compatibility: "any",
      source_url: null,
      is_bundled: true,
      origin: "bundled",
      tags: ["bundled", "ume"],
    });
  }
  return out;
}

function loadHosted() {
  const out = [];
  if (!fs.existsSync(HOSTED)) return out;
  for (const name of fs.readdirSync(HOSTED).sort()) {
    const src = path.join(HOSTED, name, "SKILL.md");
    if (!fs.existsSync(src)) continue;
    const raw = fs.readFileSync(src, "utf8");
    const fm = readFrontmatter(raw);
    const skillName = fm.name || name;
    const destDir = path.join(PUBLIC, "skills", skillName);
    ensureDir(destDir);
    fs.writeFileSync(path.join(destDir, "SKILL.md"), raw);
    const rel = `skills/${skillName}/SKILL.md`;
    out.push({
      name: skillName,
      title: titleCase(skillName.replace(/^ume-/, "")),
      description: (fm.description || "").slice(0, 280),
      category: guessCategory(skillName, fm.description || ""),
      license: "AGPL-3.0",
      size_kb: Math.max(1, Math.round(Buffer.byteLength(raw, "utf8") / 1024)),
      compatibility: "any",
      source_url: absUrl(rel),
      is_bundled: false,
      origin: "hosted",
      tags: ["hosted", "ume"],
      installable: true,
    });
  }
  return out;
}

function loadCurated() {
  const curated = JSON.parse(fs.readFileSync(CURATED, "utf8"));
  const out = [];
  for (const s of curated.skills || []) {
    let source_url = null;
    let installable = false;
    if (s.origin === "clawhub" && s.slug && s.owner) {
      source_url = `https://clawhub.ai/api/v1/skills/${encodeURIComponent(s.slug)}/file?path=SKILL.md&owner=${encodeURIComponent(s.owner)}`;
      installable = true;
    } else if (s.origin === "hosted") {
      source_url = absUrl(`skills/${s.name}/SKILL.md`);
      installable = fs.existsSync(path.join(HOSTED, s.name, "SKILL.md"));
    }
    out.push({
      name: s.name,
      title: s.title || titleCase(s.name),
      description: (s.description || "").slice(0, 280),
      category: s.category || "general",
      license: s.license || "",
      size_kb: s.size_kb || 2,
      compatibility: s.compatibility || "any",
      source_url,
      is_bundled: false,
      origin: s.origin || "curated",
      tags: s.tags || [],
      installable,
      wishlist: s.origin === "wishlist",
    });
  }
  return out;
}

function mergeByName(...lists) {
  const map = new Map();
  for (const list of lists) {
    for (const e of list) {
      const prev = map.get(e.name);
      if (!prev) {
        map.set(e.name, e);
        continue;
      }
      // Prefer richer title/description from curated overlay on hosted
      map.set(e.name, {
        ...prev,
        ...e,
        title: e.title || prev.title,
        description: e.description || prev.description,
        tags: [...new Set([...(prev.tags || []), ...(e.tags || [])])],
        source_url: e.source_url ?? prev.source_url,
      });
    }
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function stripHubFields(e) {
  return {
    name: e.name,
    title: e.title,
    description: e.description,
    category: e.category,
    license: e.license,
    size_kb: e.size_kb,
    compatibility: e.compatibility,
    source_url: e.source_url,
    is_bundled: !!e.is_bundled,
  };
}

ensureDir(path.join(PUBLIC, "api", "v1"));
ensureDir(path.join(PUBLIC, "skills"));

const bundled = loadBundled();
const hosted = loadHosted();
const curated = loadCurated();
const all = mergeByName(bundled, hosted, curated);

const today = new Date().toISOString().slice(0, 10);
const catalog = {
  version: 2,
  updated_at: today,
  skills: all.map(stripHubFields),
};

fs.writeFileSync(
  path.join(PUBLIC, "api", "v1", "catalog.json"),
  JSON.stringify(catalog, null, 2) + "\n",
);

const hubIndex = {
  version: 2,
  updated_at: today,
  public_base: PUBLIC_BASE || null,
  count: all.length,
  endpoints: {
    catalog: absUrl("api/v1/catalog.json"),
    skills: absUrl("api/v1/skills.json"),
    skill: absUrl("api/v1/skills/{name}.json"),
    raw: absUrl("skills/{name}/SKILL.md"),
  },
  skills: all,
};
fs.writeFileSync(
  path.join(PUBLIC, "api", "v1", "skills.json"),
  JSON.stringify(hubIndex, null, 2) + "\n",
);

ensureDir(path.join(PUBLIC, "api", "v1", "skills"));
for (const e of all) {
  fs.writeFileSync(
    path.join(PUBLIC, "api", "v1", "skills", `${e.name}.json`),
    JSON.stringify(
      {
        ...e,
        raw_url: e.source_url,
        ume_install: e.is_bundled
          ? "bundled"
          : e.source_url
            ? "skill_install_from_url"
            : "unavailable",
      },
      null,
      2,
    ) + "\n",
  );
}

console.log(
  `skill-hub: ${all.length} skills → public/api/v1/catalog.json (base=${PUBLIC_BASE || "relative"})`,
);
