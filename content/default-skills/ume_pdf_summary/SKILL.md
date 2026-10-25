---
name: ume_pdf_summary
description: 读取本地 PDF/DOCX/PPTX/XLSX/EPUB/文本并抽取正文。用户说「总结这个 PDF」「这个文档说什么」「帮我看一下这个表格/报告」时使用 ume_pdf_summary。要生成 Word/Excel/PPT 请用 ume_office skill。
auto_load: false
---

# 文档正文抽取（ume_pdf_summary）

当用户给出**本地文档路径**（或刚上传/分享的文件），并要摘要、要点、问答时：

1. 调用 `ume_pdf_summary(path="绝对路径或 content:// 或 ~/...")`。
2. 可选 `max_chars`（默认 50000）；`mime` 仅在无扩展名时需要。
3. 用返回的 `text` / `file_name` / `format` 作答；`truncated=true` 时说明只覆盖已抽取部分。
4. **不要编造**正文里没有的章节或数字。扫描件/纯图片 PDF 若 `empty`，按 `recovery` 引导。

## 支持格式

- PDF（MuPDF 文本层）
- DOCX / PPTX / **XLSX** / EPUB
- 常见文本：txt / md / csv / json / xml / html …

## 边界

- **能做**：抽可复制的文字层，供你总结/问答。
- **不能做**：OCR 扫描件；编辑/批注已有文件（创建新文件用 `ume_office_write`）。
- PDF/Office **不要**用 `read_file`（会当二进制 base64）；优先本工具。
