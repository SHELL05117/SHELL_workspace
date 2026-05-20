---
title: Git / GitHub
---

# Git / GitHub

本项目的源码、文档和部署配置都由 GitHub 管理。

基础工作流：

```bash
git status
git add .
git commit -m "init shell workspace"
git push origin main
```

注意事项：

- 不提交 `.env`、AccessKey、Token。
- 不提交 `source/` 下的大型媒体文件。
- 大文件走 OSS，仓库只保存引用路径和文档说明。

TODO: SHELL 补充常用分支策略。
