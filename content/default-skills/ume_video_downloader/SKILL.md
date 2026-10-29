---
name: ume_video_downloader
description: 下载公开视频链接，或 attach_for_model 后给模型看。用户说「下载这个视频」或分析非 YouTube/B站链接时使用。国内抖音请用 ume_douyin_download。
auto_load: false
---

# 视频下载（公开链接）

当用户给出**公开可播放**的视频页面链接，并要求下载/保存时：

1. 调用 `ume_video_downloader(url="完整链接", save=true)`。
2. `save=true`（默认）会解析直链并写入系统「下载」目录；只要直链可传 `save=false`。
3. 用返回的 `filename` / `title` / `saved` 向用户确认结果；失败时如实说明 `detail`，不要编造已下载。

当用户要**分析内容**且链接不是 YouTube/B站时：

1. `ume_video_downloader(url="...", attach_for_model=true, save=false)`。
2. 成功则模型会在下一轮看到 Video；过大则请用户改传本地短视频。

## 能力边界

- **能做**：多数公开 TikTok / YouTube / Instagram / Twitter(X) / Reddit 等页面 → 解析文件地址并下载；`attach_for_model` 可把较小文件交给支持视频的模型。
- **不能做**：读字幕/文案/转写（用 `ume_youtube_transcript` / `ume_bilibili_transcript`）；私密或登录墙内容；当前 **B站下载不支持**。
- **国内抖音**（`v.douyin.com` / `douyin.com` / 分享口令）：改用 skill / 工具 `ume_douyin_download`，不要对本工具死磕（解析接口不支持抖音，会报 `error.api.link.invalid`）。
- **国内小红书**（`xhslink.cn` / `xiaohongshu.com` / 分享口令）：改用 skill / 工具 `ume_xhs_download`。
- 不要用 `web_fetch` 去爬视频站；下载/附给模型只用本工具。分析总览见 skill `video-analyze`。

## 示例

`ume_video_downloader(url="https://www.youtube.com/watch?v=jNQXAC9IVRw", save=true)`

`ume_video_downloader(url="https://www.tiktok.com/@x/video/1", attach_for_model=true, save=false)`
