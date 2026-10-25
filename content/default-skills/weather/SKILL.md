---
name: weather
description: 查询天气。用户问「今天天气」「上海会下雨吗」「北京明天气温」等时使用；调用 ume_location / ume_weather_search / ume_weather_get。
auto_load: false
---

# 天气（TraceWeather）

当用户询问天气、气温、是否下雨、空气质量、穿衣指数等时：

1. **若提到城市名**：先 `ume_weather_search(name=城市, language=zh|en)`，从结果取 `city_code`。
2. **若未提城市**（如「今天天气怎么样」「外面冷不冷」）：先 `ume_location()`，用返回的 `locality_query`（或 `city`）再 `ume_weather_search`；定位失败才 `ume_weather_get()` 用 App 默认城市。
3. 拿到 `city_code` 后：`ume_weather_get(city_code=..., language=...)`。
4. 用返回的 `summary` 与 `weather` 字段作答：当前气温、天气文案、高低溫、AQI；问「会下雨吗」可参考 `forecast15` / `hourly`。
5. 工具失败时如实说明，不要编造气温。

不要用 `web_fetch` 去爬天气网站。
