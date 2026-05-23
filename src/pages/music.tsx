import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

type Song = {
  title: string;
  date: string;
  description: string;
  href: string;
  cover?: string;
};

const songs: Song[] = [
  {
    title: '凛冬候鸟寄月',
    date: '2025 年 3 月',
    description: '写给女友织鸢。一首关于命中相遇的治愈情歌，用月光和鸢尾花描绘相遇、争吵、和解与重逢。',
    href: 'https://music.163.com/#/song?id=2681771978',
  },
  {
    title: '2024 的卡布奇诺',
    date: '2024 年 12 月',
    description: '写给自己。关于三年时间里的自我和解、现实与梦境错位，以及重新选择信念的新生。',
    href: 'https://music.163.com/#/song?id=2652417679',
  },
  {
    title: '在冬天来之前',
    date: '2024 年 8 月',
    description: '写给自己。关于第十七个秋天前的信、方向、伤口和在暴风雨中生长的野苗。',
    href: 'https://music.163.com/#/song?id=2618010015',
  },
];

const keywords = [
  'Hip-hop',
  'Rap',
  'Lyrics Writing',
  'AI Music Workflow',
  'Digital Creativity',
  'Independent Artist',
  'Personal Narrative',
  'Experimental Workflow',
  'Human-AI Collaboration',
  'Visual Storytelling',
];

export default function Music(): React.ReactNode {
  return (
    <Layout title="Music" description="SHELL 的音乐作品与创作系统">
      <main className="container margin-vert--lg">
        <h1>音乐与创作</h1>
        <p>
          除了技术与工程方向，SHELL 也长期进行 Hip-hop / Rap 创作，并持续探索 AI 音乐制作工作流与数字创作工具。
        </p>
        <p>
          相比传统意义上的“音乐人”定位，他更倾向于把音乐视作一种个人表达系统：
          歌词、声音、视觉、情绪、代码与技术工具，都可以成为创作的一部分。
        </p>

        <section className="music-section">
          <h2>公开歌曲</h2>
          <div className="music-grid">
            {songs.map((song) => (
              <article className="music-card" key={song.title}>
                {song.cover ? (
                  <img src={song.cover} alt={`${song.title} 专辑封面`} />
                ) : (
                  <div className="music-cover-placeholder" aria-label={`${song.title} 专辑封面占位`}>
                    <span>SHELL.果壳</span>
                  </div>
                )}
                <div>
                  <strong>{song.title}</strong>
                  <span>{song.date}</span>
                  <p>{song.description}</p>
                  <Link to={song.href}>网易云音乐</Link>
                </div>
              </article>
            ))}
          </div>
          <p>
            其他歌曲请访问{' '}
            <Link to="https://music.163.com/#/artist?id=50274937">SHELL.果壳 网易云音乐主页</Link>。
          </p>
        </section>

        <section className="music-section">
          <h2>创作风格</h2>
          <ul>
            <li>情绪表达。</li>
            <li>个人叙事。</li>
            <li>青年成长主题。</li>
            <li>数字时代语境。</li>
            <li>技术与现实交织。</li>
            <li>独立创作者视角。</li>
          </ul>
        </section>

        <section className="music-section">
          <h2>创作关键词</h2>
          <div className="keyword-list">
            {keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
        </section>

        <section className="music-section">
          <h2>关于创作</h2>
          <p>
            SHELL 对“技术与创作之间的边界”很感兴趣。他认为代码、声音、图像、文字与 AI 工具链，
            本质上都只是不同的信息表达媒介。相比于单纯追求某一种固定身份，
            他更关注如何通过不同工具构建完整的个人表达系统。
          </p>
          <p>
            因此，这部分内容未来不仅会包含音乐作品，也可能包含 Demo、Lyrics、Visual Concepts、
            AI-assisted Production、Personal Archives、Creative Experiments 和 Stage Performance Records。
          </p>
        </section>
      </main>
    </Layout>
  );
}
