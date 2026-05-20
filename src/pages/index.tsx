import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type FocusArea = {
  title: string;
  label: string;
  description: string;
  to: string;
};

type ProjectCard = {
  title: string;
  meta: string;
  description: string;
  to: string;
};

type NoteItem = {
  title: string;
  scope: string;
  to: string;
};

const focusAreas: FocusArea[] = [
  {
    title: 'Robotics',
    label: 'VEX / Control',
    description: 'Pushback、VEX U、路径规划、运动控制与实车调参记录。',
    to: '/docs/robotics/intro',
  },
  {
    title: 'Software',
    label: 'Web / Systems',
    description: 'GitHub、Docusaurus、TypeScript、工程化和系统基础笔记。',
    to: '/docs/cs/intro',
  },
  {
    title: 'Music',
    label: 'Rap / AI Vocal',
    description: '歌曲、MV、AI Vocal Workflow 与媒体资产发布流程。',
    to: '/docs/music/intro',
  },
];

const projects: ProjectCard[] = [
  {
    title: 'Pushback Robotics',
    meta: 'VEX 2025-2026 / C++',
    description: '机器人源码快照、自动路径日志、P0 问题和下一轮调参方向。',
    to: '/docs/robotics/pushback',
  },
  {
    title: 'SHELL Workspace',
    meta: 'Docusaurus / GitHub Pages',
    description: '这个站点本身：个人文档、作品入口、OSS/CDN 媒体发布预留。',
    to: '/docs/intro',
  },
  {
    title: 'Music Archive',
    meta: 'Writing / MV / OSS',
    description: '音乐作品、歌词、MV 文件和创作流程的长期归档入口。',
    to: '/docs/music/songs',
  },
];

const notes: NoteItem[] = [
  {
    title: 'Pushback Skill Run Analysis',
    scope: 'Robotics debug',
    to: '/docs/robotics/pushback-skill-analysis',
  },
  {
    title: 'Git / GitHub Workflow',
    scope: 'Engineering notes',
    to: '/docs/cs/git-github',
  },
  {
    title: 'AI Vocal Workflow',
    scope: 'Music production',
    to: '/docs/music/ai-vocal-workflow',
  },
];

export default function Home(): React.ReactNode {
  const portraitUrl = useBaseUrl('/img/shell-photo.png');

  return (
    <Layout
      title="Home"
      description="SHELL Workspace personal portfolio and documentation site">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>Engineer / Robotics Programmer / Creator</p>
            <h1>SHELL Workspace</h1>
            <p className={styles.subtitle}>
              一个用于记录机器人、软件工程、AI 工具链、音乐创作和个人项目的长期工作空间。
            </p>
            <div className={styles.heroActions}>
              <Link className={clsx(styles.button, styles.primaryButton)} to="/docs/intro">
                进入文档
              </Link>
              <Link className={clsx(styles.button, styles.secondaryButton)} to="/projects">
                查看项目
              </Link>
            </div>
          </div>

          <aside className={styles.identityPanel} aria-label="SHELL identity overview">
            <img src={portraitUrl} alt="SHELL performing on stage" />
            <div className={styles.identityText}>
              <span>SHELL</span>
              <p>Robotics / Software / Music</p>
            </div>
          </aside>
        </section>

        <section className={styles.focusSection} aria-label="Focus areas">
          <div className={styles.sectionHeader}>
            <p>Current Lines</p>
            <h2>技术项目和创作身份放在同一个工作台上。</h2>
          </div>
          <div className={styles.focusGrid}>
            {focusAreas.map((area) => (
              <Link className={clsx(styles.focusCard, 'clean-link')} to={area.to} key={area.title}>
                <small>{area.label}</small>
                <strong>{area.title}</strong>
                <p>{area.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.projectSection} aria-label="Featured projects">
          <div className={styles.sectionHeader}>
            <p>Featured Work</p>
            <h2>先展示正在形成体系的东西。</h2>
          </div>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <Link className={clsx(styles.projectCard, 'clean-link')} to={project.to} key={project.title}>
                <span>{project.meta}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.notesSection} aria-label="Latest notes">
          <div>
            <p className={styles.kicker}>Notes</p>
            <h2>最近整理入口</h2>
          </div>
          <div className={styles.noteList}>
            {notes.map((note) => (
              <Link className={clsx(styles.noteItem, 'clean-link')} to={note.to} key={note.title}>
                <span>{note.scope}</span>
                <strong>{note.title}</strong>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
