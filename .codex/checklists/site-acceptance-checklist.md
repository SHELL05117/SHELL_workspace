# SHELL Workspace Acceptance Checklist

Use this checklist for Builder self-checks, Reviewer acceptance, and Fix regression checks.

## Multi-Agent Workflow

- [ ] `AGENTS.md` describes Builder, Reviewer, and Fix roles.
- [ ] Builder prompt supports intelligent creation after user prompts.
- [ ] Reviewer prompt verifies project requirements and returns actionable findings.
- [ ] Fix prompt applies review findings and re-runs build checks.

## Scope And Safety

- [ ] Docusaurus remains the framework.
- [ ] GitHub Pages `url` and `baseUrl` are unchanged unless explicitly requested.
- [ ] Deployment workflow paths are not broken.
- [ ] `docs/robotics/` is preserved.
- [ ] Pushback-related content is preserved and reachable.
- [ ] No secret file contents were read, printed, or committed.
- [ ] No large media files were added to Git.

## Workspace Cleanup

- [ ] Generated artifacts such as `build/` and `.docusaurus/` are ignored and not committed.
- [ ] Logs and temporary files are removed or ignored.
- [ ] `source/` large media is treated as migration material, not active site source.
- [ ] README describes workspace categories.
- [ ] Unknown or legacy folders are documented instead of silently deleted.

## Information Architecture

- [ ] Top navigation is Home / Projects / Blog / Notes / About / Archive / GitHub.
- [ ] Home provides selected entry points and latest Blog/Notes links.
- [ ] Projects works as a public portfolio.
- [ ] Blog uses Docusaurus native Blog.
- [ ] Notes contains Robotics, Computer Science, Math & Physics, Engineering Drawing, and Music Production.
- [ ] About is a public identity profile, not private autobiography.
- [ ] Archive contains old projects, migration records, and deprecated content.
- [ ] Important pages are reachable through nav, sidebar, or index pages.
- [ ] No broken internal links were introduced.

## Language And Content

- [ ] Visitor-facing website text is Simplified Chinese.
- [ ] English is retained only for proper nouns and technical terms where useful.
- [ ] Mojibake is removed from visitor-facing pages.
- [ ] Missing real details are represented as TODOs.
- [ ] No unprovided personal facts, awards, deployment status, or project claims are invented.
- [ ] `docs/todo_user.md` lists user-supplied details still needed.

## Build And Verification

- [ ] `git status --short` was run and summarized.
- [ ] `npm run build` succeeds.
- [ ] `npm run typecheck` succeeds or is skipped with a clear reason.
- [ ] No generated build output is committed.

## Review Output

- [ ] Verdict is stated clearly.
- [ ] Findings are ordered by severity.
- [ ] Each finding includes file, issue, impact, and fix guidance.
- [ ] Verification results are listed.
- [ ] Remaining risks or skipped checks are disclosed.
