import React from 'react';
import Layout from '@theme/Layout';

const projects = [
  {
    name: 'SHELL Workspace',
    status: 'MVP',
    description: 'Docusaurus 文档站、GitHub Pages 预览、OSS/CDN 资源预留流程。',
  },
  {
    name: 'Pushback Robotics',
    status: 'Archived Source',
    description: '机器人源码快照、skill/auton 运行日志分析和后续调参记录。',
  },
  {
    name: 'Music Release Workflow',
    status: 'Planning',
    description: '音乐作品、MV、封面、OSS 媒体发布与网页引用规范。',
  },
];

export default function Projects(): React.ReactNode {
  return (
    <Layout title="Projects" description="SHELL Workspace projects">
      <main className="container margin-vert--lg">
        <h1>Projects</h1>
        <p>这里用于集中展示 SHELL 的工程项目、学习项目和作品发布流程。</p>
        <div className="row">
          {projects.map((project) => (
            <article className="col col--4 margin-bottom--md" key={project.name}>
              <div className="project-card">
                <strong>{project.name}</strong>
                <span>{project.status}</span>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </Layout>
  );
}
