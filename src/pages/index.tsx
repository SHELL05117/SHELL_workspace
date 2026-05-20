import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type Section = {
  title: string;
  description: string;
  to: string;
};

const sections: Section[] = [
  {
    title: 'Robotics',
    description: 'Pushback、VEX U、路径规划、运动控制与工程实现笔记。',
    to: '/docs/robotics/intro',
  },
  {
    title: 'Computer Science',
    description: 'Git/GitHub、Web 开发、系统基础与工程化记录。',
    to: '/docs/cs/intro',
  },
  {
    title: 'Music',
    description: '歌曲、MV、AI Vocal Workflow 与媒体资产发布流程。',
    to: '/docs/music/intro',
  },
];

const projects = [
  'SHELL Workspace 文档站 MVP',
  'Pushback Robotics 源码与运行日志归档',
  '音乐作品与 OSS 媒体资产工作流',
];

export default function Home(): React.ReactNode {
  return (
    <Layout
      title="Home"
      description="SHELL Workspace personal documentation site">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.kicker}>Personal Workspace</p>
            <h1>SHELL Workspace</h1>
            <p className={styles.subtitle}>
              Robotics, Software, AI, Systems, and Music. 一个长期维护的个人文档、项目与作品空间。
            </p>
            <div className={styles.actions}>
              <Link className="button button--primary" to="/docs/intro">
                Open Docs
              </Link>
              <Link className="button button--secondary" to="/projects">
                View Projects
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.band}>
          <div className={styles.grid}>
            {sections.map((section) => (
              <Link className={clsx(styles.card, 'clean-link')} to={section.to} key={section.title}>
                <span>{section.title}</span>
                <p>{section.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.contentGrid}>
          <div>
            <h2>Featured Projects</h2>
            <ul className={styles.list}>
              {projects.map((project) => (
                <li key={project}>{project}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Latest Notes</h2>
            <p>
              TODO: SHELL 补充第一批公开笔记。建议先从 Robotics、Git/GitHub、Music Workflow
              三个方向开始整理。
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
