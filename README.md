# SHELL Workspace

SHELL Workspace 是一个 Docusaurus 驱动的个人文档型站点，用于长期整理 robotics、software、AI、systems、music 等方向的项目和笔记。

## 本地开发

```bash
npm install
npm run start
```

常用命令：

```bash
npm run typecheck
npm run build
npm run serve
```

## 部署路径

第一阶段使用 GitHub Pages：

```text
https://SHELL05117.github.io/SHELL_workspace/
```

当前 Docusaurus 配置：

```text
url: https://SHELL05117.github.io
baseUrl: /SHELL_workspace/
```

未来如果 `www.shellworkspace.cn` 完成备案并作为正式站点，需要把 `url` 改为正式域名，并把 `baseUrl` 改为 `/`。

## GitHub Actions

`.github/workflows/deploy-github-pages.yml` 会在 push 到 `main` 时执行：

```text
npm ci -> npm run build -> upload build/ -> GitHub Pages
```

这个 workflow 不依赖阿里云密钥。

## OSS / CDN 策略

大文件不提交到 Git。视频、音频、封面大图、压缩包等资源上传到 OSS，站点中只引用 URL。

占位资源域名：

```text
https://assets.shellworkspace.cn
```

示例视频路径：

```text
https://assets.shellworkspace.cn/media/mv/song-001-master-4k60.mp4
```

`scripts/upload-assets.sh` 用于上传媒体资源，`scripts/deploy-oss.sh` 用于上传 Docusaurus 的 `build/` 产物。两个脚本都只读取环境变量，不写死 AccessKey。

## Project Archives

`pushback/` 保存 Pushback 机器人项目源码快照和 skill/auton 调试资料。相关文档入口：

- `docs/robotics/pushback.md`
- `docs/robotics/pushback-skill-analysis.md`

`source/SHELL_document.md` 和 `source/phot.png` 已整理进站点内容。`source/` 仍作为本地素材目录忽略，不直接提交；公开图片复制到 `static/img/shell-photo.png`。

## 安全注意

- 不提交 `.env`。
- 不提交 `docs/key.env`。
- 不提交 `source/` 下的大型媒体源文件。
- 不提交 AccessKey、Secret、Token。
- 阿里云部署密钥应放在 GitHub Secrets 或本机环境变量。

## 当前媒体处理

本地已用 ffmpeg 做过一次网页 MP4 适配：

```bash
ffmpeg -i source/祝愿你能有个美好的未来-ABUxxinl-MV.mp4 -c copy -movflags +faststart source/祝愿你能有个美好的未来-ABUxxinl-master-4k60.mp4
```

生成文件保留在 `source/`，该目录已被 `.gitignore` 忽略。
