---
name: ume_douyin_download
description: 下载抖音短视频（含 v.douyin.com 短链与分享口令）。用户说「下载这个抖音」「抖音能下吗」「保存抖音视频」或粘贴抖音分享文案/链接时使用。
auto_load: false
---

# 抖音视频下载

用户给出抖音分享文案或链接，并要求**下载 / 保存 / 能否下载**时，只走下面这条路径。不要用 `web_fetch`、不要用通用 `ume_video_downloader`、也不要自己 `browser_open` 抖音页（会跳到 `snssdk1128://` 导致失败）。

## 输入识别

接受任意一种：

- 短链：`https://v.douyin.com/.../`
- 桌面页：`https://www.douyin.com/video/<aweme_id>`
- 分享页：`https://www.iesdouyin.com/share/video/<aweme_id>/...`
- 整段分享口令（里面夹着短链）——把整段粘贴给工具即可

## 流程

直接调用工具：

`ume_douyin_download(url="<用户粘贴的整段文案或链接>", save=true)`

- 成功：用返回的 `save_path` / `filename` / `aweme_id` / `saved` / `download_id` 告诉用户已排队到系统「下载」。
- **必须把 `save_path` 的完整路径原样写进回复，并用反引号包裹**（例如 `/sdcard/Download/douyin_7700904393344176043.mp4`），用户才能点击直接播放。
- **严禁省略或改写路径**：不要写 `Download/xxx.mp4`、`~/xxx.mp4` 或只写文件名——只有以 `/sdcard/` 开头的完整绝对路径才会被渲染成可点击链接。
- `play_url` 带签名、会过期，不要当长期外链转发给用户。
- 失败：如实说明 `error` / `detail` / `recovery`，不要编造已下载。

只要播放地址、暂不落盘时：`ume_douyin_download(url="...", save=false)`。

## 边界

- 私密 / 仅 App 可看 / 登录墙：工具会失败，请用户换公开链接。
- 纯「在抖音里搜索」用 skill `tiktok` / `ume_tiktok_search`，不要本 skill。
- 国际版 TikTok 公开页仍可用 `ume_video_downloader`；**国内抖音只用本工具**。

## 示例

用户：`3.82 复制打开抖音… https://v.douyin.com/KdHGBir7skg/ …`

→ `ume_douyin_download(url="3.82 复制打开抖音… https://v.douyin.com/KdHGBir7skg/ …", save=true)`
