---
name: schedule
description: 日历日程：创建、查日程、查忙闲。用户说「明天下午开会」「我周五有空吗」「明天有什么安排」时使用对应工具。
auto_load: false
---

# 日历（创建 + 查询 + 忙闲）

## 创建日程

`ume_schedule_create(title="周会", start_time_unix_ms=..., end_time_unix_ms=..., location=?, description=?)`

- 打开系统日历预填事件，用户点保存才真正写入。
- 时间用 unix 毫秒；不确定时可只填 title。

简短提醒也可用 `ume_reminder_create`；同日闹钟优先 `ume_alarm_set`。

## 查日程

`ume_calendar_events(start_unix_ms=..., end_unix_ms=...)`

- 「明天有什么会」「下周安排」→ 先算时间窗再调用。
- 会展开重复日程；可能弹出日历读权限。

## 查忙闲 / 找空档

`ume_calendar_freebusy(start_unix_ms=..., end_unix_ms=..., min_free_minutes=60?)`

- 「我周五下午有空吗」「找 1 小时空档」「会不会冲突」用这个。
- 看返回的 `free[]` / `busy[]`；检查某一刻是否空可用 `probe_start_unix_ms` + `probe_end_unix_ms`。
- 找到空档后若要预订 → 再调 `ume_schedule_create`。

## 规则

- 时间一律用设备本地时区对应的 unix 毫秒；向用户展示时用返回的 `*_local` 字段。
- 不要编造用户日历里没有的会议。
- 调用前会走应用内确认（敏感读写）。
