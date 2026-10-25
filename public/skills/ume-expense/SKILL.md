---
name: ume-expense
description: 记账与报销整理。用户说「记一笔」「这张发票」「报销清单」时，结合 ume_receipt 整理金额与类目。
auto_load: false
---

# 记账报销（ume-expense）

## 何时使用

发票、小票、转账截图、口头「午饭 35」等需要记成结构化支出时。

## 步骤

1. 有图/PDF：优先调用 `ume_receipt`（或 PDF 摘要）抽出金额、商户、日期、税号。
2. 归一字段：`date` / `merchant` / `amount` / `currency` / `category` / `note`。
3. 类目默认：餐饮、交通、办公、通讯、差旅、其他；用户指定则覆盖。
4. 多笔时输出表格或条目列表；问是否写入笔记（`ume_memory_note_*`）或导出。
5. 报销场景额外给出：可报销项汇总、缺票提示。

## 边界

- 金额识别不确定时标「待确认」，不要猜。
- 不替代财务合规审核。
