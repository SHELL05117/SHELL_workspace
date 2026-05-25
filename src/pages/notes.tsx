import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {notesDocumentCount, notesGroups} from '../components/NotesMobileDirectory';

export default function NotesIndex(): React.ReactNode {
  return (
    <Layout title="Notes" description="SHELL Workspace 知识库目录">
      <main className="stage-page container margin-vert--lg notes-index-page">
        <header className="notes-index-hero">
          <div>
            <p className="stage-kicker">Personal Knowledge Base</p>
            <h1>Notes</h1>
            <p>这里整理 SHELL Workspace 的工程笔记、项目记录、课程知识和长期可复用参考资料。</p>
          </div>
          <dl className="notes-index-stats" aria-label="Notes 统计">
            <div>
              <dt>{notesGroups.length}</dt>
              <dd>个分区</dd>
            </div>
            <div>
              <dt>{notesDocumentCount}</dt>
              <dd>篇文档</dd>
            </div>
            <div>
              <dt>持续</dt>
              <dd>更新</dd>
            </div>
          </dl>
        </header>

        <nav className="notes-index-chips" aria-label="Notes 分区跳转">
          {notesGroups.map((group) => (
            <a href={`#${group.id}`} key={group.id}>
              {group.title}
            </a>
          ))}
        </nav>

        <section className="notes-index-grid" aria-label="Notes 分区目录">
          {notesGroups.map((group) => (
            <article className="notes-index-section" id={group.id} key={group.id}>
              <header>
                <div>
                  <h2>{group.title}</h2>
                  <span>{group.summary}</span>
                </div>
                <p>{group.description}</p>
              </header>
              <ol>
                {group.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>
                      <span>{link.label}</span>
                      <small>{link.tag}</small>
                    </Link>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </section>
      </main>
    </Layout>
  );
}
