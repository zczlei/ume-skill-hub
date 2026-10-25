---
name: alarm
description: 设置闹钟或倒计时。用户说「明天七点叫我」「每周一早上8点」「倒计时五分钟」时用 ume_alarm_set / ume_timer_set，不要用 schedule_job。
auto_load: true
---

# 闹钟与倒计时

1. **闹钟**：`ume_alarm_set(hour=7, minute=30, message="起床")`
   - hour 0–23；重复闹钟用 `days`（1=周日 … 7=周六），如每周一 → `days=[2]`
2. **倒计时**：`ume_timer_set(length_seconds=300, message="煮面")`

规则：
- 「每周一早上8点提醒开会」→ `ume_alarm_set(hour=8, minute=0, days=[2], message="开会")`，不要用 `schedule_job`
- 通常打开时钟界面由用户确认；不要声称已静默设好
