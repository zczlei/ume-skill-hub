---
name: settings
description: 打开系统设置页或连接面板。用户说「打开 WiFi 设置」「开省电设置」时使用。深浅色切换请用 dark-mode / ume_dark_mode。
auto_load: false
---

# 系统设置

`ume_settings_open(page="wifi")`

page 可选：`wifi` / `bluetooth` / `display` / `sound` / `apps` / `location` /
`date` / `accessibility` / `notification` / `battery` / `storage` / `nfc` /
`airplane` / `data` / `language` / `main`

快速开关面板（用户确认）：`ume_connectivity_panel(target="wifi"|"bluetooth"|"internet"|"airplane"|"data"|"volume")`

## 深浅色

用户说「换成深色/浅色模式」时用 **`ume_dark_mode(mode="dark"|"light")`**（见 Skill `dark-mode`），
不要用 `ume_settings_open(page="dark")`，禁止浏览器。
