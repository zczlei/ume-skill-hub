---
name: open-app
description: 打开手机上已安装的 App。用户说「打开日历」「打开微信」「打开设置」时必须用 ume_open_app，禁止浏览器。
auto_load: true
---

# 打开应用

立刻调用工具，不要只用文字说明：

1. **按名称**：`ume_open_app(name="日历")`
2. **按包名**：`ume_open_app(package="com.google.android.calendar")`

规则：
- 优先中文显示名；多匹配时按 package 再试
- 禁止 `browser_*` / `web_search` / `open_url` 代替打开本机 App
- 未安装时如实告知
