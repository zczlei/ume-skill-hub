---
name: dark-mode
description: 直接切换系统深浅色模式。用户说「换成深色模式」「换成浅色模式」「开启夜间模式」时必须用本 Skill，禁止浏览器。
auto_load: true
---

# 深浅色模式（直接设置）

用户要切换系统深色 / 浅色 / 自动主题时：**立刻调用** `ume_dark_mode`，不要用浏览器，不要只打开设置页（除非工具返回 FALLBACK）。

## 路由

| 用户说法 | 工具 |
|---------|------|
| 换成深色 / 开夜间模式 | `ume_dark_mode(mode="dark")` |
| 换成浅色 / 日间模式 | `ume_dark_mode(mode="light")` |
| 跟随系统 / 自动 | `ume_dark_mode(mode="auto")` |
| 现在是深色还是浅色 | `ume_dark_mode(mode="get")` |

## 规则

1. 优先直接切换；锁定机型会依次试 Shizuku、**无障碍自动点开关**；仍失败才 `FALLBACK_SETTINGS`。
2. 无障碍需用户在系统设置中开启「微米AI」无障碍服务。
3. 不要用 `ume_settings_open(page="dark")` 代替本工具。
4. 不要用 `browser_*` / `web_search` / `open_url`。
5. 加载本 Skill 后请直接调 `ume_dark_mode`，不必再 `use_skill("dark-mode")`。
