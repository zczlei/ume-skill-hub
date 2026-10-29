---
name: video-analyze
description: 分析视频在讲什么。用户发视频附件或视频链接并问「讲什么/总结/内容」时使用本 skill。
auto_load: false
---

# 视频内容分析

用户想知道**视频在讲什么 / 总结内容 / 看了什么**时，按输入类型选择路径：

## 1. 聊天里已附加视频文件

- 若当前模型支持 **视频输入**（如 Kimi K3.1 Pro / K2.6、部分 Gemini）：直接基于附件作答，不要先下载。
- 若模型**不支持**视频输入：说明需切换到支持视频的模型，或请用户改用带字幕的 YouTube/B站链接。

## 2. YouTube 链接

1. 调用 `ume_youtube_transcript(url="...")`。
2. 用返回的 `transcript` / `title` 总结；不要编造台词。
3. 无字幕时按工具 `recovery` 提示用户（VPN / 换链接），不要假装看过画面。

## 3. B 站链接

1. 调用 `ume_bilibili_transcript(url="...")`。
2. 其余同 YouTube。

## 4. 抖音链接（国内）

1. 先调用 `ume_douyin_download(url="<分享文案或链接>", save=false)` 取 `play_url` / `title`。
2. 视频较小且模型支持视频输入时，可再用本地附件交给模型；文件过大则请用户改传短视频。
3. 需要保存到相册/下载目录时再调用 `save=true`。
4. 不要用 `ume_video_downloader` / `browser_open` 处理抖音（深链会失败）。

## 5. 小红书链接（国内）

1. 调用 `ume_xhs_download(url="<分享文案或链接>", save=false)` 取 `play_url` / `title` / `desc`。
2. 视频较小且模型支持视频输入时，可再用本地附件交给模型；文件过大则请用户改传短视频。
3. 需要保存到下载目录时再调用 `save=true`。
4. 不要用 `ume_video_downloader` / `browser_open` 处理小红书（深链会失败）。

## 6. 其它公开视频页链接（国际版 TikTok / Instagram / X 等）

1. 调用 `ume_video_downloader(url="...", attach_for_model=true, save=false)`。
2. 若返回 `attached_for_model=true` 且带有 Video part：下一轮基于视频内容总结。
3. 若过大或失败：按 `recovery` 请用户改传较短本地视频（约 20MB 内），或改用有字幕的 YouTube/B站。

## 边界

- 不要用 `web_fetch` 爬视频站页面来「猜」内容。
- 纯「帮我下载保存」场景用 `ume_video_downloader` 的 `save=true`，不必 `attach_for_model`。
