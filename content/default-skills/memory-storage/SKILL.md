---
name: memory-storage
description: 记住/查询物品存放位置。用户说「护照放在书桌抽屉」「护照在哪」时使用 ume_memory_storage_* 工具。
auto_load: false
---

# 储物位置记忆

用结构化工具记住东西放哪：

1. **写入/更新**：`ume_memory_storage_upsert(item=..., location=...)`
2. **查询**：`ume_memory_storage_query(keyword=...)`；无关键词则列出全部
3. **删除**：`ume_memory_storage_delete(item=...)` 或按 `id`

规则：
- item 用物品短名；location 用具体位置
- 查询到结果后直接告诉用户位置
- 不要假装写入成功却没调工具
