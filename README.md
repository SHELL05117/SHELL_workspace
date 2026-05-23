# SHELL Workspace

SHELL Workspace 是一个基于 Docusaurus 的个人工程档案系统，用于长期维护 Projects、Blog、Notes、About 和 Archive。

## 网站结构

- Home：精选入口，展示公开身份、当前方向、精选项目和最新文章。
- Projects：公开作品集，只展示已有真实内容的项目。
- Blog：技术文章、项目复盘、开发日志和观点文章。
- Notes：长期知识库，目前包含 Robotics、Computer Science 和 Course。
- About：公开身份档案，不写私人自传。
- Archive：目前只保留 `source/` 暂不公开、暂不连接 OSS/CDN 的说明。
- GitHub：源码仓库入口。

## 工作区分类

| Category | Paths | Description |
|---|---|---|
| Active site source | `src/`, `static/`, `docusaurus.config.ts`, `sidebars.ts` | Docusaurus 页面、样式、静态资源和站点配置。 |
| Active content | `docs/`, `blog/` | Notes 和 Blog 内容。 |
| Agent system | `AGENTS.md`, `.codex/` | Builder / Reviewer / Fix multi-agent 协作规则、提示词和验收清单。 |
| Deployment scripts | `.github/workflows/`, `scripts/` | GitHub Pages 和 OSS/CDN 示例部署脚本。 |
| Preserved project data | `pushback/` | Pushback 原始项目资料，继续保留。 |
| Local-only prompt docs | `prompt/` | 旧规划和用户补充文档，仅本地保留，不再推送到 GitHub。 |
| Public image assets | `static/img/source-assets/` | 从 `source/` 中拆出的可公开图片，会随网站提交。 |
| Private local asset staging | `source/` | 暂不公开的大视频、音频和文档，等待 ICP 备案许可后再处理 OSS/CDN。 |
| Ignored generated/local files | `build/`, `.docusaurus/`, `node_modules/`, `*.log`, `.env*` | 构建产物、依赖、本地日志和本地配置，不提交。 |

## 本地开发

```bash
npm install
npm run start
npm run build
```

## 维护原则

- 保持 Docusaurus，不更换框架。
- 不修改 GitHub Pages 的 `url` / `baseUrl`，除非明确需要。
- 网站展示文字使用简体中文，技术名词可保留英文。
- 不提交 `.env`、`key.env`、token、API key 或任何真实密钥。
- 不提交 `source/` 中的任何内容；可公开图片应先移到 `static/img/source-assets/`。
- 不把大视频、音频、压缩包提交到 Git。
- `prompt/` 仅本地保留，不再推送到 GitHub。
