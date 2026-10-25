---
name: a11y-assist
description: 无障碍辅助：锁屏、清后台、快捷设置开关 Wi‑Fi/蓝牙/飞行模式、省电模式、电源菜单。用户说「锁屏」「清理后台」「打开wifi」「开省电」「重启」时使用。
auto_load: true
---

# 无障碍辅助操作

**前置**：用户须在「设置 → 无障碍」开启微米AI。未开启时先 `ume_open_accessibility_settings()`。
禁止用浏览器代替下列操作。

| 意图 | 工具 | 说明 |
|------|------|------|
| 锁屏 | `ume_lock_screen()` | 直接请求锁屏 |
| 清理后台 | `ume_clear_recents()` | 打开最近任务并尽量点「清除全部」 |
| 只打开最近任务 | `ume_open_recents()` | 不自动点清除 |
| 开关 Wi‑Fi/蓝牙/数据/飞行模式 | `ume_qs_toggle(target="wifi\|bluetooth\|airplane\|data")` | 开快捷设置并点磁贴 |
| 只打开快捷设置 | `ume_open_quick_settings()` | 用户手动点 |
| 省电模式 | `ume_battery_saver(mode="on\|off\|get")` | 有无障碍时自动点开关 |
| 深浅色 | `ume_dark_mode(mode="dark\|light")` | 见 Skill dark-mode |
| 重启/关机 | `ume_open_power_menu()` | 打开电源菜单，用户确认 |

规则：
- **不能**静默强杀应用、自动安装、改系统语言、无确认重启/关机
- 关某个 App：`ume_app_details` 打开应用信息，提示用户强行停止
- 若返回 `NEED_ACCESSIBILITY`，引导开启无障碍后再试
