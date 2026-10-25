---
name: ume_office
description: 读写 Word/Excel/PPT（docx/xlsx/pptx）。用户说「总结这份 Word」「导出成 Excel」「做个 PPT」「生成表格」时使用本 skill。
auto_load: false
---

# Office 文档（docx / xlsx / pptx）

## 读取 / 总结

调用 `ume_pdf_summary(path="绝对路径或 content:// 或 ~/...")`（也支持 PDF/EPUB/文本）。

- 可选 `max_chars`（默认 50000）
- 用返回的 `text` 总结或问答；**不要编造**正文没有的内容
- XLSX 会按行列输出（制表符分隔）；多 sheet 时带 `## SheetN` 标题

## 创建 / 导出

调用 `ume_office_write(format=..., content=..., path?=...)`：

| format | content 写法 |
|--------|----------------|
| `docx` | 段落之间空一行；或一整段纯文本 |
| `xlsx` | 每行一条记录，列用 Tab 或逗号；也可用 JSON：`[["品名","价"],["苹果","5"]]` |
| `pptx` | 每行一页：`标题\|\|要点1\|\|要点2`；或 JSON：`[{"title":"…","bullets":["…"]}]` |

- `path` 可省略 → 默认写到 `Download/ume_office_<时间戳>.<ext>`
- 工作区路径：`path="~/周报.docx"`
- 已存在文件需 `overwrite=true`

## 边界

- **能做**：抽正文；生成简易可打开的 Office 文件
- **不能做**：复杂排版/宏/图表；扫描件 OCR（无文字层时按 recovery 提示）
- 读写二进制 Office **不要**用 `read_file` / `write_text_file`
- 创建后把**完整路径**告诉用户
