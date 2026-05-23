import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type Card = {
  title: string;
  label: string;
  description: string;
  to: string;
};

const focusAreas: Card[] = [
  {
    title: 'Robotics',
    label: 'VEX / VEX-U / Control',
    description: '机器人竞赛、自动程序、传感器校准、路径规划和控制系统。',
    to: '/notes/robotics/intro',
  },
  {
    title: 'Projects',
    label: '机器人项目 / 音乐作品',
    description: '按照项目类型整理公开作品，避免把不同内容混在同一个列表里。',
    to: '/projects',
  },
  {
    title: 'Course',
    label: '课程学习',
    description: '整理 Math & Physics、Engineering Drawing 等学科内容。',
    to: '/notes/math-physics/intro',
  },
];

const featured: Card[] = [
  {
    title: 'Pushback',
    label: '机器人项目',
    description: '2025-2026 V5RC 赛季项目，重点是自动程序、底盘控制和现场调试。',
    to: '/notes/robotics/pushback',
  },
  {
    title: 'VEX U 第三方传感器技术栈',
    label: '技术文章',
    description: '关于 VEX U 第三方传感器、外部处理器、通信和算法路线的 Blog。',
    to: '/blog/vex-u-third-party-sensors',
  },
  {
    title: '音乐与创作',
    label: '音乐作品',
    description: '展示 SHELL.果壳 的公开歌曲，以及 Hip-hop / Rap 与 AI 音乐工作流探索。',
    to: '/music',
  },
];

export default function Home(): React.ReactNode {
  const portraitUrl = useBaseUrl('/img/source-assets/phot.png');

  return (
    <Layout title="Home" description="SHELL Workspace 个人工程档案系统">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>个人工程档案系统</p>
            <h1>SHELL Workspace</h1>
            <p className={styles.subtitle}>
              这里整理 SHELL 的机器人项目、软件工程、课程学习、音乐作品和技术文章。
              网站优先保持结构清晰、内容可维护、路径可长期使用。
            </p>
            <div className={styles.heroActions}>
              <Link className={clsx(styles.button, styles.primaryButton)} to="/projects">
                查看 Projects
              </Link>
              <Link className={clsx(styles.button, styles.secondaryButton)} to="/music">
                查看 Music
              </Link>
            </div>
          </div>

          <aside className={styles.identityPanel} aria-label="SHELL 公开身份概览">
            <img src={portraitUrl} alt="SHELL 公开展示照片" />
            <div className={styles.identityText}>
              <span>SHELL</span>
              <p>Robotics / Software / Music / Course</p>
            </div>
          </aside>
        </section>

        <section className={styles.focusSection} aria-label="当前方向">
          <div className={styles.sectionHeader}>
            <p>当前方向</p>
            <h2>把公开项目、技术文章、课程笔记和创作记录整理成长期档案。</h2>
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

        <section className={styles.projectSection} aria-label="精选入口">
          <div className={styles.sectionHeader}>
            <p>精选入口</p>
            <h2>先展示已经有真实内容的项目、文章和音乐作品。</h2>
          </div>
          <div className={styles.projectGrid}>
            {featured.map((project) => (
              <Link className={clsx(styles.projectCard, 'clean-link')} to={project.to} key={project.title}>
                <span>{project.label}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
