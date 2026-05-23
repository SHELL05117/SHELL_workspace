# SHELL Workspace Agent Guidelines

This repository is a Docusaurus-based personal engineering archive for SHELL. Agents working here must help turn a messy workspace into a long-term maintainable system for projects, writing, notes, public profile, and archive material.

## Mission

SHELL Workspace is organized around these public sections:

- Home: featured entry points, identity, current directions, selected projects, latest Blog/Notes.
- Projects: public portfolio, project cards, and project detail entry points.
- Blog: technical articles, project retrospectives, development logs, and opinion pieces.
- Notes: long-term knowledge base for Robotics, Computer Science, Math & Physics, Engineering Drawing, and Music Production.
- About: public identity profile, not a private autobiography.
- Archive: old projects, migration records, deprecated material, and historical context.
- GitHub: source repository link.

The site should feel like a clear technical workspace. Do not prioritize UI decoration over structure, routing, readable Chinese content, and build stability.

## Hard Boundaries

- Keep Docusaurus. Do not replace the framework.
- Do not change GitHub Pages `url`, `baseUrl`, or deployment workflow paths unless explicitly requested.
- Do not delete `docs/robotics/` or Pushback-related content.
- Do not commit credentials, `.env`, AccessKeys, tokens, private keys, or real cloud secrets.
- Do not read, print, summarize, or expose `docs/key.env`, `.env`, token, or API key contents.
- Do not store large media files in Git. Use OSS/CDN-style external URLs or leave migration TODOs.
- Do not add a database, login system, backend service, or runtime server dependency unless explicitly requested.
- Do not configure production domains, ICP-related settings, paid cloud services, or real Aliyun deployment without explicit confirmation.

## Technical Baseline

- Framework: Docusaurus.
- Language: TypeScript for custom code.
- Content: Markdown/MDX first.
- Blog: Docusaurus native blog.
- Notes: Docusaurus docs routed and presented as Notes.
- First deployment target: GitHub Pages.
- Large asset target: Alibaba Cloud OSS/CDN, referenced by URL only.
- Configuration secrets: environment variables only.

Expected local checks:

```bash
git status --short
npm run build
npm run typecheck
```

## Repository Conventions

- Keep Docusaurus pages under `src/pages/`.
- Keep long-term notes under `docs/`.
- Keep native blog posts under `blog/`.
- Keep reusable UI under `src/components/` when needed.
- Keep global styles in `src/css/custom.css`.
- Keep deployment and utility scripts under `scripts/`.
- Keep Codex agent prompts under `.codex/prompts/`.
- Keep acceptance checklists under `.codex/checklists/`.
- Treat `source/` as local asset staging or migration material, not site source.
- Treat `pushback/` as preserved legacy/project material unless the user explicitly says otherwise.

## Display Language

- All visitor-facing website text must be Simplified Chinese.
- Technical names may remain English when they are proper nouns or clearer as terms: Home, Projects, Blog, Notes, About, Archive, GitHub, Robotics, Computer Science, Math & Physics, Engineering Drawing, Music Production, Pushback, Docusaurus, GitHub Pages, OSS/CDN.
- Avoid mojibake. If existing content is garbled and cannot be recovered, replace it with clear Simplified Chinese placeholders and TODOs.
- Use TODO markers when real user facts are missing.
- Do not invent project history, awards, team details, cloud configuration, deployment status, or personal claims.

## Builder Agent Role

The Builder Agent is responsible for intelligent creation and IA implementation after the user provides a prompt.

Builder must:

- Read this file, the Builder prompt, and the acceptance checklist before editing.
- Preserve GitHub Pages routing assumptions.
- Preserve Robotics and Pushback content.
- Create clear Simplified Chinese pages, indexes, and placeholders.
- Prioritize navigation, routes, sidebars, index pages, and build stability.
- Update `docs/todo_user.md` with missing user-provided details.
- Run `git status --short` and `npm run build` after implementation.

## Reviewer Agent Role

The Reviewer Agent is responsible for acceptance against project needs.

Reviewer must check:

- Multi-agent files support Builder -> Reviewer -> Fix flow.
- Home / Projects / Blog / Notes / About / Archive / GitHub are reachable.
- Docusaurus native Blog works.
- Notes sidebar groups are coherent.
- Pushback and Robotics pages remain reachable.
- Visitor-facing website text is Simplified Chinese.
- README explains workspace categories.
- `docs/todo_user.md` lists missing details for the user.
- No secrets or large media were exposed or committed.
- `url`, `baseUrl`, and deployment workflows were not broken.
- `npm run build` passes.

Reviewer returns pass, pass with notes, or needs fixes, with severity-ranked findings.

## Fix Agent Role

The Fix Agent applies review findings without expanding scope.

Fix must:

- Read the review report first.
- Fix P0/P1 findings before P2.
- Preserve unrelated user changes.
- Avoid broad rewrites unless required.
- Re-run `git status --short` and `npm run build`.
- Report each fix mapped to the review finding.
