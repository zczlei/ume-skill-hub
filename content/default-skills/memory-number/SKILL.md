---
name: memory-number
description: 记住/查询重要数字（门禁、密码、卡号等）。用户说「门禁是8866」「我的门禁密码是多少」时使用 ume_memory_number_* 工具。
auto_load: false
---

# 重要数字记忆

用结构化工具存查数字类信息（不要只写在对话里）：

1. **写入/更新**：`ume_memory_number_upsert(title=..., value=..., tags=[...])`
2. **查询**：`ume_memory_number_query(keyword=...)`；无关键词则列出全部
3. **删除**：`ume_memory_number_delete(title=...)` 或按 `id`

规则：
- title 用简短中文标签（如「门禁密码」「家里 Wi-Fi」）
- 查询到结果后用明文回答用户；不要在别处复述无关上下文
- 值已加密保存在本机；不要假装写入成功却没调工具
