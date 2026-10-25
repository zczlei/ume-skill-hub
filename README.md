# UME Skill Hub

微米 AI 的技能集合站：浏览器可逛，App 可拉同一套 JSON 安装。

**线上地址**：https://ume-skill-hub.pages.dev/

## 本地预览

```bash
cd skill-hub
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

## 自动发布（GitHub → Cloudflare Pages）

推送 `skill-hub/**` 到 `ume-ai` 的 `ume/m3-local` / `main` / `master` 时，Actions 会：

1. `node scripts/build-catalog.mjs`（`PUBLIC_BASE=https://ume-skill-hub.pages.dev`）
2. `wrangler pages deploy` → **ume-skill-hub** Pages 项目

仓库 Secrets（已配置）：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

本地手动发布：

```bash
export CLOUDFLARE_API_TOKEN=…
export CLOUDFLARE_ACCOUNT_ID=…
npm run deploy
```

公开镜像仓库：https://github.com/zczlei/ume-skill-hub  
也可在 Cloudflare 控制台把该仓库「Connect to Git」，效果等价。

## 内容来源

- App `default-skills` → `is_bundled`
- `content/hosted/*` → 本站可安装（翻译 / 摘要 / 记账）
- `content/curated.json` → ClawHub 精选 + wishlist
