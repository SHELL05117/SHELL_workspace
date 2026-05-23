---
title: Git / GitHub 工作流
---

# Git / GitHub 工作流

本页记录 SHELL Workspace 的 Git / GitHub 使用方式。

## 基本原则

- 源码和 Markdown 由 Git 管理。
- 生成产物、依赖目录、本地密钥和大媒体不提交。
- GitHub Pages 用于网站预览和发布。
- 重要结构调整先通过 build 验证。

## 常用检查

```bash
git status --short
npm run build
```
