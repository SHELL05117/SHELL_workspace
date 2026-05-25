import React, {useEffect} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import {ArrowDown, BookOpen, Newspaper} from 'lucide-react';
import {Button} from '../components/ui/button';
import styles from './index.module.css';

type Card = {
  title: string;
  label: string;
  description: string;
  to: string;
};

const aboutLinks: Card[] = [
  {
    title: '公开身份',
    label: 'Public Profile',
    description: '了解 SHELL 的公开身份、当前方向与长期整理这个 Workspace 的原因。',
    to: '/about?section=public-profile',
  },
  {
    title: '教育与队伍',
    label: 'Education / Team',
    description: '查看学习阶段、队伍经历和机器人方向的成长路径。',
    to: '/about?section=education',
  },
  {
    title: '实习与工程',
    label: 'Engineering Field',
    description: '记录实习现场、工程协作和真实项目中的技术实践。',
    to: '/about?section=engineering',
  },
  {
    title: '联系交流',
    label: 'Signal Panel',
    description: '通过 Email、GitHub、Instagram 或 Discord 与 SHELL 建立联系。',
    to: '/about?section=contact',
  },
];

const blogArticles: Card[] = [
  {
    title: 'SHELL Workspace 架构重整记录',
    label: 'Workspace / Archive',
    description: '记录个人工程档案系统从混乱工作台走向长期维护结构的过程。',
    to: '/blog/shell-workspace-structure',
  },
  {
    title: 'VEX U 第三方传感器项目：技术栈与算法路线',
    label: 'Robotics / VEX U',
    description: '围绕传感器、外部处理器、通信和算法路线整理 VEX U 技术方案。',
    to: '/blog/vex-u-third-party-sensors',
  },
  {
    title: '从盐湖城看山景城：Google I/O 2026',
    label: 'AI / Engineering Journal',
    description: '从开发者视角观察 Google I/O 2026 中的 AI、移动设备与工程工具变化。',
    to: '/blog/google_io_2026_article_package/google_io_2026_revised',
  },
];

function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.18},
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);
}

export default function Home(): React.ReactNode {
  useScrollReveal();
  const posterUrl = useBaseUrl('/img/source-assets/海报.png');

  const scrollToArchive = () => {
    document.getElementById('stage-archive-start')?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  return (
    <Layout title="Home" description="SHELL Workspace 个人工程档案系统">
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.stageWash} aria-hidden="true" />
          <div className={styles.spotlightRig} aria-hidden="true" />
          <div className={styles.spotlightBeam} aria-hidden="true" />
          <div className={styles.spotlightLanding} aria-hidden="true" />

          <div className={styles.heroContent}>
            <p className={styles.kicker}>独属于我的舞台</p>
            <h1 className={styles.stageTitle} aria-label="SHELL WORKSPACE">
              <span className={styles.titleShell}>SHELL</span>
              <span className={styles.titleWorkspace}>WORKSPACE</span>
            </h1>
            <p className={styles.subtitle}>
              聚光灯照不到的地方，我先活成了自己的观众。如果世界迟迟不给我舞台，那我就自己搭一个。
            </p>
            <div className={styles.heroActions}>
              <Button className={clsx(styles.button, styles.primaryButton)} onClick={scrollToArchive}>
                SHELL
                <ArrowDown aria-hidden="true" size={16} />
              </Button>
              <Button asChild className={clsx(styles.button, styles.secondaryButton)} variant="outline">
                <Link to="/blog">
                  Blog
                  <Newspaper aria-hidden="true" size={16} />
                </Link>
              </Button>
              <Button asChild className={clsx(styles.button, styles.secondaryButton)} variant="outline">
                <Link to="/notes/robotics/intro">
                  Note
                  <BookOpen aria-hidden="true" size={16} />
                </Link>
              </Button>
            </div>
          </div>

          <aside className={styles.posterFrame} aria-label="SHELL 人物海报">
            <div className={styles.posterGlow} aria-hidden="true" />
            <img src={posterUrl} alt="SHELL 人物海报" />
            <div className={styles.identityText}>
              <span>SHELL</span>
              <p>Robotics / Software / Music / Course</p>
            </div>
          </aside>
        </section>

        <section id="stage-archive-start" className={styles.focusSection} data-reveal aria-label="关于SHELL">
          <div className={styles.sectionHeader}>
            <p>关于SHELL</p>
            <h2>SHELL 一个试图用作品证明自己存在的人。</h2>
          </div>
          <div className={styles.focusGrid}>
            {aboutLinks.map((area) => (
              <Link className={clsx(styles.focusCard, 'clean-link')} to={area.to} key={area.title}>
                <small>{area.label}</small>
                <strong>{area.title}</strong>
                <p>{area.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.projectSection} data-reveal aria-label="精选文章">
          <div className={styles.sectionHeader}>
            <p>精选文章</p>
            <h2>这里记录了我的Blog 用来保存技术文章、项目复盘、开发日志和长期维护记录。</h2>
          </div>
          <div className={styles.projectGrid}>
            {blogArticles.map((article) => (
              <Link className={clsx(styles.projectCard, 'clean-link')} to={article.to} key={article.title}>
                <span>{article.label}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
