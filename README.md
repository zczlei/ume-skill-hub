# UME Skill Hub (umeskillhub.com)

微米 AI 的技能集合站：浏览器可逛，App 可拉同一套 JSON 安装。

**线上地址**：https://ume-skill-hub.pages.dev/

**独立仓库**：https://github.com/zczlei/ume-skill-hub

与 `ume-ai` 是同级目录的独立项目，推 GitHub 后自动发布到 Cloudflare Pages。

## 本地预览

```bash
cd umeskillhub.com
npm run serve
# 打开 http://127.0.0.1:8787
```

## 接口

| 路径 | 说明 |
|------|------|
| `GET /api/v1/catalog.json` | 与 App `SkillCatalog` 同结构 |
| `GET /api/v1/skills.json` | 扩展字段：`origin` / `tags` / `installable` |
| `GET /api/v1/skills/{name}.json` | 单条详情 |
| `GET /skills/{name}/SKILL.md` | 本站托管 raw markdown（给 `skill_install_from_url`） |

App 默认拉取：

`https://ume-skill-hub.pages.dev/api/v1/catalog.json`

## 数据同步（方案 B）

内置 skill 数据是 `ume-ai/app/src/main/assets/default-skills` 的快照：

```bash
# 默认同级 ../ume-ai
npm run sync

# 或指定路径
node scripts/sync-default-skills.mjs /path/to/ume-ai
```

然后构建：

```bash
npm run build:pages
```

## 自动发布（GitHub → Cloudflare Pages）

推送到 `main` 时，Actions 自动构建并 `wrangler pages deploy`。

仓库 Secrets：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

本地手动发布：

```bash
export CLOUDFLARE_API_TOKEN=…
export CLOUDFLARE_ACCOUNT_ID=…
npm run deploy
```

## 目录结构

```
umeskillhub.com/
├── content/
│   ├── default-skills/          # 内置 skill 快照（npm run sync）
│   ├── hosted/                  # 本站可安装 skill
│   └── curated.json             # ClawHub 精选 + wishlist
├── public/                      # 构建产物（部署到 CF Pages）
├── scripts/
│   ├── build-catalog.mjs
│   └── sync-default-skills.mjs
└── .github/workflows/deploy.yml
```

## 内容来源

- `content/default-skills/` → `is_bundled`
- `content/hosted/*` → 本站可安装（翻译 / 摘要 / 记账）
- `content/curated.json` → ClawHub 精选 + wishlist
