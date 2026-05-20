# SHELL Workspace 个人网站全流程规划

> 目标：把原本“私人 MV 播放页”升级为一个长期使用的个人 Workspace 网站。它既可以像 `EZ-Template` 那样有清晰的文档导航、教程、项目展示，又能结合 GitHub 管理源码、结合阿里云 OSS 存放大文件和中国大陆加速资源。

---

## 1. 新目标定义

你现在要做的不是单一 MV 页面，而是一个长期个人作品与知识空间：

```text
SHELL Workspace
├─ 首页：你是谁、你做什么、当前主线
├─ Projects：机器人 / 编程 / 全栈 / AI / 工程项目
├─ Robotics：VEX、路径规划、Pure Pursuit、运动控制笔记
├─ Music：音乐作品、MV、歌词、AI 音乐制作流程
├─ Notes：高数、工程物理、机械制图、编程学习笔记
├─ Archive：旧项目、旧文章、阶段性总结
└─ About：联系方式、GitHub、个人介绍
```

参考对象不是“视频平台”，而是类似 `EZ-Template` 的静态文档网站：顶部导航、左侧目录、Markdown 内容、搜索、版本化或分类化文档。

---

## 2. 推荐技术路线

最终采用：

```text
GitHub 仓库：保存源码、Markdown 文档、自动构建配置
GitHub Pages：提供一个国际访问版本 / 开发预览版本
阿里云 OSS：存放构建后的静态网站文件和大文件资源
阿里云 CDN：备案通过后，为中国大陆访问加速
阿里云域名：shellworkspace.cn
```

推荐框架：

```text
Docusaurus
```

原因：

```text
1. EZ-Template 本身就是 Docusaurus 风格的文档站。
2. Markdown 写内容很舒服。
3. 自带顶部导航、侧边栏、文档分类、版本化能力。
4. GitHub Pages 部署成熟。
5. 静态构建后可以上传到 OSS，不需要服务器。
```

---

## 3. 架构图

```text
你本地电脑
  ↓ 写 Markdown / 代码
GitHub 仓库
  ↓ GitHub Actions 自动构建
GitHub Pages 版本
  ↓ 同时可选部署
阿里云 OSS Bucket
  ↓ CDN 加速，备案后启用
shellworkspace.cn / www.shellworkspace.cn
```

大文件资源单独走 OSS：

```text
图片、MV、PDF、压缩包、下载文件
  ↓
OSS /assets/ 或 /media/
  ↓
assets.shellworkspace.cn 或 cdn.shellworkspace.cn
```

---

## 4. 你和 Codex 的分工总表

| 模块 | 你要做 | Codex 要做 |
|---|---|---|
| 域名 | 购买 `shellworkspace.cn`、实名、备案 | 不能替你做 |
| GitHub | 创建仓库、授权本地 Git 推送 | 初始化项目、提交代码、配置 Pages |
| Docusaurus | 决定栏目和内容方向 | 创建项目、配置导航、侧边栏、主题 |
| 文章内容 | 提供真实经历、项目材料、照片、笔记 | 整理成 Markdown、优化结构和表达 |
| OSS | 开通服务、创建 Bucket、保管 AccessKey | 写上传脚本、部署脚本、资源路径配置 |
| CDN | 备案后你在控制台开通和确认计费 | 写配置说明、生成检查清单 |
| 视频/大文件 | 提供源文件、确认是否公开 | 写文件命名规范、上传脚本、引用路径 |
| CI/CD | 提供 GitHub 权限和必要密钥 | 写 GitHub Actions 自动构建部署流程 |
| 安全 | 不泄露密钥、不开主账号权限 | 添加 `.gitignore`、`.env.example`、检查敏感信息 |

---

## 5. 阶段一：先做 GitHub 版本，不等备案

备案要等几天，不影响你先把网站做起来。

### 你要做

```text
1. 在 GitHub 创建仓库，例如：shellworkspace
2. 确认你的 GitHub 用户名，例如：guoguokekeya
3. 把仓库地址给 Codex
4. 准备几段基本材料：
   - 个人介绍
   - VEX / 机器人经历
   - 当前学习方向
   - 音乐作品简介
   - 想放进网站的栏目
```

### Codex 要做

```text
1. 初始化 Docusaurus 项目
2. 创建首页
3. 创建 docs 目录
4. 创建 Projects / Robotics / Music / Notes / About 页面
5. 配置导航栏和侧边栏
6. 配置 GitHub Pages 部署
7. 写 README 和本地运行说明
```

### 这一阶段的结果

网站可以先跑在：

```text
https://你的GitHub用户名.github.io/shellworkspace/
```

例如：

```text
https://guoguokekeya.github.io/shellworkspace/
```

这个地址不依赖阿里云备案。

---

## 6. 阶段二：设计网站内容结构

推荐第一版栏目如下。

```text
Home
├─ 简短自我介绍
├─ 当前主线：Robotics / AI / Full-stack / Music
├─ Featured Projects
├─ Latest Notes
└─ Contact / GitHub

Docs
├─ Getting Started
├─ Robotics
│  ├─ VEX U
│  ├─ Pure Pursuit
│  ├─ Motion Control
│  └─ Embedded Notes
├─ Computer Science
│  ├─ Git / GitHub
│  ├─ Web Development
│  ├─ Systems
│  └─ AI Tools
├─ Math & Physics
│  ├─ Calculus
│  ├─ Linear Algebra
│  ├─ Engineering Physics
│  └─ Engineering Drawing
├─ Music
│  ├─ Songs
│  ├─ MV
│  ├─ AI Vocal Workflow
│  └─ Lyrics Archive
└─ Life Archive
```

### 你要做

```text
1. 决定哪些栏目先公开，哪些暂时不写。
2. 把你已有的项目、笔记、歌词、MV 材料整理出来。
3. 告诉 Codex 哪些内容要中文，哪些内容要英文。
```

### Codex 要做

```text
1. 建立目录结构。
2. 为每个栏目生成占位 Markdown。
3. 给每篇文章添加 front matter。
4. 保持链接不失效。
5. 生成统一的写作模板。
```

---

## 7. 阶段三：OSS 的定位

OSS 不再只是存一个 MV。它现在是你的个人 Workspace 的“大文件仓库”。

OSS 适合放：

```text
1. MV 视频
2. 高清封面图
3. 项目演示视频
4. PDF 简历
5. 大尺寸图片
6. 可下载压缩包
7. 不适合塞进 GitHub 仓库的大文件
```

GitHub 仓库适合放：

```text
1. Docusaurus 源码
2. Markdown 文档
3. 小图片
4. 网站配置
5. GitHub Actions 工作流
```

不要把 700MB 视频放进 GitHub 仓库。

### 推荐 OSS 目录

```text
shellworkspace-mv-prod/
├─ media/
│  ├─ mv/
│  │  └─ song-001-master-4k60.mp4
│  ├─ covers/
│  │  └─ song-001-cover.webp
│  └─ demos/
├─ downloads/
│  ├─ resume.pdf
│  └─ project-archive.zip
└─ site/
   └─ 可选：Docusaurus 构建后的静态文件
```

### 你要做

```text
1. 创建 OSS Bucket。
2. 保持 Bucket 默认私有或按需要配置。
3. 上传大文件。
4. 不随便开启公有读。
5. 备案通过后再配置 CDN 域名。
```

### Codex 要做

```text
1. 写 ossutil 上传脚本。
2. 写资源命名规范。
3. 在 Docusaurus 中引用 OSS/CDN 资源。
4. 写部署文档。
```

---

## 8. 阶段四：域名使用规划

你的主域名：

```text
shellworkspace.cn
```

建议最终这样使用：

```text
www.shellworkspace.cn       主站，中国大陆正式版本
assets.shellworkspace.cn    OSS/CDN 大文件资源
github.shellworkspace.cn    可选，跳转 GitHub Pages 或 GitHub Profile
```

不建议第一版就拆太多子域名。第一版最简单：

```text
www.shellworkspace.cn
assets.shellworkspace.cn
```

### 备案前

可以用：

```text
GitHub Pages 默认域名
```

### 备案后

再配置：

```text
www.shellworkspace.cn → 阿里云 OSS/CDN 静态站
assets.shellworkspace.cn → OSS/CDN 资源域名
```

---

## 9. 阶段五：部署模式选择

有两个部署目标。

### 模式 A：GitHub Pages 预览版

```text
GitHub Actions build
→ 部署到 gh-pages 分支
→ 生成 GitHub Pages 网站
```

优点：

```text
免费、简单、适合开发预览、方便展示源码关系
```

缺点：

```text
中国大陆访问不一定稳定，不适合承载大视频
```

### 模式 B：阿里云 OSS/CDN 中国版

```text
GitHub Actions build
→ 生成 build/
→ 上传到 OSS site/
→ CDN 刷新
→ www.shellworkspace.cn 访问
```

优点：

```text
大陆访问稳定，可接 CDN，可承载大资源
```

缺点：

```text
需要备案、需要阿里云配置、需要 AccessKey 和费用控制
```

推荐最终采用双部署：

```text
GitHub Pages = 开发预览 / 国际访问
阿里云 OSS/CDN = 正式中国大陆访问
```

---

## 10. 安全和费用原则

### 你必须遵守

```text
1. 不把 AccessKey 发给 Codex 聊天窗口。
2. 不把 .env 上传 GitHub。
3. 不用主账号 AccessKey 做自动部署。
4. 用 RAM 子用户，最小权限。
5. 开 CDN 流量告警。
6. 视频和大文件不要进 Git 仓库。
```

### Codex 必须遵守

```text
1. 所有密钥只从环境变量读取。
2. 仓库必须包含 .gitignore。
3. 仓库只提交 .env.example，不提交 .env。
4. 大文件路径用 OSS/CDN URL，不放进 public 目录。
5. 部署脚本必须有 dry-run 或确认说明。
```

---

## 11. 当前你下一步该做什么

你现在还在备案等待期，所以最合理的下一步是：

```text
1. 创建 GitHub 仓库：shellworkspace
2. 让 Codex 初始化 Docusaurus 项目
3. 本地运行网站
4. 先部署 GitHub Pages 版本
5. 整理第一批内容：About / Robotics / Music / Notes
6. OSS Bucket 继续保留，作为媒体资源仓库
7. 备案通过后，再做阿里云 OSS/CDN 正式站
```

---

## 12. 不要现在做的事

```text
1. 不要买 ECS。
2. 不要做复杂后端。
3. 不要做登录系统。
4. 不要一开始就上数据库。
5. 不要把网站做成视频网站。
6. 不要把所有内容都堆到首页。
7. 不要用 OSS 替代 GitHub 管理源码。
```

你的第一版目标应该是：

```text
一个清爽、可维护、可长期扩展的个人文档型 Workspace。
```

不是：

```text
一个功能复杂但难维护的门户网站。
```

---

## 13. 最终一句话方案

```text
用 GitHub 管源码和文章，用 Docusaurus 做文档站，用 GitHub Pages 先上线预览，用 OSS 存大文件，用阿里云 CDN 在备案后做中国大陆正式访问。
```
