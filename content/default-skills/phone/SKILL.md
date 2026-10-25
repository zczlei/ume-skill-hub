---
name: phone
description: 拨打电话：打开拨号盘预填号码或按联系人姓名拨号（不自动呼出）。用户说「打给10086」「打电话给妈妈」时必须用本 Skill 的工具，禁止用浏览器。
auto_load: true
---

# 电话（必须调工具，禁止浏览器）

用户要打电话 / 拨号时：**立刻调用下列工具之一**，不要只用文字说明步骤，不要用 `browser_*` / `web_search` / `open_url` / `search_web`。

## 路由

| 用户说法 | 工具 |
|---------|------|
| 已知号码（10086、+86…） | `ume_phone_dial(number="10086")` |
| 联系人姓名（妈妈、张三） | `ume_phone_dial_contact(name="妈妈")` |
| 姓名不确定 / 多结果 | 可先 `ume_contact_lookup(query="妈妈")`，确认后再 `ume_phone_dial_contact` 或 `ume_phone_dial` |

## 规则

1. 只打开系统拨号盘，**不会自动呼出**；告诉用户需点「呼叫」。
2. 多个联系人匹配时列出候选人让用户确认，不要猜。
3. 缺通讯录权限时如实说明并引导授权，不要改用浏览器搜电话。
4. 加载本 Skill 后请直接调拨号工具，不必再 `use_skill("phone")`。
