---
name: ume_xhs_download
description: 下载小红书视频笔记（含 xhslink.cn 短链与分享口令）。用户说「下载这个小红书」「小红书能下吗」「保存小红书视频」或粘贴小红书分享文案/链接时使用。
auto_load: false
---

# 小红书视频下载

用户给出小红书分享文案或链接，并要求**下载 / 保存 / 能否下载**时，只走下面这条路径。不要用 `web_fetch`、不要用通用 `ume_video_downloader`、也不要自己 `browser_open` 小红书页（会跳 `xhsdiscover://` 导致失败）。

## 输入识别

接受任意一种：

- 短链：`https://xhslink.cn/o/...`
- 笔记页：`https://www.xiaohongshu.com/discovery/item/<note_id>?...`
- 探索页：`https://www.xiaohongshu.com/explore/<note_id>`
- 整段分享口令（里面夹着短链）——把整段粘贴给工具即可

## 流程

直接调用工具：

`ume_xhs_download(url="<用户粘贴的整段文案或链接>", save=true)`

- 成功：用返回的 `save_path` / `filename` / `note_id` / `title` / `saved` / `download_id` 告诉用户已排队到系统「下载」。
- **必须把 `save_path` 的完整路径原样写进回复，并用反引号包裹**（例如 `/sdcard/Download/xhs_6adc1b9a000000003103be9d.mp4`），用户才能点击直接播放。
- **严禁省略或改写路径**：不要写 `Download/xxx.mp4`、`~/xxx.mp4` 或只写文件名——只有以 `/sdcard/` 开头的完整绝对路径才会被渲染成可点击链接。
- `play_url` 带签名、会过期，不要当长期外链转发给用户。
- 返回带 `image_urls` 且无 `play_url` 时：说明是**图文笔记**，用 `download_file` 逐张下载图片并告知用户。
- 失败：如实说明 `error` / `detail` / `recovery`，不要编造已下载。

只要播放地址、暂不落盘时：`ume_xhs_download(url="...", save=false)`。

## 边界

- 私密 / 仅 App 可看 / 登录墙笔记：工具会失败，请用户换公开链接。
- 国际版或纯图片内容见上条；**国内小红书视频笔记只用本工具**。

## 示例

用户：`感受美国特产 https://xhslink.cn/o/8l0Jg3js2fk 先复制这段口令，再去【小红书】打开笔记~`

→ `ume_xhs_download(url="感受美国特产 https://xhslink.cn/o/8l0Jg3js2fk 先复制这段口令，再去【小红书】打开笔记~", save=true)`
