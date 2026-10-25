---
name: memory-note
description: 记住/查询个人笔记。用户说「记一下…」「我的购物清单」「查笔记」时使用 ume_memory_note_* 工具。
auto_load: false
---

# 笔记记忆

用结构化工具存查笔记（不要只写在对话里）：

1. **写入/更新**：`ume_memory_note_upsert(title=..., content=...)`
2. **查询**：`ume_memory_note_query(keyword=...)`；无关键词则列出全部
3. **删除**：`ume_memory_note_delete(title=...)` 或按 `id`

规则：
- title 用简短中文标签
- 查询到结果后直接回答用户；不要假装写入成功却没调工具
