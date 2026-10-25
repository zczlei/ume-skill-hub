---
name: ume_bilibili_transcript
description: 读取 B 站视频字幕/文案。用户说「这个 B 站在说什么」「总结这个哔哩哔哩」时使用 ume_bilibili_transcript。
auto_load: false
---

# B 站字幕（ume_bilibili_transcript）

当用户给出 **Bilibili / B 站链接**，并想知道视频在说什么、要摘要/要点/引用时：

1. 调用 `ume_bilibili_transcript(url="完整链接或 BV 号")`。
2. 可选 `lang=zh|ai-zh|en|...` 指定字幕语言；不传则优先中文（含 AI 中文），再英语。
3. 用返回的 `transcript` / `title` 作答；`truncated=true` 时说明只读了前半部分；`caption_kind=ai` 时注明可能是自动字幕、有识别误差。
4. 失败时按 `recovery` 处理——不要编造台词。

## 登录说明（重要）

B 站字幕接口对未登录用户返回空列表。本工具会：

1. 优先使用 **应用内浏览器** 里已登录 `bilibili.com` 的 Cookie；
2. 若仍失败，可让用户传入 `sessdata=`（浏览器 Cookie 中的 `SESSDATA`，或整段 Cookie）。只在本机请求 B 站 API，**不要索要账号密码**，也不要把 Cookie 发到别处。

## 边界

- **能做**：读已有字幕 / AI 字幕文本。
- **不能做**：下载视频文件（用 `ume_video_downloader`）；没有字幕时无法凭空听写；不能绕过登录门禁。
- YouTube 请用 `ume_youtube_transcript`，不要混用。
