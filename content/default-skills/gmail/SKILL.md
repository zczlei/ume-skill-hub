---
name: gmail
description: 打开邮件编辑器预填收件人与正文（不自动发送）。用户说「发邮件给…」时使用 ume_gmail_compose。
auto_load: false
---

# Gmail / 邮件

`ume_gmail_compose(to="a@b.com", subject="你好", body="……")`

规则：
- 只打开邮件客户端，**不会自动发送**
- 有 Gmail 时优先打开 Gmail
- 调用前会走应用内确认
