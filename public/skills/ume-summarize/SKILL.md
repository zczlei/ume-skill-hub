---
name: ume-summarize
description: 通用摘要。用户说「总结一下」「要点是什么」「这篇太长了」时，对网页/文件/聊天/长文做摘要。
auto_load: false
---

# 通用摘要（ume-summarize）

## 何时使用

需要压缩信息：链接正文、PDF/Office、聊天记录、通知堆、长回复。

## 步骤

1. 先拿到完整或尽量完整的源材料（`ume_pdf_summary` / `ume_office` / 浏览器 / 用户粘贴）。
2. 输出结构固定：
   - **一句话结论**
   - **要点列表**（3–7 条）
   - **可选**：待办 / 数字 / 日期
3. 标明来源与是否截断（`truncated=true` 时说清楚）。
4. 用户要「更短」→ 只留一句话 + 3 条；要「更细」→ 按章节展开。

## 边界

- 不编造原文没有的事实。
- YouTube/B 站优先用对应 transcript skill，再摘要。
