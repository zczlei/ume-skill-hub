---
name: message-sms
description: 发短信：打开短信编辑器预填收件人与正文（不自动发送）。用户说「发短信给…」「给10086发消息」时必须用本 Skill 的工具，禁止用浏览器。
auto_load: true
---

# 短信（必须调工具，禁止浏览器）

用户要发短信 / 发消息（指系统短信，不是 WhatsApp）时：**立刻调用下列工具之一**，不要只用文字说明，不要用 `browser_*` / `web_search` / `open_url` / `search_web`。

## 路由

| 用户说法 | 工具 |
|---------|------|
| 已知号码 | `ume_sms_compose(number="10086", body="你好")` |
| 联系人姓名 | `ume_sms_compose_contact(name="妈妈", body="别忘了接小孩")` |
| 只有姓名、正文可空 | `ume_sms_compose_contact(name="妈妈")`（仍打开短信编辑器，不会变成拨号） |
| 姓名不确定 | 先 `ume_contact_lookup`，确认后再 compose |

## 规则

1. 只打开系统短信草稿，**不会自动发送**；告诉用户需点「发送」。
2. 多个联系人匹配时先确认。
3. 缺权限时如实说明；不要改用网页或邮箱代替短信（除非用户明确要发邮件）。
4. 加载本 Skill 后请直接调短信工具，不必再 `use_skill("message-sms")`。
