import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Archive(): React.ReactNode {
  return (
    <Layout title="Archive" description="SHELL Workspace 归档入口">
      <main className="stage-page container margin-vert--lg">
        <header className="page-header archive-panel">
          <p className="stage-kicker">Archive System</p>
          <h1>Archive</h1>
          <p>
            Archive 当前只保留 source 相关说明；source 中的项目媒体资产暂不公开，
            不上传到 Git，也不连接 OSS/CDN。
          </p>
        </header>
        <div className="project-card">
          <strong>source 暂不公开</strong>
          <span>等待 ICP 备案许可</span>
          <p>
            OSS 连接和国内域名 shellworkspace.cn 暂不启用。等 ICP 备案完成后，
            再处理 OSS/CDN、国内域名和媒体发布。
          </p>
          <Link to="/notes/archive/intro">查看 Archive Notes</Link>
        </div>
      </main>
    </Layout>
  );
}
