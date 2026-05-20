# Codex 工程规格：SHELL Workspace Personal Site

## 0. Mission

Build a personal documentation-style workspace website for SHELL. The site should be similar in structure to a Docusaurus documentation site: clean navigation, docs sections, project showcase, Markdown-first content, GitHub source control, GitHub Pages deployment, and optional Alibaba Cloud OSS/CDN deployment for China access and large media assets.

This is no longer a single private MV page. It is a long-term personal workspace.

---

## 1. Hard Requirements

1. Use **Docusaurus** as the static site framework.
2. Use **TypeScript** where custom code is needed.
3. Source code must be stored in GitHub.
4. The first deploy target is GitHub Pages.
5. Alibaba Cloud OSS is used for large assets, not for source code.
6. Do not store large videos in the Git repository.
7. Do not commit `.env` or credentials.
8. Provide `.env.example` only.
9. Use placeholder domains until SHELL confirms real domain configuration.
10. Keep the first version static. No database, no login system, no backend unless explicitly requested.

---

## 2. Target Architecture

```text
Local development
  -> GitHub repository
  -> GitHub Actions build
  -> GitHub Pages deployment

Large media assets
  -> Alibaba Cloud OSS
  -> Alibaba Cloud CDN after ICP filing
  -> referenced from site via assets domain
```

Placeholder domains:

```text
Site domain:      https://<github-username>.github.io/shellworkspace/
Future CN site:   https://www.shellworkspace.cn
Future assets:    https://assets.shellworkspace.cn
```

Do not hardcode real Aliyun AccessKey values. Use environment variables only.

---

## 3. Recommended Repository Name

```text
shellworkspace
```

If the user has already created another repository name, adapt `baseUrl` accordingly.

---

## 4. Initial File Structure

Create or maintain this structure:

```text
shellworkspace/
├─ blog/
├─ docs/
│  ├─ intro.md
│  ├─ robotics/
│  │  ├─ intro.md
│  │  ├─ vex-u.md
│  │  ├─ pure-pursuit.md
│  │  └─ motion-control.md
│  ├─ cs/
│  │  ├─ intro.md
│  │  ├─ git-github.md
│  │  ├─ web-development.md
│  │  └─ systems.md
│  ├─ math-physics/
│  │  ├─ intro.md
│  │  ├─ calculus.md
│  │  ├─ engineering-physics.md
│  │  └─ engineering-drawing.md
│  ├─ music/
│  │  ├─ intro.md
│  │  ├─ songs.md
│  │  ├─ mv.md
│  │  └─ ai-vocal-workflow.md
│  └─ archive/
│     └─ intro.md
├─ src/
│  ├─ components/
│  ├─ css/
│  │  └─ custom.css
│  └─ pages/
│     ├─ index.tsx
│     ├─ projects.tsx
│     └─ about.tsx
├─ static/
│  ├─ img/
│  └─ CNAME                # only if custom GitHub Pages domain is used later
├─ scripts/
│  ├─ deploy-oss.sh
│  └─ upload-assets.sh
├─ .github/
│  └─ workflows/
│     ├─ deploy-github-pages.yml
│     └─ deploy-oss.example.yml
├─ .env.example
├─ .gitignore
├─ docusaurus.config.ts
├─ sidebars.ts
├─ package.json
└─ README.md
```

---

## 5. Site Sections

Top navigation:

```text
Home
Docs
Projects
Music
About
GitHub
```

Docs sidebar groups:

```text
Getting Started
Robotics
Computer Science
Math & Physics
Music
Archive
```

Home page content:

```text
- SHELL Workspace title
- Short intro: robotics, software, AI, systems, music
- Featured sections cards
- Featured projects
- Latest notes placeholder
- GitHub link placeholder
```

Do not over-design the homepage. Keep it clean, technical, and maintainable.

---

## 6. Docusaurus Config Requirements

Use these logical settings:

```ts
const config = {
  title: 'SHELL Workspace',
  tagline: 'Robotics, Software, AI, Systems, and Music',
  url: 'https://<github-username>.github.io',
  baseUrl: '/shellworkspace/',
  organizationName: '<github-username>',
  projectName: 'shellworkspace',
  trailingSlash: false,
};
```

When deploying to `www.shellworkspace.cn`, change:

```ts
url: 'https://www.shellworkspace.cn'
baseUrl: '/'
```

Do not change this until the user confirms the production domain is ready.

---

## 7. GitHub Pages Workflow

Create `.github/workflows/deploy-github-pages.yml`.

Expected behavior:

```text
on push to main
-> install dependencies
-> build Docusaurus site
-> deploy build output to GitHub Pages
```

Use official GitHub Pages actions where possible.

The workflow must not require Aliyun secrets.

---

## 8. OSS Deployment Workflow

Create `.github/workflows/deploy-oss.example.yml`, but do not enable real deployment until the user provides Aliyun configuration.

Required environment variable names:

```text
ALIYUN_ACCESS_KEY_ID
ALIYUN_ACCESS_KEY_SECRET
ALIYUN_OSS_BUCKET
ALIYUN_OSS_REGION
ALIYUN_OSS_ENDPOINT
ALIYUN_CDN_DOMAIN
```

Use example placeholders only.

Do not commit real values.

---

## 9. OSS Asset Rules

Large assets must be referenced as external URLs, not imported into the app bundle.

Use placeholder base URL:

```text
https://assets.shellworkspace.cn
```

Example asset paths:

```text
/media/mv/song-001-master-4k60.mp4
/media/covers/song-001-cover.webp
/downloads/resume.pdf
/downloads/project-archive.zip
```

In Markdown:

```md
[Watch MV](https://assets.shellworkspace.cn/media/mv/song-001-master-4k60.mp4)
```

For video embedding, do not autoplay. Use controls and preload metadata only.

```html
<video controls preload="metadata" playsinline poster="https://assets.shellworkspace.cn/media/covers/song-001-cover.webp">
  <source src="https://assets.shellworkspace.cn/media/mv/song-001-master-4k60.mp4" type="video/mp4" />
</video>
```

---

## 10. `.env.example`

Create:

```env
# Alibaba Cloud OSS deployment placeholders
ALIYUN_ACCESS_KEY_ID=your_access_key_id
ALIYUN_ACCESS_KEY_SECRET=your_access_key_secret
ALIYUN_OSS_BUCKET=shellworkspace-mv-prod
ALIYUN_OSS_REGION=cn-hangzhou
ALIYUN_OSS_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
ALIYUN_CDN_DOMAIN=assets.shellworkspace.cn

# Site config placeholders
SITE_URL=https://guoguokekeya.github.io
SITE_BASE_URL=/shellworkspace/
ASSETS_BASE_URL=https://assets.shellworkspace.cn
```

`.env` must be ignored by Git.

---

## 11. `.gitignore`

Must include:

```gitignore
node_modules/
.docusaurus/
build/
.env
.env.local
.env.*.local
.DS_Store
*.log
```

Do not ignore `.env.example`.

---

## 12. Scripts

Add package scripts:

```json
{
  "scripts": {
    "start": "docusaurus start",
    "build": "docusaurus build",
    "serve": "docusaurus serve",
    "typecheck": "tsc --noEmit"
  }
}
```

Optional scripts in `scripts/`:

```text
upload-assets.sh     Upload local assets to OSS using ossutil.
deploy-oss.sh        Upload Docusaurus build/ to OSS.
```

Scripts must read credentials from environment variables, not hardcoded values.

---

## 13. Writing Style for Content

Use Chinese as the default language.

Tone:

```text
clear
technical
not motivational fluff
not over-branded
```

For math/physics pages, include English annotations for key terms where appropriate, for example:

```md
梯度（gradient）
方向导数（directional derivative）
全微分（total differential）
```

---

## 14. Initial Pages to Generate

Generate these with meaningful placeholders, not empty files:

```text
src/pages/index.tsx
src/pages/projects.tsx
src/pages/about.tsx
docs/intro.md
docs/robotics/intro.md
docs/robotics/vex-u.md
docs/robotics/pure-pursuit.md
docs/cs/git-github.md
docs/math-physics/calculus.md
docs/music/intro.md
docs/music/mv.md
```

Content should be editable and not claim facts not supplied by the user.

Use phrases such as:

```text
TODO: SHELL 补充具体项目细节。
TODO: 添加图片或演示视频。
TODO: 上传资源到 OSS 后替换链接。
```

---

## 15. Acceptance Criteria

Local development:

```text
npm install succeeds
npm run start opens a working local site
npm run build succeeds
npm run serve previews build output
```

Site structure:

```text
Top nav works
Sidebar works
Home page has cards
Docs pages are reachable
No broken internal links
No large media committed
```

Security:

```text
.env is ignored
.env.example exists
No AccessKey in source code
No large videos in Git history
```

GitHub Pages:

```text
Workflow exists
Build output can deploy to Pages
baseUrl matches repository name
```

OSS readiness:

```text
OSS deploy script uses environment variables
Asset URL base is configurable
No hardcoded credentials
```

---

## 16. Things Codex Must Not Do

Do not:

```text
1. Ask for Alibaba Cloud account password.
2. Ask for main account AccessKey.
3. Commit `.env`.
4. Commit videos, zip archives, or huge media files.
5. Buy cloud services.
6. Enable paid services without explicit user action.
7. Configure production domain before ICP filing is done.
8. Add database/login/auth unless requested.
9. Make the site depend on a server.
10. Replace GitHub source control with OSS.
```

---

## 17. First Implementation Task

Start with:

```text
1. Initialize Docusaurus project in the current repository.
2. Configure project metadata for GitHub Pages using placeholder username if necessary.
3. Create the documentation structure.
4. Create the homepage and basic pages.
5. Add .env.example and .gitignore.
6. Add GitHub Pages workflow.
7. Add README with local dev and deploy instructions.
8. Run npm install, npm run build.
9. Fix build errors.
```

When unsure about a real value, use a placeholder and add `TODO: SHELL confirm ...`.
