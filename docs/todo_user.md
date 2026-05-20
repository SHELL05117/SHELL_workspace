---
title: User Checklist
---

# SHELL 需要人工确认的事项

Codex 负责工程实现、脚本、配置模板和文档整理。涉及账号、实名、付款、备案和密钥的操作需要 SHELL 自己完成。

## 云服务与域名

- 注册并实名阿里云账号。
- 准备域名，例如 `shellworkspace.cn`。
- 如需中国内地 CDN，完成 ICP 备案。
- 创建 OSS Bucket，用于站点静态文件和大媒体资源。
- 备案完成后再配置 CDN 加速域名。

## 安全边界

- 不使用主账号 AccessKey 做自动部署。
- 使用 RAM 子用户和最小权限。
- AccessKey 只放在本机环境变量或 GitHub Secrets。
- 不把 `.env`、密钥、验证码、身份证、支付信息发到聊天窗口或提交到 Git。

## 推荐公开信息

- 个人简介：可以先写简短版本。
- 项目方向：Robotics / Software / AI / Systems / Music。
- 公开联系方式：由 SHELL 决定是否放邮箱、GitHub、Bilibili 等。
- 第一批内容：优先整理真实项目和可公开笔记。

## 备案材料建议

网站名称建议偏个人作品展示，不要写成视频平台或内容分发平台。

可选描述：

```text
SHELL个人作品展示
个人作品展示站
个人音乐作品展示
```

最终以阿里云备案系统审核要求为准。
