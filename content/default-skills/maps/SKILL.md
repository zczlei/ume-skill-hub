---
name: maps
description: 地图导航与路线。用户说「导航到…」「从A到B」时必须用 ume_maps_navigate / ume_maps_show，禁止浏览器搜路。
auto_load: true
---

# 地图与导航

立刻调用工具：

1. **查看地点**：`ume_maps_show(query="上海外滩")`
2. **导航到目的地**：`ume_maps_navigate(destination="浦东国际机场", mode="d")`
3. **起终点路线**：`ume_maps_navigate(origin="火车站", destination="浦东国际机场", mode="d")`
   - mode：`d` 驾车、`w` 步行、`b` 骑行、`r` 公交

规则：
- 打开系统/谷歌地图；不要用浏览器代替导航
- 不要编造实时路况；避堵请用户在地图 App 内选路线
