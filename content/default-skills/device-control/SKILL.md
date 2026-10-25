---
name: device-control
description: 设备控制：电量、亮度、音量、深浅色、应用商店搜索、网络面板、应用信息。用户说「亮一点」「声音小一点」「还剩多少电」「换成浅色模式」时使用。
auto_load: false
---

# 设备控制

1. **电量**：`ume_battery_status()`
2. **亮度**：`ume_brightness(action="up"|"down"|"set"|"get", value?, step?)`
   - 需要系统「修改系统设置」权限
3. **音量**：`ume_volume(action="up"|"down"|"set"|"get", stream="media", percent?, step_percent?)`
4. **深浅色（直接设置）**：`ume_dark_mode(mode="dark"|"light"|"auto"|"get")`
   - 禁止浏览器；失败时工具会打开显示设置
5. **应用商店搜索**（不自动安装）：`ume_market_search(query="俄罗斯方块")`
6. **开关网络类**：优先 `ume_qs_toggle(target="wifi"|"bluetooth"|"airplane"|"data")`（需无障碍）；
   否则 `ume_connectivity_panel(...)` 打开面板
7. **省电模式**：`ume_battery_saver(mode="on"|"off"|"get")`
8. **应用信息（强停需用户点）**：`ume_app_details(name="日历")`

规则：
- 网络开关尽量用无障碍点快捷设置；失败再打开面板
- 不能自动安装应用
