---
name: memory-anniversary
description: 记住/查询生日与纪念日。用户说「妈妈生日是5月20」「最近有什么纪念日」时使用 ume_memory_anniversary_* 工具。
auto_load: false
---

# 纪念日记忆

用结构化工具存查生日/纪念日：

1. **写入/更新**：`ume_memory_anniversary_upsert(person=..., label=..., month=..., day=..., year=?)`
2. **查询**：`ume_memory_anniversary_query(keyword=...)`
3. **近期**：`ume_memory_anniversary_upcoming(within_days=30)`
4. **删除**：`ume_memory_anniversary_delete(person=..., label=...)` 或按 `id`

规则：
- month 1–12，day 1–31；year 可选
- 回答时带上 `days_until`（距下次还有几天，0=今天）
- 不要假装写入成功却没调工具
