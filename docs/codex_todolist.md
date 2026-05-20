---
title: Codex TODO
---

# Codex TODO: SHELL Workspace MVP

本清单用于跟踪第一版 MVP。当前目标不是单一 MV 播放页，而是一个长期维护的个人文档型 Workspace。

## 已确认方向

- 使用 Docusaurus 构建静态文档站。
- 源码和 Markdown 交给 GitHub 管理。
- 第一部署目标为 GitHub Pages。
- 大文件直接放阿里云 OSS，不进入 Git。
- 中国大陆正式站预留 OSS + CDN 架构。
- 不做数据库、登录系统、后端服务。
- `.env`、AccessKey、Token 不提交。

## MVP 范围

- 初始化 Docusaurus TypeScript 项目。
- 配置 GitHub Pages 路径：`https://SHELL05117.github.io/SHELL_workspace/`。
- 创建 Home、Docs、Projects、Music、About 导航。
- 创建 robotics、cs、math-physics、music、archive 文档结构。
- 创建 `.env.example`、`.gitignore`、README。
- 创建 GitHub Pages workflow。
- 创建 OSS 示例 workflow 与上传脚本。
- 本地运行 `npm install`、`npm run typecheck`、`npm run build`。

## 媒体文件策略

- `source/` 只作为本地素材目录。
- MP4/WAV/ZIP 等大文件不进入 Git。
- 公开访问时上传到 OSS，例如：

```text
https://assets.shellworkspace.cn/media/mv/song-001-master-4k60.mp4
```

## 待 SHELL 确认

- 是否长期保留仓库名大小写 `SHELL_workspace`。
- GitHub Pages 是否使用当前路径。
- `shellworkspace.cn`、`assets.shellworkspace.cn` 是否为最终域名。
- OSS Bucket 名称、Region、对象路径规范。
- About 页面公开哪些联系方式。
