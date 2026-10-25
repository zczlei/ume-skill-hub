---
name: ume_location
description: 获取用户当前位置与城市名。用户问「我在哪」「附近」「今天天气」且未提城市时，先用 ume_location。
auto_load: false
---

# 定位（ume_location）

当用户询问**当前位置**，或问天气/周边但**没有说出城市名**时：

1. 调用 `ume_location()`（可选 `accuracy=balanced|high|low`）。系统会弹出定位权限申请，等用户处理后继续。
2. 优先使用返回的 `locality_query` / `city` 作为地点名。
3. 查天气时：`ume_weather_search(name=locality_query)` → `ume_weather_get(city_code=...)`。
4. 用户拒绝权限或定位失败时，按 `recovery` 提示（必要时引导到系统设置开权限），或退回 App 默认城市的天气；不要编造坐标。

不要用 `web_fetch` 猜位置。
