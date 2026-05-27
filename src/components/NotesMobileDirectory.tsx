import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {BookOpen, X} from 'lucide-react';

export type NotesLink = {
  label: string;
  to: string;
  tag: 'Overview' | 'Project' | 'Reference' | 'Guide' | 'Course';
};

export type NotesGroup = {
  id: string;
  title: string;
  summary: string;
  description: string;
  links: NotesLink[];
};

export const notesGroups: NotesGroup[] = [
  {
    id: 'robotics',
    title: 'Robotics',
    summary: '5 篇 / 机器人项目、控制与竞赛记录',
    description: '围绕 VEX、Pushback、路径跟踪和机器人控制系统积累长期工程笔记。',
    links: [
      {label: 'Robotics 总览', to: '/notes/robotics/intro', tag: 'Overview'},
      {label: 'Pushback 简介', to: '/notes/robotics/pushback', tag: 'Project'},
      {label: 'Pushback 项目文档', to: '/notes/robotics/pushback_document', tag: 'Project'},
      {label: 'VEX-U', to: '/notes/robotics/vex-u', tag: 'Reference'},
      {label: 'Pure Pursuit', to: '/notes/robotics/pure-pursuit', tag: 'Guide'},
    ],
  },
  {
    id: 'computer-science',
    title: 'Computer Science',
    summary: '3 篇 / 软件工程与 Web 基础',
    description: '记录 Git、GitHub、Web Development 和个人工程环境中的可复用方法。',
    links: [
      {label: 'Computer Science 总览', to: '/notes/cs/intro', tag: 'Overview'},
      {label: 'Git / GitHub', to: '/notes/cs/git-github', tag: 'Guide'},
      {label: 'Web Development', to: '/notes/cs/web-development', tag: 'Reference'},
    ],
  },
  {
    id: 'course',
    title: 'Course',
    summary: '5 篇 / Calculus、Physics 与 Engineering Graphics',
    description: '将课程学习内容按 Calculus、Physics、Engineering Graphics 三个方向归档，便于从 Course 父级入口继续阅读。',
    links: [
      {label: 'Course 总览', to: '/notes/course/intro', tag: 'Overview'},
      {label: 'Calculus', to: '/notes/course/calculus/intro', tag: 'Course'},
      {label: '拉格朗日乘数法学习笔记', to: '/notes/course/calculus/拉格朗日乘数法学习笔记', tag: 'Course'},
      {label: 'Physics', to: '/notes/course/physics/intro', tag: 'Course'},
      {label: 'Engineering Graphics', to: '/notes/course/engineering-graphics/intro', tag: 'Course'},
    ],
  },
];

export const notesDocumentCount = notesGroups.reduce((total, group) => total + group.links.length, 0);

export default function NotesMobileDirectory(): React.ReactNode {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isNotesPage = location.pathname.includes('/notes/');

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.body.classList.add('notes-mobile-directory-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('notes-mobile-directory-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (!isNotesPage) {
    return null;
  }

  return (
    <>
      <button
        aria-expanded={open}
        className="notes-mobile-directory-trigger"
        onClick={() => setOpen(true)}
        type="button">
        <BookOpen aria-hidden="true" size={16} />
        Notes 目录
      </button>

      {open && (
        <div className="notes-mobile-directory" role="dialog" aria-modal="true" aria-label="Notes 移动端目录">
          <button className="notes-mobile-directory__backdrop" onClick={() => setOpen(false)} type="button" aria-label="关闭目录遮罩" />
          <section className="notes-mobile-directory__panel">
            <header className="notes-mobile-directory__header">
              <div>
                <span>Personal Knowledge Base</span>
                <strong>Notes 目录</strong>
              </div>
              <button onClick={() => setOpen(false)} type="button" aria-label="关闭 Notes 目录">
                <X aria-hidden="true" size={18} />
              </button>
            </header>
            <div className="notes-mobile-directory__body">
              {notesGroups.map((group) => (
                <section className="notes-mobile-directory__group" key={group.id}>
                  <header>
                    <h2>{group.title}</h2>
                    <span>{group.summary}</span>
                  </header>
                  <nav aria-label={`${group.title} Notes`}>
                    {group.links.map((link) => (
                      <Link
                        className={location.pathname.endsWith(link.to) ? 'is-active' : undefined}
                        key={link.to}
                        onClick={() => setOpen(false)}
                        to={link.to}>
                        <span>{link.label}</span>
                        <small>{link.tag}</small>
                      </Link>
                    ))}
                  </nav>
                </section>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
