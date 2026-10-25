---
name: shopping
description: 比价、找优惠、维护购物清单、查物流。用户说「哪个便宜」「帮我比价」「购物清单」「查快递」「优惠券」时使用。
auto_load: false
---

# 购物 / 比价

关键词：买、价格、比价、购物、优惠、折扣、优惠券、最便宜、下单、物流、快递、包裹、购物清单。

## 1. 比价（优先网页）

1. `ume_websearch(query="{商品} 价格 比价", engine="bing")`（或 baidu）
2. 需要具体页时：`web_fetch` / `web_extract` 打开结果链接抽价格
3. 整理对比表：**平台 | 价格 | 运费/门槛 | 链接或店铺 | 备注**
4. 推荐时算**到手价**（含运费、满减），并提醒山寨/非官方店风险

中国常用平台关键词可拼进搜索：`京东` / `淘宝` / `天猫` / `拼多多` / `抖音` / `苏宁`。

## 2. 在购物 App 里搜（可选）

先确认已安装再打开：

| 应用 | 调用 |
|------|------|
| 淘宝 | `ume_open_app(name="淘宝")` 或 `package="com.taobao.taobao"` |
| 京东 | `ume_open_app(name="京东")` / `com.jingdong.app.mall` |
| 拼多多 | `ume_open_app(name="拼多多")` / `com.xunmeng.pinduoduo` |
| 抖音 | `ume_open_app(name="抖音")` |

打开后可用无障碍/屏幕自动化读搜索结果；**加入购物车、结算、支付前必须先征得用户确认**。

## 3. 购物清单（持久化）

用笔记记忆，不要只写在对话里：

1. 写入：`ume_memory_note_upsert(title="购物清单", content="- 牛奶\n- 鸡蛋 …")`
2. 查询：`ume_memory_note_query(keyword="购物清单")`
3. 删改：更新同一 title，或 `ume_memory_note_delete(title="购物清单")`

也可导出表格：`ume_office_write(format="xlsx", path="~/购物清单.xlsx", content="品名\t数量\t备注\n…")`。

## 4. 查物流

- 有单号：`ume_websearch(query="快递查询 {单号}")`，或打开承运商/购物 App「我的订单」
- 无单号：引导用户打开对应购物 App 的订单页，或让用户提供单号

## 规则

- 展示价格时带货币单位（¥ / CNY）
- **绝不**自动完成支付/下单
- 异常低价要提示可能假货或钓鱼链接
- 做完 App 内操作后回到对话，用简洁中文汇报结果
