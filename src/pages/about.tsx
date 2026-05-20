import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function About(): React.ReactNode {
  const photoUrl = useBaseUrl('/img/shell-photo.png');

  return (
    <Layout title="About" description="About SHELL Workspace">
      <main className="container margin-vert--lg">
        <section className="about-hero">
          <div>
            <h1>About SHELL</h1>
            <p>
              SHELL 是面向机器人、软件工程与人工智能方向发展的工程技术学习者，也关注
              Hip-hop / Rap 与 AI 音乐制作流程。
            </p>
            <p>
              SHELL Workspace 不是静态简历，而是持续更新的个人工程档案，用来整理项目、
              机器人经验、学习笔记、工程文档和创作内容。
            </p>
            <div className="about-actions">
              <Link className="button button--primary" to="/docs/about-shell">
                Read Profile
              </Link>
              <Link className="button button--secondary" to="/docs/robotics/pushback">
                Pushback Project
              </Link>
            </div>
          </div>
          <img src={photoUrl} alt="SHELL performance portrait" />
        </section>

        <section className="about-section">
          <h2>Focus</h2>
          <ul>
            <li>VEX / VEX-U 机器人程序开发</li>
            <li>C++、嵌入式控制、路径规划与运动控制</li>
            <li>Web 项目、GitHub 工程管理与 AI 辅助开发工作流</li>
            <li>音乐创作、歌词写作与个人作品归档</li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
