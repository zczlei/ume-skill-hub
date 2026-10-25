---
name: ume_receipt
description: 整理发票/小票。用户说「帮我记一下这张票」「这张发票多少钱」「报销整理」时使用 ume_receipt。
auto_load: false
---

# 发票 / 小票整理（ume_receipt）

当用户发来**小票照片、截图或 PDF**，要记账、报销、汇总时：

1. 若已有路径 → `ume_receipt(path="...")`；若还没拍 → 可先 `take_photo`，再用返回的路径调用本工具。
2. 根据返回的 `text`（及可见图片）填写 `schema` 字段：merchant / date / total / items…  
   - `guess_total` / `guess_amounts` / `guess_dates` 只是启发式，**以正文为准**。  
   - 看不清的字段填 `null`，**不要编造金额或商品行**。
3. 用简洁表格向用户展示：商户、日期、合计、明细。
4. 用户要求「存下来」时，再用 `ume_memory_note_upsert` 或 `write_file` 写入；默认只整理展示。

## 边界

- **能做**：OCR/PDF 抽字 → 结构化整理与核对。
- **不能做**：替代官方验真；模糊图瞎猜金额；自动提交报销系统。
- 聊天里已直接上传图片时，也可先看图整理；路径明确时优先本工具以便统一输出。
