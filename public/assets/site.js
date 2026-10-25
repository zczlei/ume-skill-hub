const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const countEl = document.getElementById("count");
const qEl = document.getElementById("q");
const originEl = document.getElementById("origin");
const categoryEl = document.getElementById("category");
const toast = document.getElementById("toast");
const apiHelp = document.getElementById("api-help");
const catalogUrlEl = document.getElementById("catalog-url");
const statTotalEl = document.getElementById("stat-total");
const statInstallableEl = document.getElementById("stat-installable");
const statSourcesEl = document.getElementById("stat-sources");

const base = new URL(".", location.href).href.replace(/\/$/, "");
catalogUrlEl.textContent = `${base}/api/v1/catalog.json`;

let skills = [];

function toastMsg(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastMsg._t);
  toastMsg._t = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    toastMsg("已复制");
  } catch {
    toastMsg("复制失败");
  }
}

function originOf(s) {
  if (s.origin) return s.origin;
  if (s.is_bundled) return "bundled";
  if (s.source_url && String(s.source_url).includes("clawhub.ai")) return "clawhub";
  if (s.source_url) return "hosted";
  return "wishlist";
}

function originLabel(origin) {
  return {
    bundled: "内置",
    hosted: "本站托管",
    clawhub: "ClawHub",
    wishlist: "规划中",
  }[origin] || origin;
}

function canInstall(s) {
  if (s.wishlist) return false;
  if (s.is_bundled) return true;
  return Boolean(s.source_url || s.installable);
}

function updateStats() {
  statTotalEl.textContent = String(skills.length);
  statInstallableEl.textContent = String(skills.filter(canInstall).length);
  statSourcesEl.textContent = String(new Set(skills.map(originOf)).size);
}

function render() {
  const q = qEl.value.trim().toLowerCase();
  const origin = originEl.value;
  const category = categoryEl.value;

  const filtered = skills.filter((s) => {
    if (origin && originOf(s) !== origin) return false;
    if (category && s.category !== category) return false;
    if (!q) return true;
    const hay = [s.name, s.title, s.description, s.category, ...(s.tags || [])]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });

  countEl.textContent = `共 ${filtered.length} / ${skills.length} 个`;
  grid.innerHTML = "";
  empty.hidden = filtered.length > 0;

  for (const s of filtered) {
    const o = originOf(s);
    const card = document.createElement("article");
    card.className = "card";
    const installable = canInstall(s);
    const originChipClass = installable ? "ok" : "warn";
    card.innerHTML = `
      <div class="chips">
        <span class="chip accent">${s.category || "general"}</span>
        <span class="chip ${originChipClass}">${originLabel(o)}</span>
        ${s.is_bundled ? '<span class="chip ok">bundled</span>' : ""}
        ${s.tags?.length ? `<span class="chip">${s.tags[0]}</span>` : ""}
      </div>
      <h3>${escapeHtml(s.title || s.name)}</h3>
      <p>${escapeHtml(s.description || "")}</p>
      <div class="card-actions"></div>
    `;
    const actions = card.querySelector(".card-actions");

    const detail = document.createElement("a");
    detail.href = `api/v1/skills/${encodeURIComponent(s.name)}.json`;
    detail.textContent = "详情";
    actions.appendChild(detail);

    if (s.source_url && !s.is_bundled) {
      const raw = document.createElement("a");
      raw.href = s.source_url;
      raw.target = "_blank";
      raw.rel = "noreferrer";
      raw.textContent = "SKILL.md";
      actions.appendChild(raw);

      const copyBtn = document.createElement("button");
      copyBtn.className = "primary";
      copyBtn.type = "button";
      copyBtn.textContent = "复制安装 URL";
      copyBtn.addEventListener("click", () => copy(s.source_url));
      actions.appendChild(copyBtn);
    } else if (s.is_bundled) {
      const note = document.createElement("button");
      note.type = "button";
      note.textContent = "App 内置";
      note.addEventListener("click", () =>
        toastMsg("已随微米 AI 安装，无需 URL"),
      );
      actions.appendChild(note);
    } else {
      const note = document.createElement("button");
      note.type = "button";
      note.textContent = "规划中";
      note.addEventListener("click", () => toastMsg("尚未提供可安装源"));
      actions.appendChild(note);
    }

    grid.appendChild(card);
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fillCategories() {
  const cats = [...new Set(skills.map((s) => s.category).filter(Boolean))].sort();
  for (const c of cats) {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categoryEl.appendChild(opt);
  }
}

apiHelp.textContent = `GET  ${base}/api/v1/catalog.json
  → UME SkillCatalog（App 目录同源格式）

GET  ${base}/api/v1/skills.json
  → 扩展目录（含 origin / tags / installable）

GET  ${base}/api/v1/skills/{name}.json
  → 单条详情

GET  ${base}/skills/{name}/SKILL.md
  → 本站托管的 raw markdown（给 skill_install_from_url）

ClawHub 条目的 source_url 形如：
  https://clawhub.ai/api/v1/skills/{slug}/file?path=SKILL.md&owner={owner}

微米 AI：设置里配置 Skill Catalog URL 指向 catalog.json，
或对话中直接 skill_install_from_url(url=…/SKILL.md)。`;

const data = await fetch("api/v1/skills.json").then((r) => {
  if (!r.ok) throw new Error(`skills.json ${r.status}`);
  return r.json();
});
skills = data.skills || [];
fillCategories();
updateStats();
render();

qEl.addEventListener("input", render);
originEl.addEventListener("change", render);
categoryEl.addEventListener("change", render);
