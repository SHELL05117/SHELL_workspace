import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const roboticsProjects = [
  {
    name: 'Pushback',
    status: '2025-2026 V5RC',
    description:
      'SHELL 在 2026 年 1 月至 2 月于成都 / 无锡参与的 VEX 机器人项目，重点围绕自动程序、底盘控制、传感器校准和现场调试展开。',
    href: '/notes/robotics/pushback_document',
  },
  {
    name: 'VEX U 第三方传感器技术栈',
    status: '技术文章',
    description: '面向 VEX U 的第三方传感器、外部处理器、通信、供电和算法路线规划。',
    href: '/blog/vex-u-third-party-sensors',
  },
];

const musicProjects = [
  {
    name: 'SHELL.果壳 音乐作品',
    status: '公开作品',
    description: '说唱、流行乐、歌词写作、编曲、混音与 AI 音乐工作流探索。',
    href: '/music',
  },
];

function ProjectCard({
  name,
  status,
  description,
  href,
}: {
  name: string;
  status: string;
  description: string;
  href: string;
}) {
  return (
    <article className="col col--6 margin-bottom--md">
      <Link className="clean-link" to={href}>
        <div className="project-card">
          <strong>{name}</strong>
          <span>{status}</span>
          <p>{description}</p>
        </div>
      </Link>
    </article>
  );
}

export default function Projects(): React.ReactNode {
  return (
    <Layout title="Projects" description="SHELL Workspace 公开作品集">
      <main className="stage-page container margin-vert--lg">
        <header className="page-header archive-panel">
          <p className="stage-kicker">Project Cards</p>
          <h1>Projects</h1>
          <p>
            Projects SHELL的机器人项目、音乐作品、其他开发项目。
          </p>
        </header>

        <section className="project-section">
          <h2>机器人项目</h2>
          <div className="row">
            {roboticsProjects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>

        <section className="project-section">
          <h2>音乐作品</h2>
          <div className="row">
            {musicProjects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
