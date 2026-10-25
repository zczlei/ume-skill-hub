---
name: ume_youtube_transcript
description: 读取 YouTube 视频字幕/文案。用户说「这个视频在说什么」「总结这个 YouTube」时使用 ume_youtube_transcript。
auto_load: false
---

# YouTube 字幕（ume_youtube_transcript）

当用户给出 **YouTube 链接**，并想知道视频在说什么、要摘要/要点/引用时：

1. 调用 `ume_youtube_transcript(url="完整链接或视频 id")`。
2. 可选 `lang=zh|en|...` 指定字幕语言；不传则优先中文，再英语。
3. 用返回的 `transcript` / `title` 作答；`truncated=true` 时说明只读了前半部分。
4. 失败时按 `recovery` 处理：无字幕、网络/VPN、视频不可用——不要编造台词。

## 边界

- **能做**：读已有字幕 / 自动字幕文本。
- **不能做**：下载视频文件（用 `ume_video_downloader`）；没有字幕时无法凭空听写。
- 设备需能访问 `youtube.com`（若在国内，请为 **微米 AI 本 App** 开启 VPN/全局代理）。
