---
name: whatsapp
description: 用 WhatsApp 发消息（打开聊天并预填文案；默认用户点发送，可选无障碍自动发送）。用户说「用 WhatsApp 告诉…」时使用 ume_whatsapp_send。
auto_load: false
---

# WhatsApp

`ume_whatsapp_send(phone="8613800138000", text="我马上到")`

规则：
- phone 为带国家码的纯数字（不要 +）
- **默认不会自动发送**，用户在 WhatsApp 里点发送
- 若用户在「无障碍」设置中开启「WhatsApp 自动点发送」，则会在打开草稿后尝试自动点发送（OEM 界面可能失败，失败时仍可手动点）
- 未安装 WhatsApp 时如实告知
- 调用前会走应用内确认
