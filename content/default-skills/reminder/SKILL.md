---
name: reminder
description: 创建提醒（日历事件）。用户说「提醒我三点吃药」时使用 ume_reminder_create；简单起床闹钟用 alarm Skill。
auto_load: false
---

# 提醒

`ume_reminder_create(title="吃药", at_unix_ms=..., notes=?)`

规则：
- 打开日历预填提醒式事件，用户确认保存
- 同日简单闹铃优先 `ume_alarm_set`
- 调用前会走应用内确认
