---
name: ume_video_downloader
description: 下载公开视频链接。用户说「下载这个视频」「帮我存一下这个 TikTok/YouTube」时使用 ume_video_downloader。
auto_load: false
---

# 视频下载（公开链接）

当用户给出**公开可播放**的视频页面链接，并要求下载/保存时：

1. 调用 `ume_video_downloader(url="完整链接", save=true)`。
2. `save=true`（默认）会解析直链并写入系统「下载」目录；只要直链可传 `save=false`。
3. 用返回的 `filename` / `title` / `saved` 向用户确认结果；失败时如实说明 `detail`，不要编造已下载。

## 能力边界

- **能做**：多数公开 TikTok / YouTube / Instagram / Twitter(X) / Reddit 等页面 → 解析文件地址并下载。
- **不能做**：读字幕/文案/转写；私密或登录墙内容；当前 **B站不支持**。
- 不要用 `web_fetch` 去爬视频站；下载场景只用本工具。

## 示例

`ume_video_downloader(url="https://www.youtube.com/watch?v=jNQXAC9IVRw", save=true)`
